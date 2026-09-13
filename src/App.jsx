import Nav from './components/Nav'
import Hero3 from './components/Hero3'
import About from './components/About'
import Work from './components/Work'
import Capabilities from './components/Capabilities'
import Contact from './components/Contact'
import SoundScape from './components/SoundScape'

export default function App() {
  return (
    <>
      <div className="grain" />
      <Nav />
      <main>
        <Hero3 />
        <hr className="hairline" />
        <About />
        <hr className="hairline" />
        <Work />
        <hr className="hairline" />
        <Capabilities />
        <Contact />
      </main>
      <SoundScape />
    </>
  )
}
