export default function Footer() {
  return (
    <footer className="snap-footer bg-black border-t border-white/10">
      <div className="section-container py-8 flex flex-col sm:flex-row gap-4 items-center justify-between text-sm text-white/40">
        <p>© {new Date().getFullYear()} Waseem Ghaly</p>
        <nav className="flex gap-6">
          <a href="https://nin9.org" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Nin9</a>
          <a href="https://progressiosolutions.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Progressio</a>
          <a href="https://www.byitcorp.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">Byit</a>
          <a href="https://www.linkedin.com/in/waseem-ghaly" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">LinkedIn</a>
        </nav>
      </div>
    </footer>
  )
}
