import { useState } from 'react'
import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'
import CountUp from './CountUp'
import ProjectDetail from './ProjectDetail'

const TONES = {
  a: ['rgba(120,150,255,0.30)', 'rgba(60,80,160,0.30)'],
  b: ['rgba(255,170,120,0.28)', 'rgba(150,70,60,0.28)'],
  c: ['rgba(120,235,200,0.26)', 'rgba(40,120,120,0.28)'],
  d: ['rgba(200,180,255,0.26)', 'rgba(90,70,170,0.28)'],
  e: ['rgba(150,200,255,0.28)', 'rgba(60,110,190,0.30)'],
  f: ['rgba(255,190,210,0.24)', 'rgba(150,70,110,0.28)'],
}

function ProjectCard({ p, onOpen }) {
  const ref = useReveal()
  const [c1, c2] = TONES[p.tone] || TONES.a

  return (
    <article className="card" ref={ref}>
      <div className="rv">
        <div className={`card__media${p.video ? ' card__media--video' : ''}${p.portrait ? ' card__media--portrait' : ''}`}>
          {p.video ? (
            <video poster={p.poster || p.image} autoPlay muted loop playsInline preload="metadata">
              {p.videoWebm && <source src={p.videoWebm} type="video/webm" />}
              <source src={p.video} type="video/mp4" />
            </video>
          ) : p.image ? (
            <img src={p.image} alt={p.title} />
          ) : (
            <div className="media__ph" style={{ '--c1': c1, '--c2': c2 }}>
              <span className="media__word">{p.title}</span>
            </div>
          )}
          <span className="card__no">{p.id}</span>
          <span className="card__year">{p.year}</span>
        </div>
      </div>

      <div className="card__body rv" style={{ transitionDelay: '.12s' }}>
        <span className="card__idx">PROJECT {p.id}</span>
        <h3 className="card__title">{p.title}</h3>
        <p className="card__sub">{p.subtitle}</p>

        <div className="card__meta">
          <div>
            <em>Role</em>
            <span>{p.role}</span>
          </div>
          <div>
            <em>Scope</em>
            <span>{p.scope}</span>
          </div>
        </div>

        {p.metrics.length > 0 && (
          <div className={`metrics${p.metrics.length > 2 ? ' metrics--3' : ''}`}>
            {p.metrics.map((m) => (
              <div className="metric" key={m.k}>
                <div className="metric__n">
                  <CountUp value={m.n} />
                </div>
                <div className="metric__k">{m.k}</div>
                {m.s && <div className="metric__s">{m.s}</div>}
              </div>
            ))}
          </div>
        )}

        <div className="tags">
          {p.tags.map((t) => (
            <span className="tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <a
          className="card__link"
          href={p.detail ? '#project-detail' : '#contact'}
          onClick={(e) => {
            if (p.detail) {
              e.preventDefault()
              onOpen(p)
            }
            /* 无详情数据的项目保持锚点行为 */
          }}
        >
          {p.detail ? '查看完整案例' : '索取案例详情'} <i />
        </a>
      </div>
    </article>
  )
}

export default function Work() {
  const headRef = useReveal()
  const { work } = site
  const [openProject, setOpenProject] = useState(null)

  return (
    <section className="sec" id="work">
      <div className="shell">
        <div className="sec-head rv" ref={headRef}>
          <div>
            <span className="label">{work.label}</span>
            <h2 className="sec-head__title">{work.heading}</h2>
          </div>
          <p className="sec-head__desc">{work.desc}</p>
        </div>

        <div className="work__list">
          {work.projects.map((p) => (
            <ProjectCard p={p} key={p.id} onOpen={setOpenProject} />
          ))}
        </div>

        <div className="work__more rv">
          <a className="btn btn--ghost" href="#contact">
            <i className="btn__dot" />
            索取完整作品集 PDF
          </a>
        </div>
      </div>

      <ProjectDetail project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  )
}
