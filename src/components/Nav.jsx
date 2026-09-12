import { useEffect, useState } from 'react'
import { site } from '../data/site'

const LINKS = site.nav

export default function Nav() {
  const [stuck, setStuck] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['#home', ...LINKS.map((l) => l.href), '#contact']
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive('#' + e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.querySelector(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <header className={`nav ${stuck ? 'stuck' : ''}`}>
      <div className="shell nav__in">
        <a className="brand" href="#home">
          <span className="brand__mark">{site.brand.mark}</span>
          <span className="brand__name">{site.brand.name}</span>
        </a>

        <nav className="nav__links">
          {LINKS.map((l) => (
            <a
              key={l.href}
              className={`nav__link ${active === l.href ? 'active' : ''}`}
              href={l.href}
            >
              {l.label}
              <span>{l.en}</span>
            </a>
          ))}
        </nav>

        <div className="nav__right">
          <span className="nav__status">
            <i className="dot" />
            Available
          </span>
          <a className="btn" href={site.navCTA.href}>
            <i className="btn__dot" />
            {site.navCTA.label}
          </a>
        </div>
      </div>
    </header>
  )
}
