import { motion } from 'framer-motion';

import { EASE, SceneFrame, Timeline } from './visuals';

export function Scene4() {
  return (
    <SceneFrame tint="coral">
      <div className="flex h-full items-center justify-between gap-[4vw]">
        <div className="w-[34vw]">
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1, duration: .6, ease: EASE }} className="label-kicker">03 + 04 / decay + update</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .22, duration: .8, ease: EASE }} className="mt-[1.3vw] font-display text-[clamp(2.15rem,4.45vw,5.5rem)] font-bold leading-[.9] tracking-[-.08em]">
            Time changes<br /><span className="text-[var(--coral)]">the answer.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7, duration: .6 }} className="mt-[1.65vw] max-w-[25vw] font-body text-[clamp(.9rem,1.24vw,1.45rem)] leading-[1.22] text-[var(--ink-soft)]">Confidence decays as an observation ages. A new report updates the signal instead of leaving the map behind.</motion.p>
          <div className="mt-[3.2vw]"><Timeline active={3} /></div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .86 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .28, duration: 1, ease: EASE }} className="relative mr-[3vw] h-[25vw] w-[44vw]">
          <div className="glass-panel absolute inset-0 rounded-[1.2vw] p-[1.5vw]">
            <div className="flex items-start justify-between">
              <div><div className="font-mono text-[clamp(.48rem,.6vw,.7rem)] uppercase tracking-[.1em] text-[var(--ink-soft)]">confidence decay / construction barrier</div><div className="mt-[.45vw] font-display text-[clamp(1rem,1.4vw,1.6rem)] font-bold">Signal freshness over time</div></div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.15 }} className="rounded-full bg-[rgba(236,116,91,.12)] px-[.7vw] py-[.42vw] font-mono text-[clamp(.45rem,.58vw,.67rem)] uppercase tracking-[.08em] text-[var(--coral)]">stale → refreshed</motion.div>
            </div>
            <div className="relative mt-[2.2vw] h-[12.6vw] border-b border-l border-[var(--line)]">
              <div className="absolute inset-x-0 top-[25%] border-t border-dashed border-[var(--line)]" />
              <div className="absolute inset-x-0 top-[50%] border-t border-dashed border-[var(--line)]" />
              <div className="absolute inset-x-0 top-[75%] border-t border-dashed border-[var(--line)]" />
              <svg className="absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true">
                <motion.path initial={{ pathLength: 0, opacity: .35 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ delay: .8, duration: 1.5, ease: EASE }} d="M0 26 C95 40 130 54 205 72 S332 100 398 139 S512 173 600 184" fill="none" stroke="var(--coral)" strokeWidth="5" strokeLinecap="round" />
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 1.9, duration: .75, ease: EASE }} d="M398 139 C444 105 495 76 600 48" fill="none" stroke="var(--teal)" strokeWidth="5" strokeLinecap="round" strokeDasharray="8 6" />
                <circle cx="398" cy="139" r="10" fill="var(--coral)" stroke="var(--white)" strokeWidth="4" />
                <circle cx="600" cy="48" r="10" fill="var(--teal)" stroke="var(--white)" strokeWidth="4" />
              </svg>
              <div className="absolute -bottom-[1.7vw] left-0 font-mono text-[clamp(.44rem,.55vw,.64rem)] text-[var(--ink-soft)]">0h</div>
              <div className="absolute -bottom-[1.7vw] left-[64%] font-mono text-[clamp(.44rem,.55vw,.64rem)] text-[var(--ink-soft)]">24h</div>
              <div className="absolute -bottom-[1.7vw] right-0 font-mono text-[clamp(.44rem,.55vw,.64rem)] text-[var(--ink-soft)]">48h</div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.42 }} className="absolute left-[58%] top-[64%] rounded-[.6vw] bg-[var(--coral)] px-[.65vw] py-[.45vw] font-mono text-[clamp(.48rem,.6vw,.7rem)] text-[var(--white)]">52% stale</motion.div>
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.25 }} className="absolute right-0 top-[2%] rounded-[.6vw] bg-[var(--teal)] px-[.65vw] py-[.45vw] font-mono text-[clamp(.48rem,.6vw,.7rem)] text-[var(--white)]">81% updated</motion.div>
            </div>
            <div className="mt-[2.5vw] flex items-center justify-between">
              <span className="font-mono text-[clamp(.48rem,.6vw,.7rem)] uppercase tracking-[.08em] text-[var(--ink-soft)]">deterministic decay model</span>
              <span className="font-mono text-[clamp(.48rem,.6vw,.7rem)] text-[var(--teal)]">confidence = initial × e<sup>−rate × hours</sup></span>
            </div>
          </div>
        </motion.div>
      </div>
    </SceneFrame>
  );
}