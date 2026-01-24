import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import About from '@/components/About'
import DualLeadership from '@/components/DualLeadership'
import BiggerPicture from '@/components/BiggerPicture'
import Journey from '@/components/Journey'
import Expertise from '@/components/Expertise'
import Clients from '@/components/Clients'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero />
      <About />
      <Contact />
      <DualLeadership />
      <BiggerPicture />
      <Journey />
      <Expertise />
      <Clients />
      <Footer />
    </main>
  )
}
