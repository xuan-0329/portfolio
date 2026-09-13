import { useEffect, useRef, useState } from 'react'

/* ============================================================
   SoundScape — 右下角声音控制（背景音乐 + 点击音效）
   音乐用 Web Audio 实时生成（环境和弦垫 + 泛音点缀 + 混响）：
   - 不加载任何音频文件：零额外流量、永不重复、无版权问题
   - 浏览器禁止自动播放：默认关闭，首次点击开关时才启动
   - 偏好写入 localStorage；切走标签页自动暂停音乐
   ============================================================ */

const LS_MUSIC = 'snd-music'
const LS_SFX = 'snd-sfx'

/* —— 音乐素材：舒缓的大调九和弦进行 Cmaj9 → Am9 → Fmaj9 → Gadd9 —— */
const CHORDS = [
  [130.81, 196.0, 246.94, 293.66, 329.63], // Cmaj9
  [110.0, 164.81, 196.0, 246.94, 261.63], // Am9
  [87.31, 130.81, 164.81, 220.0, 196.0], // Fmaj9
  [98.0, 146.83, 164.81, 220.0, 246.94], // G add9
]
const CHORD_DUR = 14 // 每个和弦停留秒数
const SPARKLES = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5] // 五声音阶点缀

/* 生成混响脉冲响应（2.8s 指数衰减噪声，立体声） */
function makeImpulse(ctx) {
  const len = Math.floor(ctx.sampleRate * 2.8)
  const buf = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2.6)
  }
  return buf
}

export default function SoundScape() {
  const [music, setMusic] = useState(() => localStorage.getItem(LS_MUSIC) === '1')
  const [sfx, setSfx] = useState(() => localStorage.getItem(LS_SFX) === '1')
  /* 所有音频对象放进 ref：避免 state 变化反复重建引擎 */
  const eng = useRef(null) // { ctx, master, padBus, sfxGain, timers:[] }

  const ensureEngine = () => {
    if (eng.current) return eng.current
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    const ctx = new AC()
    const master = ctx.createGain()
    master.gain.value = 0
    master.connect(ctx.destination)

    /* 混响总线：干声 + 湿声 */
    const conv = ctx.createConvolver()
    conv.buffer = makeImpulse(ctx)
    const wet = ctx.createGain()
    wet.gain.value = 0.4
    conv.connect(wet)
    wet.connect(master)
    const dry = ctx.createGain()
    dry.gain.value = 0.75
    dry.connect(master)
    const toRev = (node, level) => {
      const g = ctx.createGain()
      g.gain.value = level
      node.connect(g)
      g.connect(dry)
      g.connect(conv)
    }

    /* 和弦垫总线：低通让音色更暖更远 */
    const padBus = ctx.createGain()
    padBus.gain.value = 0.5
    const padLP = ctx.createBiquadFilter()
    padLP.type = 'lowpass'
    padLP.frequency.value = 820
    padLP.Q.value = 0.4
    padBus.connect(padLP)
    toRev(padLP, 1)

    /* 低通缓慢呼吸（0.04Hz，600~1100Hz），避免音色死板 */
    const lfo = ctx.createOscillator()
    lfo.frequency.value = 0.04
    const lfoG = ctx.createGain()
    lfoG.gain.value = 250
    lfo.connect(lfoG)
    lfoG.connect(padLP.frequency)
    lfo.start()

    /* 点击音效总线：直出 + 少量混响，干净不浑 */
    const sfxGain = ctx.createGain()
    sfxGain.gain.value = 0.9
    toRev(sfxGain, 0.18)

    eng.current = { ctx, master, padBus, sfxGain, timers: [], toRev }
    return eng.current
  }

  /* —— 和弦垫：一个和弦 = 每个音 2 只微失谐振荡器，5s 淡入 6s 淡出 —— */
  const playChord = (e, freqs, when) => {
    const { ctx, padBus, timers } = e
    freqs.forEach((f) => {
      ;[-3.5, 3.5].forEach((cents) => {
        const o = ctx.createOscillator()
        o.type = cents > 0 ? 'sine' : 'triangle'
        o.frequency.value = f * Math.pow(2, cents / 1200)
        const g = ctx.createGain()
        g.gain.setValueAtTime(0, when)
        g.gain.linearRampToValueAtTime(0.045, when + 5) // 慕入
        g.gain.setValueAtTime(0.045, when + CHORD_DUR - 4)
        g.gain.linearRampToValueAtTime(0, when + CHORD_DUR + 6) // 慕出
        o.connect(g)
        g.connect(padBus)
        o.start(when)
        o.stop(when + CHORD_DUR + 6.5)
      })
    })
  }

  /* —— 泛音点缀：五声音阶随机音，偶尔一颗，带延迟回声 —— */
  const scheduleSparkles = (e) => {
    const { ctx, sfxGain, timers } = e
    const delay = ctx.createDelay(1)
    delay.delayTime.value = 0.45
    const fb = ctx.createGain()
    fb.gain.value = 0.34
    delay.connect(fb)
    fb.connect(delay)
    const wet2 = ctx.createGain()
    wet2.gain.value = 0.4
    delay.connect(wet2)
    wet2.connect(sfxGain)

    const one = () => {
      const t = ctx.currentTime
      const o = ctx.createOscillator()
      o.type = 'sine'
      o.frequency.value = SPARKLES[Math.floor(Math.random() * SPARKLES.length)]
      const g = ctx.createGain()
      const peak = 0.04 + Math.random() * 0.04
      g.gain.setValueAtTime(0, t)
      g.gain.linearRampToValueAtTime(peak, t + 0.03)
      g.gain.exponentialRampToValueAtTime(0.0001, t + 3.2)
      const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null
      o.connect(g)
      if (pan) {
        pan.pan.value = Math.random() * 1.4 - 0.7
        g.connect(pan)
        pan.connect(sfxGain)
        pan.connect(delay)
      } else {
        g.connect(sfxGain)
        g.connect(delay)
      }
      o.start(t)
      o.stop(t + 3.4)
      timers.push(setTimeout(one, 5000 + Math.random() * 7000))
    }
    timers.push(setTimeout(one, 2500))
  }

  /* —— 音乐开关：淡入淡出 1.6s，避免生硬 —— */
  const startMusic = (e) => {
    const { ctx, master, timers } = e
    ctx.resume()
    const t = ctx.currentTime
    master.gain.cancelScheduledValues(t)
    master.gain.setValueAtTime(master.gain.value, t)
    master.gain.linearRampToValueAtTime(0.85, t + 1.6)
    let step = 0
    const next = () => {
      playChord(e, CHORDS[step % CHORDS.length], ctx.currentTime + 0.1)
      step++
      timers.push(setTimeout(next, CHORD_DUR * 1000 - 9000)) // 与上一和弦尾部重叠淡接
    }
    next()
    scheduleSparkles(e)
  }
  const stopMusic = (e) => {
    const { ctx, master } = e
    e.timers.forEach(clearTimeout)
    e.timers.length = 0
    const t = ctx.currentTime
    master.gain.cancelScheduledValues(t)
    master.gain.setValueAtTime(master.gain.value, t)
    master.gain.linearRampToValueAtTime(0, t + 1.2)
    /* 停止旧的振荡器：重建 padBus 即可（旧 osc 失去输出路径自然停止） */
    setTimeout(() => {
      try {
        e.padBus.disconnect()
      } catch (_) {}
      const padBus = e.ctx.createGain()
      padBus.gain.value = 0.5
      const padLP = e.ctx.createBiquadFilter()
      padLP.type = 'lowpass'
      padLP.frequency.value = 820
      padLP.Q.value = 0.4
      padBus.connect(padLP)
      e.toRev && e.toRev(padLP, 1)
      e.padBus = padBus
    }, 1400)
  }

  /* 点击音效：两层短促柔和的「嗒」（三角波主音 + 高频泛音），随机微调音高 */
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

  /* —— 开关回调 —— */
  const toggleMusic = () => {
    const e = ensureEngine()
    if (!e) return
    const v = !music
    setMusic(v)
    localStorage.setItem(LS_MUSIC, v ? '1' : '0')
    if (v) startMusic(e)
    else stopMusic(e)
  }
  const toggleSfx = () => {
    const e = ensureEngine()
    if (!e) return
    const v = !sfx
    setSfx(v)
    localStorage.setItem(LS_SFX, v ? '1' : '0')
    if (v) {
      e.ctx.resume()
      setTimeout(playTick, 60) // 开启瞬间给一声反馈
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

  /* 首次挂载：若偏好是开，需等一次用户手势才能出声——
     监听首次任意点击恢复音乐；sfx 则天然由点击触发 */
  useEffect(() => {
    if (!music) return
    const resume = () => {
      const e = ensureEngine()
      if (e) startMusic(e)
      window.removeEventListener('pointerdown', resume)
    }
    window.addEventListener('pointerdown', resume)
    return () => window.removeEventListener('pointerdown', resume)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* 切走标签页暂停音乐、回来恢复 */
  useEffect(() => {
    const onVis = () => {
      const e = eng.current
      if (!e) return
      if (document.hidden) {
        e.ctx.suspend()
      } else if (music) {
        e.ctx.resume()
      }
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [music])

  /* 卸载清理 */
  useEffect(
    () => () => {
      const e = eng.current
      if (e) {
        e.timers.forEach(clearTimeout)
        e.ctx.close()
      }
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
