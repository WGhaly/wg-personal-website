import Image from 'next/image'
import { CLIENTS, CONSULTING, CONTACT, HERO, JOURNEY, LINKS, NIN9, PLAN, PRINCIPLES } from '@/lib/content'
import { Stop } from '../jelly/Stop'
import { Chapter, Frames } from './Chapter'

/** The home story, chapter by chapter. Station order: lib/jelly/stations.ts. */

/** 0 · Opening: the page opens on the gold WG tile; it pours out and becomes the word "Nin9". */
export function Opening() {
  return (
    <Stop holds={2}>
      <section id="hello" data-jelly-section className="relative flex min-h-[100svh] items-center bg-ground pt-[var(--header-h)]">
        <div className="shell flex flex-col items-center text-center">
          <div
            data-jelly="wg-mark"
            data-jelly-type="fill"
            data-jelly-radius="20"
            className="jelly-round mb-10 flex h-20 w-20 items-center justify-center font-serif text-3xl font-bold [--round:20px] md:mb-12 md:h-24 md:w-24 md:text-4xl"
            aria-hidden="true"
          >
            WG
          </div>
          <p className="eyebrow mb-4">{HERO.eyebrow}</p>
          <h1 className="hero-title">{HERO.name}</h1>
          <p className="body-copy mt-6 max-w-[52ch] md:text-xl">
            {HERO.subA}{' '}
            <span data-jelly="hero-nin9" data-jelly-type="text" className="whitespace-nowrap font-semibold">
              {HERO.subWord}
            </span>
            {HERO.subB}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#nin9" className="btn-secondary gap-3">
              <svg aria-hidden="true" viewBox="0 0 16 16" className="h-3.5 w-3.5">
                <path d="M3 1.5v13l11-6.5z" fill="currentColor" />
              </svg>
              {HERO.watch}
            </a>
            <a href="#contact" className="btn-ghost">
              {HERO.contact}
            </a>
          </div>
        </div>
      </section>
    </Stop>
  )
}

/** 1 · Nin9: the liquid traces the video frame, then the page holds still so the visitor can watch. */
export function Nin9() {
  return (
    <Stop>
      <section
        id="nin9"
        data-jelly-section
        className="relative flex min-h-[100svh] items-center bg-ground pb-6 pt-[calc(var(--header-h)+16px)] md:pb-10 md:pt-[calc(var(--header-h)+24px)]"
      >
        <div className="shell grid w-full items-center gap-6 md:grid-cols-12 md:gap-10">
          <div className="flex flex-col gap-4 md:col-span-5">
            <p className="eyebrow">{NIN9.label}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/media/nin9/nin9-lockup-white.svg" alt="nin9" className="h-auto w-[150px] md:w-[190px]" />
            <h2 className="chapter-title">{NIN9.title}</h2>
            <p data-reveal className="reveal body-copy max-md:hidden">{NIN9.body}</p>
            <div data-reveal className="reveal flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-sm text-ink-muted">{NIN9.role}</span>
              <a href={LINKS.nin9} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold underline-offset-4 hover:underline">
                {NIN9.visit} ↗
              </a>
            </div>
          </div>
          <div className="md:col-span-7">
            <figure
              data-jelly="nin9-frame"
              data-jelly-type="outline"
              data-jelly-stroke="2"
              data-jelly-radius="12"
              className="jelly-frame bg-card p-2 [--round:12px] md:p-3"
            >
              <video controls playsInline preload="none" poster="/media/nin9/poster.jpg" className="aspect-video w-full rounded-md bg-black">
                <source src="/media/nin9/nin9-pitch.mp4" type="video/mp4" />
                <track kind="captions" src="/media/nin9/en.vtt" srcLang="en" label="English captions" />
                Your browser can&apos;t play this video.
              </video>
            </figure>
            <p className="mt-3 text-xs text-ink-muted">{NIN9.videoNote}</p>
          </div>
        </div>
      </section>
    </Stop>
  )
}

/** 2 · The plan: three phases traced as one outline, lit 1 → 3. */
export function Plan() {
  return (
    <Chapter id="plan" label={PLAN.label} title={PLAN.title} body={PLAN.body}>
      <Frames id="plan-phases" cols={3} items={PLAN.phases.map((p, i) => ({ tag: `0${i + 1} · ${p.tag}`, name: p.name, body: p.body }))} />
    </Chapter>
  )
}

/** 3 · Consulting: four areas traced as one outline. */
export function Consulting() {
  return (
    <Chapter id="consulting" label={CONSULTING.label} title={CONSULTING.title} body={CONSULTING.body}>
      <Frames id="consulting-areas" cols={4} items={CONSULTING.areas.map((a, i) => ({ tag: `0${i + 1}`, ...a }))} />
    </Chapter>
  )
}

/** 4 · Journey: the liquid becomes the word "building"; the roles appear one by one. */
export function Journey() {
  return (
    <Chapter
      id="journey"
      label={JOURNEY.label}
      title={
        <>
          {JOURNEY.titleA}{' '}
          <span data-jelly="journey-word" data-jelly-type="text">
            {JOURNEY.titleWord}
          </span>
          {JOURNEY.titleB}
        </>
      }
      body={JOURNEY.body}
    >
      <ol className="divide-y divide-line border-y border-line">
        {JOURNEY.roles.map((r) => (
          <li
            key={r.org}
            data-reveal
            className={`reveal grid grid-cols-[88px_1fr] gap-x-4 py-2.5 md:grid-cols-[140px_240px_1fr] md:items-baseline md:gap-x-8 md:py-3.5 ${r.quiet ? 'text-ink-muted' : ''}`}
          >
            <span className="text-xs uppercase tracking-[0.14em] text-ink-muted md:text-[13px]">{r.when}</span>
            <span className={`font-semibold ${r.quiet ? 'text-sm font-medium' : 'md:text-lg'}`}>{r.org}</span>
            <span className={`col-start-2 text-sm text-ink-muted md:col-start-auto ${r.quiet ? '' : 'md:text-[15px]'}`}>
              {r.role}
              {r.note && <span className="block text-xs md:inline md:text-[13px]"><span className="max-md:hidden"> · </span>{r.note}</span>}
            </span>
          </li>
        ))}
      </ol>
    </Chapter>
  )
}

/** 5 · Worked with: the liquid becomes "worked"; the logo wall fades in in three rows. */
export function Clients() {
  const rows = [CLIENTS.logos.slice(0, 10), CLIENTS.logos.slice(10, 20), CLIENTS.logos.slice(20)]
  return (
    <Chapter
      id="clients"
      label={CLIENTS.label}
      title={
        <>
          {CLIENTS.titleA}{' '}
          <span data-jelly="clients-word" data-jelly-type="text">
            {CLIENTS.titleWord}
          </span>{' '}
          {CLIENTS.titleB}
        </>
      }
    >
      <div className="flex flex-col gap-2 md:gap-3">
        {rows.map((row, i) => (
          <ul key={i} data-reveal className="reveal grid grid-cols-5 gap-2 md:grid-cols-10 md:gap-3">
            {row.map((c) => (
              <li key={c.logo} className="logo-tile relative aspect-[3/2] rounded-lg bg-[#EDEBE6]">
                <Image src={c.logo} alt={c.name} fill sizes="(min-width: 768px) 10vw, 20vw" className="object-contain p-2 md:p-3" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </Chapter>
  )
}

/** 6 · How I work: the liquid becomes "execution". */
export function Principles() {
  return (
    <Chapter
      id="principles"
      label={PRINCIPLES.label}
      title={
        <>
          {PRINCIPLES.titleA}{' '}
          <span data-jelly="execution" data-jelly-type="text">
            {PRINCIPLES.titleWord}
          </span>{' '}
          {PRINCIPLES.titleB}
        </>
      }
    >
      <ul className="grid gap-2.5 md:grid-cols-3 md:gap-5">
        {PRINCIPLES.items.map((p, i) => (
          <li key={p.name} data-reveal className="reveal flex gap-4 rounded-xl bg-card p-4 md:min-h-[170px] md:flex-col md:justify-between md:p-6">
            <span className="text-xs tabular-nums tracking-[0.18em] text-ink-muted">0{i + 1}</span>
            <span className="flex flex-col gap-1.5">
              <span className="font-serif text-xl font-semibold md:text-2xl">{p.name}</span>
              <span className="text-[14px] leading-relaxed text-ink-muted md:text-[15px]">{p.body}</span>
            </span>
          </li>
        ))}
      </ul>
    </Chapter>
  )
}

/** 7 · Contact: the liquid ends as the email button. */
export function Contact() {
  return (
    <Stop>
      <section id="contact" data-jelly-section className="relative flex min-h-[100svh] items-center bg-ground pt-[var(--header-h)]">
        <div className="shell flex flex-col items-center text-center">
          <p className="eyebrow mb-3">{CONTACT.label}</p>
          <h2 className="hero-title">{CONTACT.title}</h2>
          <p className="body-copy mt-6 max-w-[48ch]">{CONTACT.body}</p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <a
              href={`mailto:${LINKS.email}`}
              data-jelly="contact-email"
              data-jelly-type="fill"
              data-jelly-radius="10"
              className="jelly-round inline-flex min-h-14 items-center justify-center px-7 text-base font-semibold [--round:10px] md:text-lg"
            >
              {LINKS.email}
            </a>
            <a data-reveal href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="reveal btn-secondary min-h-14">
              {CONTACT.linkedin} ↗
            </a>
          </div>
        </div>
      </section>
    </Stop>
  )
}
