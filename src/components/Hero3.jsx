import { useEffect, useRef, useState } from 'react'
import { site } from '../data/site'

/**
 * Hero3 — 三段互动故事（视频驱动版 v2）
 *
 * 核心：每个 stage 切换都有 AI 生成的真视频过渡片段
 *   · 下滑 = 正向播放 (forward)
 *   · 上滑 = 反向播放 (reverse，预先倒放好的视频文件)
 *   · 视频播完前 0.45s 触发"衔接淡入"：视频淡出 + 静态图从 scale 1.06 缓动到 1.0
 *
 * 静止期：Canvas 渲染对应静态图（hero-1/2/3）+ Ken Burns 呼吸
 * 背景层：星空 / Bokeh / 聚光（Canvas）
 */

const SRC = ['/hero-1.jpg', '/hero-2.jpg', '/hero-3.jpg']

/* 每个过渡两份：fwd（向下/正向播放）+ rev（向上/反向倒放）
   1920 版：从 2560 降采样重编码，解码开销降低 ~44%，过渡更流畅 */
const TRANS_VIDEOS = {
  '01': {
    fwd: ['/trans-01-1920.webm', '/trans-01-1920.mp4'],
    rev: ['/trans-01-rev-1920.mp4'],
  },
  '12': {
    fwd: ['/trans-12-1920.webm', '/trans-12-1920.mp4'],
    rev: ['/trans-12-rev-1920.mp4'],
  },
}

/* 已预热过的视频 URL（模块级，整个会话只取一次，进浏览器缓存） */
const warmed = new Set()

/* ---------------- 背景层：星空 / Bokeh / 聚光 + 光尘 ---------------- */
function BgCanvas({ stage, paused }) {
  const ref = useRef(null)
  const stageRef = useRef(stage)
  stageRef.current = stage
  const pausedRef = useRef(paused)
  pausedRef.current = paused

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let stars = []
    let bokehs = []
    let dusts = []
    let last = performance.now()
    let alive = true
    let cx = 0
    let cy = 0
    const prog = [1, 0, 0]
    // 背景 Canvas 降到 1.5 dpr：视觉差异肉眼难辨，填充开销显著降低
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

    const seed = () => {
      stars = Array.from({ length: 110 }, () => ({
        x: Math.random() * cx,
        y: Math.random() * cy,
        r: Math.random() * 1.4 + 0.2,
        a: Math.random() * 0.8 + 0.2,
        tw: Math.random() * 0.04 + 0.01,
        off: Math.random() * Math.PI * 2,
      }))
      bokehs = Array.from({ length: 20 }, () => ({
        x: Math.random() * cx,
        y: Math.random() * cy,
        r: Math.random() * 90 + 60,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        h: Math.random() * 60 + 190,
      }))
      dusts = Array.from({ length: 70 }, () => ({
        x: Math.random() * cx,
        y: Math.random() * cy,
        r: Math.random() * 2.4 + 0.6,
        a: Math.random() * 0.7 + 0.2,
        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() * 0.5 + 0.1) * 0.15,
        off: Math.random() * Math.PI * 2,
      }))
    }
    const resize = () => {
      const r = canvas.getBoundingClientRect()
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      cx = r.width
      cy = r.height
      seed()
    }
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    let raf = 0
    /* 首屏滚出视口后完全跳过绘制：200+ 粒子的渐变填充是首屏外最大的持续 GPU 开销 */
    let visible = true
    const io = new IntersectionObserver((es) => { visible = es[0]?.isIntersecting ?? true })
    io.observe(canvas)
    const tick = (now) => {
      if (!alive) return
      raf = requestAnimationFrame(tick)
      const dt = Math.min(48, now - last)
      if (!visible) {
        last = now
        return
      }
      /* 过渡视频播放期间跳过全部绘制：背景被视频盖住根本看不见，
         但渐变填充会跟视频解码抢 CPU/GPU 造成卡顿——只保留时间推进 */
      if (pausedRef.current) {
        last = now
        return
      }
      const t = now / 1000
      const cur = stageRef.current
      for (let k = 0; k < 3; k++) prog[k] += ((cur === k ? 1 : 0) - prog[k]) * Math.min(1, dt / 700)

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()
      ctx.scale(dpr, dpr)

      if (prog[0] > 0.002) {
        ctx.save()
        ctx.globalAlpha = prog[0]
        for (const s of stars) {
          const a = s.a * (0.55 + 0.45 * Math.sin(t * s.tw * 60 + s.off))
          ctx.fillStyle = `rgba(220,232,255,${a})`
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
          ctx.fill()
          if (s.r > 1) {
            const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4)
            g.addColorStop(0, `rgba(180,210,255,${a * 0.35})`)
            g.addColorStop(1, 'rgba(180,210,255,0)')
            ctx.fillStyle = g
            ctx.beginPath()
            ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2)
            ctx.fill()
          }
        }
        ctx.restore()
      }

      if (prog[1] > 0.002) {
        ctx.save()
        ctx.globalAlpha = prog[1]
        for (const b of bokehs) {
          b.x += b.vx
          b.y += b.vy
          if (b.x < -b.r) b.x = cx + b.r
          if (b.x > cx + b.r) b.x = -b.r
          if (b.y < -b.r) b.y = cy + b.r
          if (b.y > cy + b.r) b.y = -b.r
          const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
          g.addColorStop(0, `hsla(${b.h}, 60%, 80%, 0.22)`)
          g.addColorStop(0.6, `hsla(${b.h}, 60%, 70%, 0.08)`)
          g.addColorStop(1, 'hsla(220, 60%, 60%, 0)')
          ctx.fillStyle = g
          ctx.beginPath()
          ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      if (prog[2] > 0.002) {
        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.globalAlpha = prog[2] * 0.5
        const g = ctx.createRadialGradient(cx * 0.18, cy * 0.05, 0, cx * 0.18, cy * 0.05, cx * 0.9)
        g.addColorStop(0, 'rgba(170,150,255,0.35)')
        g.addColorStop(0.5, 'rgba(110,100,200,0.12)')
        g.addColorStop(1, 'rgba(50,40,110,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, cx, cy)
        ctx.restore()

        ctx.save()
        ctx.globalCompositeOperation = 'screen'
        ctx.globalAlpha = prog[2]
        for (const d of dusts) {
          d.x += d.vx
          d.y -= d.vy
          d.off += 0.02
          if (d.x < 0) d.x = cx
          if (d.x > cx) d.x = 0
          if (d.y < 0) d.y = cy
          if (d.y > cy) d.y = 0
          const fl = 0.5 + 0.5 * Math.sin(t * 1.5 + d.off)
          const a = d.a * fl
          const r = d.r * (0.8 + fl * 0.4)
          const gg = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, r * 5)
          gg.addColorStop(0, `rgba(220,200,255,${a})`)
          gg.addColorStop(0.4, `rgba(180,160,255,${a * 0.4})`)
          gg.addColorStop(1, 'rgba(120,100,200,0)')
          ctx.fillStyle = gg
          ctx.beginPath()
          ctx.arc(d.x, d.y, r * 5, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.restore()
      }

      ctx.restore()
    }
    raf = requestAnimationFrame(tick)
    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])
  return <canvas ref={ref} className="hero3__bg" />
}

/* ---------------- 静态图层：静止期（无视频时）绘制当前 stage 的静态图 ---------------- */
function StageCanvas({ stage, hidden }) {
  const ref = useRef(null)
  const stageRef = useRef(stage)
  stageRef.current = stage
  const hiddenRef = useRef(hidden)
  hiddenRef.current = hidden

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const imgs = [new Image(), new Image(), new Image()]
    const ready = [false, false, false]
    let alive = true
    let W = 0
    let H = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    // 基础放大仅保留 1.02 防露边余量：与视频 cover 铺满的取景尽量一致，
    // 避免静态图→过渡视频切换瞬间出现明显缩放跳变
    const BASE_OS = 1.02

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      W = r.width
      H = r.height
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const paint = (img, tr) => {
      const cover = Math.max(W / img.width, H / img.height)
      const s = cover * BASE_OS * tr.s
      const w = img.width * s
      const h = img.height * s
      const x = (W - w) / 2 + tr.tx * W
      const y = (H - h) / 2 + tr.ty * H
      ctx.drawImage(img, x, y, w, h)
    }

    const kb = (si, since) => {
      const T = 11000
      const k = (since % (T * 2)) / T
      const phase = k <= 1 ? k : 2 - k
      const e = phase < 0.5 ? 2 * phase * phase : 1 - Math.pow(-2 * phase + 2, 2) / 2
      if (si === 0) return { s: 1 + 0.05 * e, tx: -0.008 * e, ty: -0.006 * e }
      if (si === 1) return { s: 1.04 - 0.04 * e, tx: 0.006 * e, ty: 0.008 * e }
      return { s: 1 + 0.04 * e, tx: -0.005 * e, ty: -0.005 * e }
    }

    let raf = 0
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    resize()

    /* 首屏滚出视口后跳过全屏 drawImage（Ken Burns 每帧都在动，滚出后纯属浪费） */
    let visible = true
    const io = new IntersectionObserver((es) => { visible = es[0]?.isIntersecting ?? true })
    io.observe(canvas)

    const loop = (now) => {
      if (!alive) return
      raf = requestAnimationFrame(loop)
      if (!W || !H || !visible) return
      /* 关键：首屏不等全部图片 —— 当前 stage 的图一到就画。
         原来等 3 张全下完才开始画，弱网下首开是好几秒纯星空 */
      const si = stageRef.current
      if (!ready[si] || hiddenRef.current) return
      // 视频期间保留画布上的最后一帧画面（不清空）：
      // 视频起播前/卡顿时，这帧静态画面垫在视频黑底之下，避免露出生效层星空
      ctx.clearRect(0, 0, W, H)
      paint(imgs[si], kb(si, now))
    }

    imgs.forEach((im, i) => {
      im.onload = () => { ready[i] = true }
    })
    imgs[0].src = SRC[0]
    imgs[1].src = SRC[1]
    imgs[2].src = SRC[2]
    raf = requestAnimationFrame(loop)

    return () => {
      alive = false
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
    }
  }, [])

  return <canvas ref={ref} className="hero3__stage" />
}

/* ---------------- 文案面板 ---------------- */
function PanelRight() {
  const { about, brand } = site
  // 用第一段作为核心介绍（口语化、不堆术语）
  const intro = about.paragraphs[0]
  return (
    <div className="hero3__panel hero3__panel--right">
      <span className="hero3__label" style={{ '--d': '0ms' }}>02 — Hello</span>
      <h2 className="hero3__name" style={{ '--d': '70ms' }}>
        {brand.nameCN}
      </h2>
      <div className="hero3__role" style={{ '--d': '210ms' }}>{site.hero.role}</div>
      <p style={{ '--d': '280ms' }}>{intro}</p>
      <ul className="hero3__contact">
        {about.contact.map((c, i) => (
          <li key={c.k} style={{ '--d': `${350 + i * 70}ms` }}>
            <span className="k">{c.k}</span>
            {c.href ? <a href={c.href}>{c.v}</a> : <span>{c.v}</span>}
          </li>
        ))}
      </ul>
    </div>
  )
}

/* 项目面板 — 按 3-效果.jpg 重做：左对齐、紧凑面板、关键指标清晰 */
function PanelLeft() {
  const { work } = site
  return (
    <div className="hero3__panel hero3__panel--left">
      <h2 className="hero3__name hero3__name--big" style={{ '--d': '0ms' }}>
        项目经历
        <em style={{ '--d': '70ms' }}>Some of my recent work</em>
      </h2>
      <p className="hero3__sub" style={{ '--d': '140ms' }}>{work.desc}</p>
      <ul className="hero3__work-list">
        {work.projects.slice(0, 3).map((p, i) => (
          <li key={p.id} style={{ '--d': `${210 + i * 70}ms` }}>
            <div className="hero3__work-row">
              <span className="hero3__work-no">{p.id}</span>
              <h3 className="hero3__work-t">{p.title}</h3>
            </div>
            <p className="hero3__work-d">{p.subtitle}</p>
            <div className="hero3__work-m">
              <b>{p.metrics[0].n}</b>
              <span>{p.metrics[0].k}</span>
            </div>
          </li>
        ))}
      </ul>
      <a className="btn btn--ghost hero3__viewall" href="#work" data-hero3-link style={{ '--d': '420ms' }}>
        查看全部 6 个项目 <i />
      </a>
    </div>
  )
}

/* ---------------- 主组件 ---------------- */
export default function Hero3() {
  const [stage, setStage] = useState(0)
  const [trans, setTrans] = useState(null) // null | '01' | '12'
  const [direction, setDirection] = useState('fwd') // 'fwd' | 'rev'
  const [progress, setProgress] = useState(1) // 0-1 视频播放进度（无视频时=1）
  const [videoReady, setVideoReady] = useState(false) // 视频有画面后才显示，避免黑底裸露
  const [unlocked, setUnlocked] = useState(false)
  const elRef = useRef(null)
  const stageRef = useRef(0)
  const transRef = useRef(null)
  const dirRef = useRef('fwd')
  const unlockedRef = useRef(false)
  const progressRef = useRef(1)
  const videoRef = useRef(null)
  stageRef.current = stage
  transRef.current = trans
  dirRef.current = direction
  unlockedRef.current = unlocked
  progressRef.current = progress

  /* 不再锁定 body overflow — 用户始终能用滚动条/键盘浏览下面的项目列表。
     unlocked 仅用于：stage 推进逻辑是否生效（已滚出 Hero3 顶部就停推进）。 */
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0
      if (y > 60 && !unlockedRef.current) {
        setUnlocked(true)
      } else if (y <= 10 && unlockedRef.current) {
        // 滚回 Hero3 顶部，恢复 stage 推进交互
        setUnlocked(false)
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* 空闲时预热过渡视频（进 HTTP 缓存）：触发过渡的瞬间直接起播，
     不再出现"等下载→冻一下→突然跳帧"的卡顿感。
     分两批：首开带宽优先留给首屏图片，1.5s 只取最可能用到的 '01' 正向片，
     反向片和 '12' 延到 9s 之后再取，避免和首屏渲染抢带宽造成卡顿 */
  useEffect(() => {
    if (trans) return
    const warm = (urls) => {
      urls.forEach((u) => {
        if (warmed.has(u)) return
        warmed.add(u)
        fetch(u, { cache: 'force-cache', priority: 'low' }).catch(() => {})
      })
    }
    const t1 = window.setTimeout(() => warm(TRANS_VIDEOS['01'].fwd), 1500)
    const t2 = window.setTimeout(() => {
      warm(Object.values(TRANS_VIDEOS).flatMap((d) => [...d.fwd, ...d.rev]))
    }, 9000)
    return () => {
      window.clearTimeout(t1)
      window.clearTimeout(t2)
    }
  }, [trans])

  /* 视频源切换 + 播放（双源，webm 优先，更小）
     依赖 [trans, direction]：返回后再前进时 trans 不变但 direction 变了，
     必须重新加载视频，否则画面会停在倒放视频的最后一帧 */
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    if (!trans) {
      v.pause()
      v.removeAttribute('src')
      v.load()
      setProgress(1)
      return
    }
    const dir = dirRef.current
    const sources = TRANS_VIDEOS[trans][dir] || TRANS_VIDEOS[trans].fwd
    setVideoReady(false)
    if (sources.length === 2) {
      v.innerHTML = `<source src="${sources[0]}" type="video/webm"><source src="${sources[1]}" type="video/mp4">`
    } else {
      v.src = sources[0]
    }
    v.currentTime = 0
    v.load()
    /* play() 偶发被浏览器拒绝（AbortError / NotSupportedError），
       失败时挂到 canplay 上重试，避免画面冻住 + progress 永远停在旧值 */
    const tryPlay = () => {
      const p = v.play()
      if (p && p.catch) p.catch(() => {})
    }
    const p = v.play()
    if (p && p.catch) {
      p.catch(() => {
        v.addEventListener('canplay', tryPlay, { once: true })
      })
    }
  }, [trans, direction])

  /* webm 解码失败时自动回退 mp4 单源，避免黑屏/冻帧 */
  const onVideoError = () => {
    const t = transRef.current
    const v = videoRef.current
    if (!t || !v) return
    const suffix = dirRef.current === 'rev' ? '-rev' : ''
    v.innerHTML = ''
    v.src = `/trans-${t}${suffix}-1920.mp4`
    v.load()
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }

  /* 监听视频进度：更新 progress（用于文字 stagger 触发） */
  const onTimeUpdate = (e) => {
    const v = e.currentTarget
    if (!v.duration || isNaN(v.duration)) return
    setProgress(v.currentTime / v.duration)
  }

  /* 视频播完：保留最后一帧显示，不清 trans — 不切换到静态图 */
  const onVideoEnded = () => {
    setProgress(1)
  }

  /* 正向推进（下滑 / ↓键 / 点击）→ 播放正向视频 */
  const advance = () => {
    if (unlockedRef.current) return
    /* 过渡播放中（进度 < 0.9）禁止重复触发：滚轮/触摸板会连发多次事件，
       中途再触发会让 stage 连跳、视频被强行换源——就是"乱跳"的来源 */
    if (transRef.current && progressRef.current < 0.9) return
    const cur = stageRef.current
    if (cur >= 2) {
      /* 项目经历是最后一段：当前过渡播完后再下滑 → 解锁并进入下方项目板块 */
      if (!transRef.current || progressRef.current >= 0.98) unlock()
      return
    }
    const key = `${cur}${cur + 1}`
    /* progress 必须与 stage/trans 同批置 0：否则旧 progress=1 会泄漏到
       新过渡的画面上（文字面板提前全显 + 视频尚未起播的错乱状态） */
    setProgress(0)
    setStage(cur + 1)
    setDirection('fwd')
    setTrans(key)
  }

  /* 反向回退（上滑 / ↑键）→ 播放反向视频，回到上一 stage */
  const rewind = () => {
    if (unlockedRef.current) return
    /* 与 advance 相同：过渡播放中禁止打断，防乱跳 */
    if (transRef.current && progressRef.current < 0.9) return
    const cur = stageRef.current
    if (cur <= 0) return
    const key = `${cur - 1}${cur}`
    setProgress(0)
    setStage(cur - 1)
    setDirection('rev')
    setTrans(key)
  }

  const unlock = () => {
    if (unlockedRef.current) return
    const v = videoRef.current
    if (v) v.pause()
    setUnlocked(true)
    setTrans(null)
    /* 第三屏继续下滑 → 进入「关于我」（精选项目只能通过「查看全部 6 个项目」按钮直达） */
    window.setTimeout(() => {
      const t = document.querySelector('#about')
      if (t) t.scrollIntoView({ behavior: 'smooth' })
    }, 380)
  }

  useEffect(() => {
    const el = elRef.current
    if (!el) return
    let last = 0
    let ty = 0
    let tyStartScroll = 0

    /* wheel 事件：只在 Hero3 仍在视口顶部时拦截推进 stage；
       一旦用户已经滚出 Hero3（scrollY > 60），放行让原生滚动接管 */
    const onWheel = (e) => {
      if (window.scrollY > 60) return  // 已经滚出 Hero3，让浏览器原生滚动
      // 在 Hero3 顶部：拦截 wheel，推进 stage
      e.preventDefault()
      const now = Date.now()
      if (now - last < 350) return
      if (Math.abs(e.deltaY) < 4) return
      last = now
      if (e.deltaY > 0) advance()
      else rewind()
    }
    const onClick = (e) => {
      if (e.target.closest('a')) {
        // 点击「查看全部」等链接：瞬间直达 #work（跳过中间板块，不路过「关于我」）
        if (e.target.closest('[data-hero3-link]')) {
          e.preventDefault()
          const t = document.querySelector('#work')
          if (t) t.scrollIntoView({ behavior: 'auto' })
          return
        }
      }
      if (e.target.closest('button')) return
      // 点击推进只在 Hero3 视口顶部生效
      if (window.scrollY > 60) return
      if (Date.now() - last < 350) return
      last = Date.now()
      advance()
    }
    const onTS = (e) => {
      ty = e.touches[0].clientY
      tyStartScroll = window.scrollY
    }
    const onTE = (e) => {
      // 如果手势开始时已经滚出 Hero3，放行（让浏览器原生滚动）
      if (tyStartScroll > 60) return
      const dy = ty - e.changedTouches[0].clientY
      if (Math.abs(dy) < 30) return
      const now = Date.now()
      if (now - last < 350) return
      last = now
      if (dy > 0) advance()
      else rewind()
    }
    const onKey = (e) => {
      /* PageUp/PageDown/Home/End 始终放行（用户想直接浏览页面）。
         ArrowUp/Down/Space/Enter 在 Hero3 顶部时拦截推进 stage，否则放行 */
      if (['PageUp', 'PageDown', 'Home', 'End'].includes(e.key)) return
      if (window.scrollY > 60) return
      if (['ArrowDown', ' ', 'Enter'].includes(e.key)) {
        e.preventDefault(); advance()
      } else if (['ArrowUp'].includes(e.key)) {
        e.preventDefault(); rewind()
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    el.addEventListener('click', onClick)
    el.addEventListener('touchstart', onTS, { passive: true })
    el.addEventListener('touchend', onTE, { passive: true })
    window.addEventListener('keydown', onKey)
    return () => {
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('click', onClick)
      el.removeEventListener('touchstart', onTS)
      el.removeEventListener('touchend', onTE)
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  /* 文字 panel 显示条件：stage 对应 + (无 trans 或 视频播过半)。
     反向播放时 stage 已经回退到源，自然条件不成立，文字整体淡出。 */
  const showRight = stage === 1 && (!trans || progress >= 0.5)
  const showLeft = stage === 2 && (!trans || progress >= 0.5)

  return (
    <section className="hero3" id="home" ref={elRef}>
      <div className={`hero3__floor hero3__floor--s${stage}`} />

      <StageCanvas stage={stage} hidden={!!trans} />

      <video
        ref={videoRef}
        /* key 绑定过渡+方向：每次切换都挂载全新 video 节点，
           杜绝旧视频源/旧播放状态残留导致的冻帧错乱 */
        key={`${trans || 'idle'}-${direction}`}
        className={`hero3__video ${trans && videoReady ? 'on' : ''}`}
        muted
        playsInline
        preload="auto"
        onCanPlay={() => setVideoReady(true)}
        onTimeUpdate={onTimeUpdate}
        onEnded={onVideoEnded}
        onError={onVideoError}
      />

      <BgCanvas stage={stage} paused={!!trans} />
      <div className={`hero3__veil ${trans ? 'off' : ''}`} />
      <div className={`hero3__grade ${stage === 2 && !trans ? 'on' : ''}`} />
      <div className={`hero3__spotlight ${stage === 2 && !trans ? 'on' : ''}`} />

      <div className={`hero3__intro hero3__intro--right ${showRight ? 'on' : ''}`}>
        <PanelRight />
      </div>
      <div className={`hero3__intro hero3__intro--left ${showLeft ? 'on' : ''}`}>
        <PanelLeft />
      </div>

      <div className="hero3__bottom">
        <div className="hero3__progress">
          {['01 · Portfolio', '02 · Hello', '03 · Work'].map((s, i) => (
            <span key={i} className={stage === i ? 'on' : ''}>
              <i />
              <em>{s}</em>
            </span>
          ))}
        </div>
        <div className="hero3__hint">
          <span>
            {trans
              ? (direction === 'fwd' ? '正在播放过渡...' : '正在倒放返回...')
              : stage < 2
                ? '下滑↓下一页 / 上滑↑返回'
                : '下滑↓进入项目'}
          </span>
          <i>{direction === 'rev' ? '↑' : '↓'}</i>
        </div>
      </div>
    </section>
  )
}