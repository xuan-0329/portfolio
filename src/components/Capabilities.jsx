import { site } from '../data/site'
import { icons } from './Icons'
import { useReveal } from '../hooks/useReveal'

function CapCard({ c, i }) {
  const ref = useReveal()
  const Icon = icons[i % icons.length]
  return (
    <div
      className="cap rv"
      ref={ref}
      style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
    >
      <div className="cap__top">
        <span className="cap__ico">
          <Icon />
        </span>
        <span className="cap__n">{c.n}</span>
      </div>
      <h3 className="cap__title">{c.title}</h3>
      <div className="cap__en">{c.en}</div>
      <p className="cap__desc">{c.desc}</p>
      <div className="tags">
        {c.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Capabilities() {
  const headRef = useReveal()
  const { capabilities } = site

  return (
    <section className="sec" id="capabilities">
      <div className="shell">
        <div className="sec-head rv" ref={headRef}>
          <div>
            <span className="label">{capabilities.label}</span>
            <h2 className="sec-head__title">{capabilities.heading}</h2>
          </div>
          <p className="sec-head__desc">{capabilities.desc}</p>
        </div>

        <div className="caps">
          {capabilities.items.map((c, i) => (
            <CapCard c={c} i={i} key={c.n} />
          ))}
        </div>
      </div>
    </section>
  )
}
