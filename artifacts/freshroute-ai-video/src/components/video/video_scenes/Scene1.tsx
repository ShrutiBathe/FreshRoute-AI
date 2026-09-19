import { motion } from 'framer-motion';

import { EASE, MapPanel, SceneFrame, StatPill, Timeline } from './visuals';

export function Scene1() {
  return (
    <SceneFrame>
      <div className="flex h-full items-center justify-between gap-[4vw]">
        <div className="w-[39vw]">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, duration: .7, ease: EASE }} className="label-kicker">the route is a living signal</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .33, duration: .85, ease: EASE }} className="mt-[1.6vw] font-display text-[clamp(2.4rem,5.5vw,6.7rem)] font-bold leading-[.9] tracking-[-.08em] text-[var(--ink)]">
            Fresh<br /><span className="text-[var(--teal)]">Route</span> AI
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .78, duration: .65 }} className="mt-[1.8vw] max-w-[28vw] font-body text-[clamp(.9rem,1.45vw,1.65rem)] leading-[1.15] text-[var(--ink-soft)]">
            Accessibility intelligence for streets that change before the map does.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.12, duration: .6, ease: EASE }} className="mt-[2.2vw] flex items-center gap-[.7vw]">
            <span className="demo-stamp">prototype / deterministic demo data</span>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }} className="mt-[3.1vw]">
            <Timeline active={0} />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: .86, rotate: 2 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ delay: .55, duration: 1.15, ease: EASE }} className="relative mr-[2vw]">
          <MapPanel />
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.35, duration: .55, ease: EASE }} className="glass-panel absolute -bottom-[2.2vw] -left-[2.2vw] flex gap-[.55vw] rounded-[.9vw] p-[.55vw]">
            <StatPill label="live signals" value="128" />
            <StatPill label="confidence" value="86%" tone="yellow" />
            <StatPill label="routes" value="04" tone="coral" />
          </motion.div>
        </motion.div>
      </div>
    </SceneFrame>
  );
}