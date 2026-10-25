import type { ReactNode } from 'react'
import { Stop } from '../jelly/Stop'

/**
 * One chapter of the story on one screen: a short headline, then everything the chapter shows. While the liquid is
 * live the section sticks (Stop) for `holds` stops so the visitor reads a still, complete screen.
 */
export function Chapter({
  id,
  label,
  title,
  body,
  holds = 1,
  children,
}: {
  id: string
  label: string
  title: ReactNode
  body?: ReactNode
  holds?: number
  children?: ReactNode
}) {
  return (
    <Stop holds={holds}>
      <section
        id={id}
        data-jelly-section
        className="relative flex min-h-[100svh] items-center bg-ground pb-6 pt-[calc(var(--header-h)+16px)] md:pb-10 md:pt-[calc(var(--header-h)+24px)]"
      >
        <div className="shell relative w-full">
          <header className="mb-6 flex flex-col gap-3 md:mb-10 md:flex-row md:items-end md:justify-between md:gap-10">
            <div>
              <p className="eyebrow mb-2 md:mb-3">{label}</p>
              <h2 className="chapter-title max-w-[22ch]">{title}</h2>
            </div>
            {body && <p className="body-copy max-w-[42ch]">{body}</p>}
          </header>
          {children}
        </div>
      </section>
    </Stop>
  )
}

/**
 * Frames the liquid traces as one outline (3–4 parts), lit in order during the hold.
 * Each step: a small tag or number, a name and a line of body copy.
 */
export function Frames({
  id,
  items,
  cols,
}: {
  id: string
  items: { tag: string; name: string; body: string }[]
  cols: 3 | 4
}) {
  return (
    <ol
      data-jelly={id}
      data-jelly-type="outline"
      data-jelly-stroke="2"
      data-jelly-radius="12"
      className={`grid gap-2.5 md:gap-5 ${cols === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2 lg:grid-cols-4'}`}
    >
      {items.map((it) => (
        <li
          key={it.name}
          data-jelly-part
          className="jelly-frame lit-part flex items-start gap-4 px-4 py-3.5 [--round:12px] md:min-h-[190px] md:flex-col md:justify-between md:p-6"
        >
          <span className="w-12 flex-none pt-1 text-xs font-medium uppercase tracking-[0.18em] text-ink-muted md:w-auto md:pt-0">
            {it.tag}
          </span>
          <span className="flex flex-col gap-1.5">
            <span className="font-serif text-xl font-semibold md:text-2xl">{it.name}</span>
            <span className="text-[14px] leading-relaxed text-ink-muted md:text-[15px]">{it.body}</span>
          </span>
        </li>
      ))}
    </ol>
  )
}
