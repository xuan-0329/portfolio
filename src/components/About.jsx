import CountUp from './CountUp'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

/**
 * 数字滚动：统一走 CountUp 组件（与作品卡数字同一实现）。
 * - 整数（'05'）：保留位数补零（00 → 05）
 * - 小数（'7.45'）：保留小数位滚动
 */
function StatNumber({ value }) {
  return <CountUp value={value} />
}

/**
 * 个人经历 — 左侧人像/姓名（sticky），右侧自述 + 联系方式；
 * 下方整宽：4 个关键数据 + 职业路径时间轴。
 */
export default function About() {
  const headRef = useReveal()
  const leftRef = useReveal()
  const rightRef = useReveal()
  const statsRef = useReveal()
  const tlRef = useReveal()
  const { about, brand } = site

  return (
    <section className="sec" id="about">
      <div className="shell">
        <div className="sec-head rv" ref={headRef}>
          <div>
            <span className="label">{about.label}</span>
            <h2 className="sec-head__title">{about.heading}</h2>
          </div>
          <p className="sec-head__desc">
            从 UI 设计师到品牌设计总监，5 年一路走来的路径、判断与方法。
          </p>
        </div>

        <div className="about__grid">
          {/* 左：人像 + 姓名（sticky 跟随） */}
          <div className="about__left rv" ref={leftRef}>
            <div className="portrait">
              {about.portrait ? (
                <img src={about.portrait} alt={brand.nameCN} />
              ) : (
                <div className="portrait__ph">
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#5b6068"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  >
                    <circle cx="12" cy="8.2" r="3.6" />
                    <path d="M4.5 20.5c0-4 3.4-6.4 7.5-6.4s7.5 2.4 7.5 6.4" />
                  </svg>
                </div>
              )}
              <div className="portrait__tag">
                <span>
                  {brand.name} · {brand.nameCN}
                </span>
                <span>GUANGZHOU</span>
              </div>
            </div>
            <div className="about__name">
              <h3>{brand.nameCN}</h3>
            </div>
          </div>

          {/* 右：自述 + 联系方式 */}
          <div className="about__right rv" ref={rightRef}>
            {about.paragraphs.map((p, i) => (
              <p className="about__p" key={i}>
                {p}
              </p>
            ))}

            <ul className="contact-list">
              {about.contact.map((c) => (
                <li key={c.k}>
                  <span className="k">{c.k}</span>
                  {c.href ? (
                    <a className="v" href={c.href}>
                      {c.v}
                    </a>
                  ) : (
                    <span className="v">{c.v}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 关键数据 */}
        <div className="stats rv" ref={statsRef}>
          {about.stats.map((s) => (
            <div className="stat" key={s.en}>
              <div className="stat__n">
                <StatNumber value={s.n} />
                <em>{s.u}</em>
              </div>
              <div className="stat__k">{s.k}</div>
              <div className="stat__en">{s.en}</div>
            </div>
          ))}
        </div>

        {/* 职业路径时间轴 */}
        <div className="tl rv" ref={tlRef}>
          <div className="tl__list">
            {about.timeline.map((t) => (
              <div className="tl__item" key={t.y}>
                <span className="tl__y">{t.y}</span>
                <span className="tl__t">{t.t}</span>
                <span className="tl__d">{t.d}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
