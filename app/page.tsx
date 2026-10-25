import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Ventures from '@/components/Ventures'
import Consulting from '@/components/Consulting'
import Clients from '@/components/Clients'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navigation />
      <Hero />
      <Ventures />
      <Consulting />
      <Clients />
      <Contact />
      <Footer />
    </main>
  )
}
