import { useEffect, useRef, useState } from 'react'

/* ============================================================
   SoundScape — 右下角声音控制（背景音乐 + 点击音效）
   背景音乐：Faithful Mission（循环、低音量、进入网站自动播放）
   - 浏览器会拦截「带声音的自动播放」：先直接尝试，被拦则在
     访客第一次点击/滚动/按键的瞬间立刻起播（体验等同自动播放）
   - 音量默认 0.32（避免过大），开关时平滑淡入淡出
   - 偏好写入 localStorage；切走标签页自动暂停、回来恢复
   点击音效：Web Audio 合成的短促柔和「嗒」
   ============================================================ */

const LS_MUSIC = 'snd-music'
const LS_SFX = 'snd-sfx'
const BGM_SRC = '/audio/bgm-faithful-mission.m4a'
const BGM_VOL = 0.32

export default function SoundScape() {
  /* 音乐默认开（用户没明确关过就是开），音效默认关 */
  const [music, setMusic] = useState(() => localStorage.getItem(LS_MUSIC) !== '0')
  const [sfx, setSfx] = useState(() => localStorage.getItem(LS_SFX) === '1')
  const audioRef = useRef(null)
  const fadeRef = useRef(null)
  const eng = useRef(null) // 点击音效的 AudioContext { ctx, sfxGain }

  /* —— 音量淡入淡出 —— */
  const fadeTo = (target, dur = 1200, onDone) => {
    const a = audioRef.current
    if (!a) return
    clearInterval(fadeRef.current)
    const from = a.volume
    const t0 = performance.now()
    fadeRef.current = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / dur)
      a.volume = from + (target - from) * k
      if (k >= 1) {
        clearInterval(fadeRef.current)
        onDone && onDone()
      }
    }, 50)
  }

  const startMusic = () => {
    const a = audioRef.current
    if (!a) return
    a.volume = 0
    const p = a.play()
    if (p && p.catch) p.catch(() => {})
    fadeTo(BGM_VOL, 1600)
  }
  const stopMusic = () => {
    const a = audioRef.current
    if (!a) return
    fadeTo(0, 900, () => a.pause())
  }

  /* —— 首次挂载：尝试自动播放（被拦则等首次手势） —— */
  useEffect(() => {
    const a = new Audio(BGM_SRC)
    a.loop = true
    a.preload = 'auto'
    a.volume = 0
    /* 播放事件驱动 UI 状态（自动播放成功/手势恢复都靠它点亮按钮） */
    a.addEventListener('play', () => setMusic(true))
    audioRef.current = a
    if (typeof window !== 'undefined') window.__bgm = a // 调试/自动化测试用

    if (localStorage.getItem(LS_MUSIC) === '0') return // 用户明确关过：不自动播

    const kick = () => {
      startMusic()
      window.removeEventListener('pointerdown', kick)
      window.removeEventListener('keydown', kick)
      window.removeEventListener('wheel', kick)
      window.removeEventListener('touchstart', kick)
    }
    const tryPlay = a.play()
    if (tryPlay && tryPlay.catch) {
      tryPlay
        .then(() => fadeTo(BGM_VOL, 2000)) // 自动播放成功：直接响起
        .catch(() => {
          // 被浏览器拦截：挂起，等访客第一次交互瞬间起播
          window.addEventListener('pointerdown', kick)
          window.addEventListener('keydown', kick)
          window.addEventListener('wheel', kick, { passive: true })
          window.addEventListener('touchstart', kick, { passive: true })
        })
    }
    return () => {
      window.removeEventListener('pointerdown', kick)
      window.removeEventListener('keydown', kick)
      window.removeEventListener('wheel', kick)
      window.removeEventListener('touchstart', kick)
      clearInterval(fadeRef.current)
      a.pause()
      a.src = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* —— 点击音效引擎 —— */
  const ensureEngine = () => {
    if (eng.current) return eng.current
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    const ctx = new AC()
    const sfxGain = ctx.createGain()
    sfxGain.gain.value = 0.9
    sfxGain.connect(ctx.destination)
    eng.current = { ctx, sfxGain }
    return eng.current
  }
  const playTick = () => {
    const e = ensureEngine()
    if (!e) return
    const { ctx, sfxGain } = e
    if (ctx.state === 'suspended') ctx.resume()
    const t = ctx.currentTime
    const detune = 1 + (Math.random() - 0.5) * 0.08
    const mk = (type, f0, f1, peak, dur) => {
      const o = ctx.createOscillator()
      o.type = type
      o.frequency.setValueAtTime(f0 * detune, t)
      o.frequency.exponentialRampToValueAtTime(f1 * detune, t + dur)
      const g = ctx.createGain()
      g.gain.setValueAtTime(peak, t)
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur)
      o.connect(g)
      g.connect(sfxGain)
      o.start(t)
      o.stop(t + dur + 0.02)
    }
    mk('triangle', 1250, 820, 0.075, 0.09)
    mk('sine', 2500, 2100, 0.028, 0.045)
  }

  /* —— 开关 —— */
  const toggleMusic = () => {
    const a = audioRef.current
    if (!a) return
    if (a.paused) {
      startMusic()
      localStorage.setItem(LS_MUSIC, '1')
    } else {
      stopMusic()
      localStorage.setItem(LS_MUSIC, '0')
    }
  }
  const toggleSfx = () => {
    const e = ensureEngine()
    if (!e) return
    const v = !sfx
    setSfx(v)
    localStorage.setItem(LS_SFX, v ? '1' : '0')
    if (v) {
      e.ctx.resume()
      setTimeout(playTick, 60)
    }
  }

  /* 全局点击：命中可交互元素时播点击音 */
  useEffect(() => {
    if (!sfx) return
    const onDoc = (ev) => {
      const t = ev.target
      if (t && t.closest && t.closest('button, a, [role="button"], .pd__tab, .pb__shot-frame')) playTick()
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sfx])

  /* 切走标签页暂停音乐、回来恢复 */
  useEffect(() => {
    const onVis = () => {
      const a = audioRef.current
      if (!a) return
      if (document.hidden) {
        if (!a.paused) fadeTo(0, 400, () => a.pause())
      } else if (localStorage.getItem(LS_MUSIC) !== '0' && a.paused && a.currentTime > 0) {
        // 标签页切回：若音乐此前在播则恢复（currentTime>0 说明被可见性逻辑暂停过）
        startMusic()
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [])

  /* 卸载清理 */
  useEffect(
    () => () => {
      if (eng.current) eng.current.ctx.close()
    },
    []
  )

  return (
    <div className="snd" role="group" aria-label="声音控制">
      <button
        className={`snd__btn ${music ? 'on' : ''}`}
        onClick={toggleMusic}
        aria-pressed={music}
        title={music ? '关闭背景音乐' : '播放背景音乐'}
      >
        <span className="snd__eq">
          <i />
          <i />
          <i />
          <i />
        </span>
      </button>
      <button
        className={`snd__btn ${sfx ? 'on' : ''}`}
        onClick={toggleSfx}
        aria-pressed={sfx}
        title={sfx ? '关闭点击音效' : '开启点击音效'}
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 9l10.5 4.2-4.6 1.7L13.2 19.5 9 9z" fill="currentColor" stroke="none" />
          <path d="M6.5 3.5v2M3.5 6.5h2M4.8 4.8l1.4 1.4" />
        </svg>
      </button>
    </div>
  )
}
