import { motion } from 'framer-motion';

import { EASE, MapPanel, SceneFrame, Timeline } from './visuals';

export function Scene2() {
  return (
    <SceneFrame tint="coral">
      <div className="flex h-full items-center justify-between gap-[4vw]">
        <div className="w-[41vw]">
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1, duration: .65, ease: EASE }} className="label-kicker">01 / detect</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .23, duration: .75, ease: EASE }} className="mt-[1.35vw] font-display text-[clamp(2.4rem,5.1vw,6.2rem)] font-bold leading-[.9] tracking-[-.08em]">
            A signal<br /><span className="text-[var(--coral)]">arrives.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .66, duration: .6, ease: EASE }} className="mt-[1.7vw] max-w-[27vw] font-body text-[clamp(.92rem,1.32vw,1.55rem)] leading-[1.22] text-[var(--ink-soft)]">
            A camera observation or community report becomes a precise map signal: obstacle, location, source, time.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.02 }} className="mt-[2.4vw] flex items-center gap-[1vw]">
            <div className="flex items-center gap-[.65vw] rounded-full border border-[rgba(236,116,91,.35)] bg-[rgba(236,116,91,.1)] px-[.85vw] py-[.55vw]">
              <span className="h-[.65vw] w-[.65vw] min-h-[5px] min-w-[5px] animate-pulse rounded-full bg-[var(--coral)]" />
              <span className="font-mono text-[clamp(.53rem,.68vw,.78rem)] uppercase tracking-[.11em] text-[var(--coral)]">new observation</span>
            </div>
            <span className="micro-note">barrier / 14:32</span>
          </motion.div>
          <div className="mt-[3.3vw]"><Timeline active={0} /></div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .35, duration: .9, ease: EASE }} className="relative mr-[2vw]">
          <MapPanel pulse />
          <motion.div initial={{ opacity: 0, scale: .4 }} animate={{ opacity: [0, 1, 1], scale: [0.4, 1.2, 1] }} transition={{ delay: .9, duration: .85, ease: EASE }} className="absolute left-[54%] top-[43%] flex h-[4.7vw] w-[4.7vw] min-h-[42px] min-w-[42px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[.2vw] border-[var(--white)] bg-[var(--coral)] shadow-[0_.6vw_1.2vw_rgba(236,116,91,.28)]">
            <span className="font-display text-[clamp(1rem,1.7vw,2rem)] font-bold text-[var(--white)]">!</span>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: .55, ease: EASE }} className="glass-panel absolute -right-[1.8vw] top-[13%] w-[14vw] rounded-[.8vw] p-[.9vw]">
            <div className="font-mono text-[clamp(.46rem,.58vw,.68rem)] uppercase tracking-[.1em] text-[var(--coral)]">source / report</div>
            <div className="mt-[.55vw] font-display text-[clamp(.82rem,1.05vw,1.2rem)] font-bold">Construction barrier</div>
            <div className="mt-[.5vw] text-[clamp(.55rem,.68vw,.8rem)] text-[var(--ink-soft)]">Curb cut blocked · 8 min ago</div>
          </motion.div>
        </motion.div>
      </div>
    </SceneFrame>
  );
}