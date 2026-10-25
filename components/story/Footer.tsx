import { LINKS } from '@/lib/content'
import { MotionToggle } from './MotionToggle'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ground">
      <div className="shell flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-xl font-bold">Waseem Ghaly</p>
          <p className="mt-1 text-sm text-ink-muted">Founder of Nin9 · Consultant · Egypt</p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink-muted">
          <a href={LINKS.nin9} target="_blank" rel="noopener noreferrer" className="hover:text-ink">nin9.org</a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
          <a href={`mailto:${LINKS.email}`} className="hover:text-ink">Email</a>
          <MotionToggle pauseLabel="Pause motion" playLabel="Play motion" />
        </nav>
      </div>
      <p className="shell pb-8 text-xs text-ink-muted">© {new Date().getFullYear()} Waseem Ghaly</p>
    </footer>
  )
}
