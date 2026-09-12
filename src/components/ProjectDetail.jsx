import { Fragment, useEffect, useRef, useState } from 'react'
import CountUp from './CountUp'

/* 富文本：把 hl 列表里的关键短语包成高亮 <em>，其余原样输出 */
function rich(text, hl) {
  if (!hl || !hl.length) return text
  const out = []
  let rest = text
  let key = 0
  while (rest.length) {
    let best = null
    hl.forEach((k) => {
      const idx = rest.indexOf(k)
      if (idx >= 0 && (best === null || idx < best.idx)) best = { idx, k }
    })
    if (!best) {
      out.push(rest)
      break
    }
    if (best.idx > 0) out.push(rest.slice(0, best.idx))
    out.push(
      <em className="pb__hl" key={key++}>
        {best.k}
      </em>
    )
    rest = rest.slice(best.idx + best.k.length)
  }
  return out
}

/* 视频/动图卡片：静音自动循环播放（与 GIF 表现一致，无需手动点击） */
function VideoItem({ data, idx }) {
  const ref = useRef(null)
  useEffect(() => {
    const v = ref.current
    if (!v) return
    v.muted = true
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }, [])
  return (
    <figure className="pd__item pd__item--video" style={{ '--i': idx }}>
      <div className="pd__video-wrap">
        <video
          ref={ref}
          src={data.video}
          poster={data.poster}
          preload="metadata"
          playsInline
          autoPlay
          loop={data.loop !== false}
          muted
        />
      </div>
    </figure>
  )
}

/**
 * 国别示范横幅：默认展示 SOP 改造后版本，点击横幅可切换查看改造前原 banner
 * 用于视觉对比 —— 同一节日、同一站点，改造前后的视觉差异一目了然
 */
function ShotCard({ s, idx }) {
  const [orig, setOrig] = useState(false)
  const has = !!s.orig
  const src = orig && has ? s.orig : s.img
  return (
    <figure className={`pb__shot pb__shot--${s.tone || 'gold'} ${has ? 'is-toggle' : ''}`}>
      <figcaption className="pb__shot-cap">
        <b>{s.label}</b>
        <em>{s.en}</em>
        {has && (
          <span className={`pb__shot-tag ${orig ? 'is-before' : 'is-after'}`}>
            {orig ? 'BEFORE · 改造前' : 'AFTER · SOP 标准'}
          </span>
        )}
      </figcaption>
      <div
        className="pb__shot-frame"
        {...(has
          ? {
              role: 'button',
              tabIndex: 0,
              title: orig ? '点击查看 SOP 改造后版本' : '点击查看改造前原 banner',
              onClick: () => setOrig((v) => !v),
              onKeyDown: (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setOrig((v) => !v)
                }
              },
            }
          : {})}
      >
        <img
          src={src}
          alt={`${s.label}${s.en ? ` ${s.en}` : ''} · ${orig ? '改造前原 banner' : 'SOP 标准化 banner'}`}
          loading={idx > 1 ? 'lazy' : undefined}
        />
        {has && (
          <span className="pb__shot-hint">
            {orig ? '← 点击返回 SOP 版本' : '点击对比改造前 →'}
          </span>
        )}
      </div>
    </figure>
  )
}

/**
 * ProjectDetail — 项目详情全屏浮层
 * 顶部：返回按钮 + 项目信息 + 关闭；下方：品类 tab + 瀑布流作品墙
 * 图片条目支持两种形态：
 *   - 字符串：普通图片
 *   - 对象 { cover, pdf, title }：PDF 封面卡，点击打开 PDF 阅读浮层
 */
export default function ProjectDetail({ project, onClose }) {
  const [cat, setCat] = useState(0)
  const [pdf, setPdf] = useState(null) // { src, title } 当前阅读的 PDF
  const cats = project?.detail?.categories || []

  /* Esc 关闭（PDF 阅读 > 返回列表）+ 锁定背景滚动 */
  useEffect(() => {
    if (!project) return
    setCat(0)
    setPdf(null)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (pdfRef.current) setPdf(null)
      else onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [project, onClose])

  /* 记录当前 PDF（供 Esc 判断用，避免 effect 依赖抖动） */
  const pdfRef = useRef(null)
  pdfRef.current = pdf

  if (!project) return null
  const cur = cats[cat]

  /* 三列瀑布流：图片按顺序轮流分配（1→左、2→中、3→右），
     保证开头前 3 张各占一列顶部、严格对齐；下方自然流式 */
  const cols = [[], [], []]
  ;(cur.images || []).forEach((it, i) => cols[i % 3].push({ it, i }))
  const renderMedia = ({ it, i }) => {
    /* PDF 封面卡：点击打开阅读浮层 */
    if (typeof it === 'object' && it.pdf) {
      return (
        <figure
          className="pd__item pd__item--pdf"
          key={it.pdf}
          style={{ '--i': i }}
          onClick={() => setPdf({ src: it.pdf, title: it.title })}
        >
          <div className="pd__pdfcover">
            <img src={it.cover} alt={it.title} loading="lazy" />
            <span className="pd__pdfbadge">PDF</span>
          </div>
          <figcaption>
            <span className="pd__pdftitle">{it.title}</span>
            <span className="pd__pdfopen">点击翻阅 →</span>
          </figcaption>
        </figure>
      )
    }
    /* 视频卡：封面 + 播放按钮，点击后播放 */
    if (typeof it === 'object' && it.video) {
      return <VideoItem key={it.video} data={it} idx={i} />
    }
    /* 静态图 / GIF 动图（gif 直接 <img> 原样动） */
    const src = typeof it === 'object' ? it.gif : it
    return (
      <figure className="pd__item" key={src} style={{ '--i': i }}>
        <img src={src} alt={`${project.title} ${cur.label} ${i + 1}`} loading="lazy" />
      </figure>
    )
  }

  /* flow 布局：常规图按一排 3 个流式排列，遇到 note / wide 条目则整行独占：
     note → 全宽设计说明卡；wide → 全宽大图（如开模总图 / 图案合集） */
  const renderFlow = (items) => {
    const out = []
    let row = []
    const flush = () => {
      if (!row.length) return
      out.push(
        <div className="pd__brow" key={`row-${out.length}`}>
          {row.map(renderMedia)}
        </div>
      )
      row = []
    }
    items.forEach((it, i) => {
      if (it && typeof it === 'object' && (it.note || it.wide || it.duo)) {
        flush()
        if (it.note) {
          out.push(
            <div className="pd__note pd__note--inline" key={`note-${i}`}>
              {it.note}
            </div>
          )
        } else if (it.duo) {
          /* 两列组合：每列 = 小设计说明卡 + 对应图（如包材设计两款收纳盒） */
          out.push(
            <div className="pd__duo" key={`duo-${i}`}>
              {it.duo.map((col, k) => (
                <div className="pd__duo__col" key={k}>
                  {col.note && <div className="pd__note pd__note--inline pd__note--mini">{col.note}</div>}
                  {col.img && (
                    <figure className="pd__item">
                      <img src={col.img} alt={`${project.title} ${cur.label} ${i + 1}-${k + 1}`} />
                    </figure>
                  )}
                </div>
              ))}
            </div>
          )
        } else if (it.wide && typeof it.wide === 'object') {
          /* 通栏视频（宽条目传对象）：静音自动循环 */
          out.push(
            <figure className="pd__item pd__item--wide pd__item--video" key={`wv-${i}`}>
              <video poster={it.wide.poster} autoPlay muted loop playsInline preload="metadata">
                {it.wide.videoWebm && <source src={it.wide.videoWebm} type="video/webm" />}
                <source src={it.wide.video} type="video/mp4" />
              </video>
            </figure>
          )
        } else {
          out.push(
            <figure className="pd__item pd__item--wide" key={it.wide}>
              <img src={it.wide} alt={`${project.title} ${cur.label} ${i + 1}`} />
            </figure>
          )
        }
      } else {
        row.push({ it, i })
        if (row.length === 3) flush()
      }
    })
    flush()
    return out
  }

  /* —— 原生内容块：按站点排版渲染（不依赖截图） ——
     lead 导语 / facts 信息格 / chips 标签组 / cols 双列要点 / steps 编号卡
     cards 卡片组 / metrics 大数字 / table 数据表 / flow 流程链 / video 视频 */
  const renderBlocks = (blocks) =>
    blocks.map((b, i) => {
      switch (b.t) {
        case 'lead':
          return (
            <p className="pb__lead" key={i}>
              {rich(b.text, b.hl)}
            </p>
          )

        case 'facts':
          return (
            <div className="pb__facts" key={i}>
              {b.items.map((f) => (
                <div className="pb__fact" key={f.k}>
                  <span className="pb__fact-k">
                    {f.k}
                    {f.kb && <em>{f.kb}</em>}
                  </span>
                  <span className="pb__fact-v">{f.v}</span>
                  {f.sub && <span className="pb__fact-s">{f.sub}</span>}
                </div>
              ))}
            </div>
          )

        case 'chips':
          return (
            <div className={`pb__chips ${b.hero ? 'pb__chips--hero' : ''}`} key={i}>
              {b.items.map((c) => (
                <span className="pb__chip" key={c}>
                  {c}
                </span>
              ))}
            </div>
          )

        case 'cols':
          return (
            <div className="pb__cols" key={i}>
              {b.items.map((c) => (
                <div className={`pb__col pb__col--${c.tone || 'a'}`} key={c.title}>
                  <h4 className={`pb__col-t ${c.titleColor ? `is-${c.titleColor}` : ''}`}>
                    {c.icon && <em className="pb__col-ic">{c.icon}</em>}
                    {c.title}
                  </h4>
                  <ul className="pb__list">
                    {c.bullets.map((x, k) => (
                      <li key={k}>{x}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )

        case 'steps':
          return (
            <div
              className={`pb__steps pb__steps--${b.cols || 3} ${b.hero ? 'pb__steps--hero' : ''} ${
                b.badge ? 'pb__steps--badge' : ''
              }`}
              key={i}
            >
              {b.items.map((s) => (
                <div className="pb__step" key={s.title}>
                  <span className="pb__step-n">{s.n}</span>
                  <h4 className="pb__step-t">{s.title}</h4>
                  <p className="pb__step-d">{s.desc}</p>
                </div>
              ))}
            </div>
          )

        case 'cards':
          return (
            <div className={`pb__cards pb__cards--${b.cols || 2}`} key={i}>
              {b.items.map((c) => (
                <div className={`pb__card ${c.icon ? 'pb__card--ic' : ''}`} key={c.title}>
                  {c.icon && <span className="pb__card-icon">{c.icon}</span>}
                  <div className="pb__card-body">
                    <h4 className={`pb__card-t ${c.accent ? 'is-gold' : ''}`}>{c.title}</h4>
                    {c.tags && (
                      <div className="pb__card-tags">
                        {c.tags.map((x) => (
                          <span key={x}>{x}</span>
                        ))}
                      </div>
                    )}
                    <p className="pb__card-d">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )

        /* 交付文档卡：品类封面 + 页数，点击翻开完整 PDF（复用 .pv 阅读浮层） */
        case 'docs':
          return (
            <div className={`pb__docs${b.cols ? ` pb__docs--${b.cols}` : ''}`} key={i}>
              {b.items.map((d) => {
                const body = (
                  <>
                    <span className="pb__doc-cover">
                      <img src={d.cover} alt={d.title} loading="lazy" />
                      <em className="pb__doc-badge">{d.badge || 'PDF'}</em>
                      <span className="pb__doc-hover">{d.pdf ? '点击翻阅' : '点击下载'}</span>
                    </span>
                    <span className="pb__doc-body">
                      {d.tag && <span className="pb__doc-tag">{d.tag}</span>}
                      <span className="pb__doc-t">{d.title}</span>
                      {d.meta && <span className="pb__doc-m">{d.meta}</span>}
                    </span>
                  </>
                )
                /* 有内联预览（PDF）→ 点开浮层翻阅；没有（pptx 等浏览器不能内联渲染）→ 整卡作为下载入口 */
                return d.pdf ? (
                  <button
                    type="button"
                    className="pb__doc"
                    key={d.title}
                    onClick={() => setPdf({ src: d.pdf, title: d.title, file: d.file })}
                    title="点击翻阅完整文档"
                  >
                    {body}
                  </button>
                ) : (
                  <a className="pb__doc" key={d.title} href={d.file} download title="点击下载原文件">
                    {body}
                  </a>
                )
              })}
            </div>
          )

        /* 带标题的分组框（叙事逻辑流程 / 5 维终审标准） */
        case 'group':
          return (
            <section className={`pb__group ${b.tone ? `pb__group--${b.tone}` : ''}`} key={i}>
              {b.title && <div className="pb__group-t">{b.title}</div>}
              {renderBlocks(b.blocks)}
            </section>
          )

        case 'metrics':
          return (
            <div className={`pb__metrics pb__metrics--${b.cols || 3}`} key={i}>
              {b.items.map((m) => (
                <div className="pb__metric" key={m.k}>
                  <div className={`pb__metric-n ${m.tone ? `is-${m.tone}` : ''}`}>
                    <CountUp value={m.n} />
                  </div>
                  <div className="pb__metric-k">{m.k}</div>
                  {m.s && (
                    <div className={`pb__metric-s pb__metric-s--${m.dir || 'up'}`}>
                      <span>{m.s}</span>
                      {m.sub && <em>{m.sub}</em>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )

        case 'table':
          /* numCol：需要等宽加粗的数字列（默认第 2 列；传 null 则不做强调） */
          return (
            <div className="pb__tablewrap" key={i}>
              {b.title && <div className="pb__tabletitle">{b.title}</div>}
              <table className="pb__table">
                <thead>
                  <tr>
                    {b.head.map((h) => (
                      <th key={h}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {b.rows.map((r, ri) => (
                    <tr key={ri}>
                      {r.map((cell, ci) => (
                        <td
                          key={ci}
                          className={
                            (b.numCol === undefined ? 1 : b.numCol) === ci
                              ? 'is-num'
                              : b.hlCol === ci
                                ? 'is-hl'
                                : b.lastGood && ci === b.head.length - 1
                                  ? 'is-good'
                                  : ''
                          }
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )

        case 'timeline':
          return (
            <div className="pb__timeline" key={i}>
              {b.items.map((s) => (
                <div className="pb__tl" key={s.time}>
                  <span className="pb__tl-time">{s.time}</span>
                  <div className={`pb__tl-shot pb__tl-shot--${(s.shot && s.shot.tone) || 'blue'}`}>
                    {((s.shot && s.shot.lines) || [s.scene, ...(s.elements || [])]).map((l) => (
                      <span key={l}>{l}</span>
                    ))}
                  </div>
                  <h4 className="pb__tl-scene">{s.role}</h4>
                  <p className="pb__tl-ef">{(s.effects || []).map((e) => e).join(' ')}</p>
                </div>
              ))}
            </div>
          )

        case 'flow':
          return (
            <div className="pb__flow" key={i}>
              {b.items.map((f, fi) => (
                <Fragment key={f}>
                  <span className="pb__flow-i">{f}</span>
                  {fi < b.items.length - 1 && <i className="pb__flow-a">→</i>}
                </Fragment>
              ))}
            </div>
          )

        /* 链路：圆形图标 + 箭头 + 三行说明（盘活链路：滞销 → 诊断 → 重构 → 热销） */
        case 'chain':
          return (
            <div className="pb__chain" key={i}>
              {b.items.map((s, si) => (
                <Fragment key={s.title}>
                  <div className={`pb__chain-n pb__chain-n--${s.tone || 'gold'}`}>
                    <span className="pb__chain-ic">{s.icon}</span>
                    <h4 className="pb__chain-t">{s.title}</h4>
                    <ul className="pb__chain-l">
                      {(s.lines || []).map((x) => (
                        <li key={x}>{x}</li>
                      ))}
                    </ul>
                  </div>
                  {si < b.items.length - 1 && <i className="pb__chain-a">→</i>}
                </Fragment>
              ))}
            </div>
          )

        /* 改版前后对比：左「改版前」/ 右「改版后」，各含展示图 + 结论 */
        case 'compare':
          return (
            <section className="pb__cmp" key={i}>
              <div className="pb__cmp-head">
                <em className="pb__cmp-ic">{b.icon || '◧'}</em>
                {b.title}
              </div>
              <div className="pb__cmp-grid">
                {[b.before, b.after].map((side, si) => (
                  <div className={`pb__cmp-col pb__cmp-col--${si === 0 ? 'before' : 'after'}`} key={si}>
                    <div className="pb__cmp-tag">
                      {side.tag}
                      <em>{side.en}</em>
                    </div>
                    {side.items ? (
                      /* 单张展示：每张照片独立成格，同一侧统一格子尺寸；
                         需要看全的（side.scroll）保持同尺寸，超出部分框内滑动翻阅 */
                      <figure className={`pb__cmp-media pb__cmp-media--photos${side.scroll ? ' is-scroll' : ''}`}>
                        <div className="pb__cmp-photos" style={{ '--cols': side.cols || 5 }}>
                          {side.items.map((src, k) => (
                            <div className="pb__cmp-photo" key={src}>
                              <img src={src} alt={`${b.title} ${side.tag} ${k + 1}`} loading="lazy" />
                            </div>
                          ))}
                        </div>
                      </figure>
                    ) : (
                      side.img && (
                        <figure className={`pb__cmp-media${side.tall ? ' is-tall' : ''}`}>
                          <img src={side.img} alt={`${b.title} ${side.tag}`} />
                        </figure>
                      )
                    )}
                    {side.caption && <div className="pb__cmp-cap">{side.caption}</div>}
                    <p className="pb__cmp-txt">
                      <b>{side.label}</b>
                      {side.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )

        /* 模块卡：编号徽章 + 标题 + 英文 + 描述 + 子模块（如「SOP 四大核心模块」） */
        case 'mods':
          return (
            <div className={`pb__mods pb__mods--${b.cols || 2}`} key={i}>
              {b.items.map((m) => (
                <section className="pb__mod" key={m.n || m.title}>
                  <header className="pb__mod-head">
                    {m.n && <span className="pb__mod-n">{m.n}</span>}
                    <h4 className="pb__mod-t">
                      {m.title}
                      {m.en && <em>{m.en}</em>}
                    </h4>
                  </header>
                  <p className="pb__mod-d">{rich(m.desc, m.hl)}</p>
                  {m.subs && (
                    <div className="pb__mod-subs">
                      {m.subs.map((s) => (
                        <div className="pb__mod-sub" key={s.title}>
                          <h5 className="pb__mod-subT">{s.title}</h5>
                          <p className="pb__mod-subD">{s.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  {m.footer && (
                    <div className="pb__mod-foot">
                      <em>◫</em>
                      {m.footer}
                    </div>
                  )}
                </section>
              ))}
            </div>
          )

        /* 国别示范：标签（中文 + 英文）+ 通栏横幅图（点击可切换改造前 / 后对比） */
        case 'shots':
          return (
            <div className="pb__shots" key={i}>
              {b.items.map((s, si) => (
                <ShotCard s={s} idx={si} key={s.img} />
              ))}
            </div>
          )

        /* 单图：整幅效果图 / 长网页截图（可半宽靠右 + 说明文字） */
        case 'figure':
          return (
            <figure
              className={`pb__fig pb__fig--${b.size || 'wide'}${b.align ? ` is-${b.align}` : ''}`}
              key={i}
            >
              <div className="pb__fig-frame">
                <img src={b.img} alt={b.alt || b.caption || ''} loading="lazy" />
              </div>
              {b.caption && <figcaption className="pb__fig-cap">{b.caption}</figcaption>}
            </figure>
          )

        /* 图片组：同排 N 张实拍 + 组说明（包装体系 / 生辰花卡片） */
        case 'gallery':
          return (
            <figure className="pb__gal" key={i}>
              <div className={`pb__gal-grid pb__gal-grid--${b.cols || 3}`}>
                {b.items.map((it) => {
                  const src = typeof it === 'string' ? it : it.img
                  const cap = typeof it === 'object' ? it.cap : null
                  return (
                    <div className="pb__gal-item" key={src}>
                      <img src={src} alt={cap || b.caption || ''} loading="lazy" />
                      {cap && <span className="pb__gal-itemcap">{cap}</span>}
                    </div>
                  )
                })}
              </div>
              {b.caption && <figcaption className="pb__gal-note">{b.caption}</figcaption>}
            </figure>
          )

        /* 规格卡：编号 / 大数字 + 标题 + 说明（项目背景数据 / 9 图标准 / 图片标准详解）
           字段：n 编号或数字、title、en、lines 短行、desc 描述、rows 键值行（痛点 / 数据） */
        case 'specs':
          return (
            <div
              className={`pb__specs pb__specs--${b.cols || 3}${b.hero ? ' is-hero' : ''}`}
              key={i}
            >
              {b.items.map((s, si) => (
                <div className={`pb__spec${s.tone ? ` is-${s.tone}` : ''}`} key={`${s.title}-${si}`}>
                  <div className="pb__spec-head">
                    {s.n && <span className="pb__spec-n">{s.n}</span>}
                    <h4 className="pb__spec-t">
                      {s.title}
                      {s.en && <em>{s.en}</em>}
                    </h4>
                  </div>
                  {s.lines && (
                    <ul className="pb__spec-lines">
                      {s.lines.map((l) => (
                        <li key={l}>{l}</li>
                      ))}
                    </ul>
                  )}
                  {s.desc && <p className="pb__spec-d">{rich(s.desc, s.hl)}</p>}
                  {s.rows && (
                    <dl className="pb__spec-rows">
                      {s.rows.map((r) => (
                        <div className={`pb__spec-row${r.tone ? ` is-${r.tone}` : ''}`} key={r.k}>
                          <dt>{r.k}</dt>
                          <dd>{rich(r.v, r.hl)}</dd>
                        </div>
                      ))}
                    </dl>
                  )}
                </div>
              ))}
            </div>
          )

        /* 产品页：分组标题 + 编号/名称/徽章 + 左侧 A+ 长图 + 右侧三段说明 */
        case 'products':
          return (
            <div className="pb__prods" key={i}>
              {b.title && (
                <header className="pb__prods-head">
                  {b.icon && <em className="pb__prods-ic">{b.icon}</em>}
                  <h4 className="pb__prods-t">{b.title}</h4>
                  {b.en && <span className="pb__prods-en">{b.en}</span>}
                </header>
              )}
              {b.items.map((p) => (
                <section className="pb__prod" key={p.n}>
                  <header className="pb__prod-top">
                    <span className="pb__prod-n">{p.n}</span>
                    <h5 className="pb__prod-t">{p.title}</h5>
                    {p.badge && <span className="pb__prod-badge">{p.badge}</span>}
                  </header>
                  <div className="pb__prod-body">
                    <figure className="pb__prod-media">
                      <img src={p.img} alt={p.title} loading="lazy" />
                    </figure>
                    <div className="pb__prod-info">
                      {p.story && (
                        <div className="pb__prod-sec">
                          <b>核心叙事</b>
                          <p>{p.story}</p>
                        </div>
                      )}
                      {p.highlights && (
                        <div className="pb__prod-sec">
                          <b>设计亮点</b>
                          <ul className="pb__list">
                            {p.highlights.map((x) => (
                              <li key={x}>{x}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {p.modules && (
                        <div className="pb__prod-sec">
                          <b>设计模块</b>
                          <div className="pb__prod-tags">
                            {p.modules.map((x) => (
                              <span key={x}>{x}</span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </section>
              ))}
            </div>
          )

        /* 占比条：销量占比可视化 */
        case 'bars':
          return (
            <section className="pb__group pb__group--gold" key={i}>
              {b.title && <div className="pb__group-t">{b.title}</div>}
              <div className="pb__bars">
                {b.items.map((it) => (
                  <div className="pb__bar" key={it.label}>
                    <span className="pb__bar-k">{it.label}</span>
                    <span className="pb__bar-track">
                      <span
                        className={`pb__bar-fill pb__bar-fill--${it.tone || 'gold'}`}
                        style={{ width: `${it.pct}%` }}
                      >
                        {it.text}
                      </span>
                    </span>
                    <span className="pb__bar-v">{it.total}</span>
                  </div>
                ))}
              </div>
            </section>
          )

        case 'video':
          return (
            <figure className="pb__video" key={i}>
              <video poster={b.poster} autoPlay muted loop playsInline preload="metadata">
                {b.webm && <source src={b.webm} type="video/webm" />}
                <source src={b.src} type="video/mp4" />
              </video>
            </figure>
          )

        default:
          return null
      }
    })

  return (
    <div className="pd" role="dialog" aria-modal="true">
      <div className="pd__backdrop" onClick={onClose} />

      <div className="pd__panel">
        <header className="pd__head">
          <button className="pd__back" onClick={onClose}>
            <i>←</i> 返回
          </button>
        </header>

        <div className="pd__headinfo">
          <span className="pd__idx">PROJECT {project.id}</span>
          <h2 className="pd__title">{project.title}</h2>
          <p className="pd__sub">{project.detail.intro}</p>
        </div>

        <nav className="pd__tabs">
          {cats.map((c, i) => (
            <button
              key={c.key}
              className={`pd__tab ${i === cat ? 'on' : ''}`}
              onClick={() => setCat(i)}
            >
              <em>{c.en}</em>
              {c.label}
              {(c.images || []).length > 1 && <i>{c.images.length}</i>}
            </button>
          ))}
        </nav>

        <p className={`pd__catdesc ${cur.bigDesc ? 'pd__catdesc--big' : ''}`}>{cur.desc}</p>

        {/* 设计说明 / 想法文字（来自站酷作品集对应板块） */}
        {cur.note && (
          <div className="pd__note">
            <b>DESIGN NOTES · 设计说明</b>
            {cur.note}
          </div>
        )}

        {/* 原生内容块排版（圣诞 AI 广告战役等文字型案例） */}
        {cur.blocks && <div className="pb" key={cur.key}>{renderBlocks(cur.blocks)}</div>}

        {!cur.blocks && (
        <div
          className={`pd__grid ${cur.bare ? 'pd__grid--bare' : ''} ${cur.layout === 'flow' ? 'pd__grid--flow' : ''}`}
          key={cur.key}
        >
          {cur.layout === 'banner' ? (
            /* banner 专属排版：首图通栏 → 两列一组 → 三列往下排 */
            <>
              <div className="pd__bhero">{renderMedia({ it: cur.images[0], i: 0 })}</div>
              <div className="pd__bpair">
                {cur.images.slice(1, 5).map((it, k) => renderMedia({ it, i: k + 1 }))}
              </div>
              {cur.images
                .slice(5)
                .reduce((rows, it, k) => {
                  const r = Math.floor(k / 3)
                  if (!rows[r]) rows[r] = []
                  rows[r].push({ it, i: k + 5 })
                  return rows
                }, [])
                .map((row, r) => (
                  <div className="pd__brow" key={r}>
                    {row.map(renderMedia)}
                  </div>
                ))}
            </>
          ) : cur.layout === 'flow' ? (
            /* flow 布局：三列流式 + note/wide 整行独占（产品板块：说明→图→…→说明→图） */
            renderFlow(cur.images)
          ) : (
            cols.map((items, col) => (
              <div className="pd__col" key={col}>
                {items.map(renderMedia)}
              </div>
            ))
          )}
        </div>
        )}
      </div>

      {/* PDF 阅读浮层（Behance 式：居中窗口 + 标题栏 + 整篇翻阅 + 右上角关闭） */}
      {pdf && (
        <div
          className="pv"
          role="dialog"
          aria-modal="true"
          onClick={(e) => {
            if (e.target === e.currentTarget) setPdf(null)
          }}
        >
          <div className="pv__win">
            <header className="pv__bar">
              {pdf.file && (
                <span className="pv__dl is-ghost" aria-hidden="true">
                  下载原文件 ↓
                </span>
              )}
              <span className="pv__title">{pdf.title}</span>
              {pdf.file && (
                <a className="pv__dl" href={pdf.file} download>
                  下载原文件 ↓
                </a>
              )}
              <button className="pv__close" onClick={() => setPdf(null)} aria-label="关闭 PDF">
                <span />
                <span />
              </button>
            </header>
            <iframe className="pv__frame" src={pdf.src} title={pdf.title} />
          </div>
        </div>
      )}
    </div>
  )
}
