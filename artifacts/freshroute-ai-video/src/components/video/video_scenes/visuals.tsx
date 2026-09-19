import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const EASE = [0.16, 1, 0.3, 1] as const;

export function BrandMark() {
  return (
    <div className="flex items-center gap-[.7vw]">
      <div className="relative h-[2.45vw] w-[2.45vw] min-h-[22px] min-w-[22px] rotate-45 rounded-[.7vw] bg-[var(--teal)] shadow-[0_.45vw_.8vw_rgba(13,119,114,.2)]">
        <span className="absolute left-[31%] top-[31%] h-[38%] w-[38%] rounded-full bg-[var(--yellow)]" />
      </div>
      <div className="leading-[.9]">
        <div className="font-display text-[clamp(.8rem,1.15vw,1.3rem)] font-bold tracking-[-.06em] text-[var(--ink)]">FreshRoute</div>
        <div className="mt-[.28vw] font-mono text-[clamp(.43rem,.55vw,.64rem)] uppercase tracking-[.18em] text-[var(--teal)]">accessibility intelligence</div>
      </div>
    </div>
  );
}

export function MapPanel({ compact = false, pulse = false }: { compact?: boolean; pulse?: boolean }) {
  return (
    <div className={`glass-panel relative overflow-hidden rounded-[1.15vw] ${compact ? 'h-[24vw] w-[33vw]' : 'h-[31vw] w-[46vw]'}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_25%,rgba(244,201,93,.2),transparent_26%),linear-gradient(130deg,rgba(220,233,227,.75),rgba(247,251,248,.36))]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 620 420" preserveAspectRatio="none" aria-hidden="true">
        <path className="map-road major" d="M-20 90 C100 70 130 130 220 122 S390 45 660 100" strokeWidth="22" />
        <path className="map-road" d="M-10 250 C80 200 140 255 210 225 S370 180 430 220 S560 325 650 274" strokeWidth="15" />
        <path className="map-road major" d="M80 -15 C130 70 145 138 110 222 S120 350 210 450" strokeWidth="18" />
        <path className="map-road" d="M320 -10 C280 82 306 120 350 172 S360 310 300 440" strokeWidth="11" />
        <path className="map-road" d="M500 -10 C470 64 500 130 470 194 S510 290 650 360" strokeWidth="12" />
        <path className="map-road" d="M-20 352 C88 300 168 310 260 342 S440 390 650 342" strokeWidth="8" />
        <path className="route-line" d="M68 302 C139 284 151 214 206 205 S292 246 346 202 S421 130 542 112" />
        <path className="route-line alt" d="M68 302 C152 330 224 306 284 278 S401 261 448 180 S496 140 542 112" />
        <circle className="route-point" cx="68" cy="302" r="9" />
        <circle className="route-point" cx="542" cy="112" r="9" />
        <circle className="route-point alert" cx="346" cy="202" r="10" />
        <circle cx="346" cy="202" r="22" fill="rgba(236,116,91,.14)" />
        <circle cx="206" cy="205" r="7" fill="var(--yellow)" stroke="var(--white)" strokeWidth="2" />
        <circle cx="448" cy="180" r="7" fill="var(--yellow)" stroke="var(--white)" strokeWidth="2" />
        {pulse && (
          <circle className="scan-line" cx="346" cy="202" r="62" fill="none" stroke="rgba(236,116,91,.5)" strokeDasharray="3 8" strokeWidth="2" />
        )}
      </svg>
      <div className="absolute left-[1.15vw] top-[1vw] flex items-center gap-[.5vw]">
        <span className="h-[.55vw] w-[.55vw] min-h-[5px] min-w-[5px] rounded-full bg-[var(--teal-bright)] shadow-[0_0_0_.3vw_rgba(39,181,162,.15)]" />
        <span className="font-mono text-[clamp(.48rem,.6vw,.7rem)] uppercase tracking-[.12em] text-[var(--ink-soft)]">signal layer / demo grid</span>
      </div>
      <div className="absolute bottom-[1vw] left-[1.15vw] right-[1.15vw] flex items-center justify-between font-mono text-[clamp(.48rem,.6vw,.7rem)] text-[var(--ink-soft)]">
        <span>41.8781° N / 87.6298° W</span>
        <span className="text-[var(--teal)]">MAP DATA · DETERMINISTIC</span>
      </div>
    </div>
  );
}

export function StatPill({ label, value, tone = 'teal' }: { label: string; value: string; tone?: 'teal' | 'coral' | 'yellow' }) {
  const toneClass = tone === 'coral' ? 'text-[var(--coral)] bg-[rgba(236,116,91,.1)]' : tone === 'yellow' ? 'text-[#927019] bg-[rgba(244,201,93,.16)]' : 'text-[var(--teal)] bg-[rgba(39,181,162,.1)]';
  return (
    <div className={`flex min-w-[7vw] flex-col gap-[.3vw] rounded-[.7vw] px-[.8vw] py-[.65vw] ${toneClass}`}>
      <span className="font-mono text-[clamp(.48rem,.6vw,.7rem)] uppercase tracking-[.1em] opacity-70">{label}</span>
      <span className="font-display text-[clamp(1rem,1.7vw,2rem)] font-bold leading-none">{value}</span>
    </div>
  );
}

export function Timeline({ active = 2 }: { active?: number }) {
  const labels = ['DETECT', 'VERIFY', 'DECAY', 'UPDATE', 'REROUTE'];
  return (
    <div className="flex items-start gap-0">
      {labels.map((label, index) => (
        <div className="flex items-start" key={label}>
          <div className="flex w-[7.1vw] flex-col items-center gap-[.45vw]">
            <div className={`h-[.8vw] w-[.8vw] min-h-[6px] min-w-[6px] rounded-full border-[.18vw] border-[var(--paper)] ${index <= active ? 'bg-[var(--teal)] shadow-[0_0_0_.22vw_rgba(13,119,114,.2)]' : 'bg-[var(--paper-deep)]'}`} />
            <span className={`font-mono text-[clamp(.42rem,.54vw,.62rem)] tracking-[.11em] ${index === active ? 'font-bold text-[var(--teal)]' : 'text-[var(--ink-soft)]'}`}>{label}</span>
          </div>
          {index < labels.length - 1 && <div className={`mt-[.3vw] h-[1px] w-[2.4vw] ${index < active ? 'bg-[var(--teal)]' : 'bg-[var(--line)]'}`} />}
        </div>
      ))}
    </div>
  );
}

export function SceneFrame({ children, tint = 'teal' }: { children: ReactNode; tint?: 'teal' | 'coral' | 'yellow' }) {
  const accent = tint === 'coral' ? 'rgba(236,116,91,.14)' : tint === 'yellow' ? 'rgba(244,201,93,.18)' : 'rgba(39,181,162,.14)';
  return (
    <motion.div
      className="scene-shell"
      initial={{ clipPath: 'circle(0% at 82% 44%)', opacity: 0 }}
      animate={{ clipPath: 'circle(150% at 82% 44%)', opacity: 1 }}
      exit={{ clipPath: 'circle(0% at 14% 62%)', opacity: 0 }}
      transition={{ duration: 1.05, ease: EASE }}
      style={{ background: `radial-gradient(circle at 74% 50%, ${accent}, transparent 34%)` }}
    >
      {children}
    </motion.div>
  );
}