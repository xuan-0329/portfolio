import { site } from '../data/site'
import { useReveal } from '../hooks/useReveal'

export default function Contact() {
  const ref = useReveal()
  const { contact } = site
  const words = Array.from({ length: 4 })

  return (
    <section className="contact" id="contact">
      <div className="marquee" aria-hidden="true">
        {[0, 1].map((k) => (
          <div className="marquee__track" key={k}>
            {words.map((_, i) => (
              <span key={i}>{contact.marquee}</span>
            ))}
          </div>
        ))}
      </div>

      <div className="shell contact__mid" ref={ref}>
        <div className="rv">
          <span className="label">{contact.label}</span>
          <h2 className="contact__title" style={{ marginTop: 30 }}>
            {contact.heading.map((line, i) => (
              <span key={i}>{line}</span>
            ))}
          </h2>
          <p className="contact__desc">{contact.desc}</p>
          <a className="mailto" href={`mailto:${contact.email}`}>
            {contact.email}
            <i>↗</i>
          </a>
        </div>

        <div className="socials">
          {contact.socials.map((s) => (
            <a className="social" href={s.href} key={s.k}>
              <span className="k">{s.k}</span>
              <span className="v">{s.v}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="shell">
        <div className="foot">
          {contact.footer.map((f, i) => (
            <span key={i}>{f.k}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
