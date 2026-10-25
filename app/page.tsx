import { JellyLayer } from '@/components/jelly/JellyLayer'
import Header from '@/components/story/Header'
import Footer from '@/components/story/Footer'
import { StoryRail } from '@/components/story/StoryRail'
import { Clients, Consulting, Contact, Journey, Nin9, Opening, Plan, Principles } from '@/components/story/Chapters'
import { CHAPTERS } from '@/lib/content'

export default function Home() {
  return (
    <>
      <Header />
      <StoryRail chapters={CHAPTERS} label="Chapters" />
      <main>
        <Opening />
        <Nin9 />
        <Plan />
        <Consulting />
        <Journey />
        <Clients />
        <Principles />
        <Contact />
      </main>
      <Footer />
      <JellyLayer />
    </>
  )
}
