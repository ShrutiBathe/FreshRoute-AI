import { motion } from 'framer-motion';

import { EASE, SceneFrame, Timeline } from './visuals';

export function Scene5() {
  return (
    <SceneFrame tint="teal">
      <div className="flex h-full items-center justify-between gap-[4vw]">
        <div className="w-[36vw]">
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1, duration: .6, ease: EASE }} className="label-kicker">05 / reroute</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .23, duration: .8, ease: EASE }} className="mt-[1.3vw] font-display text-[clamp(2.25rem,4.8vw,5.9rem)] font-bold leading-[.9] tracking-[-.08em]">
            Choose the<br /><span className="text-[var(--teal)]">safer signal.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7, duration: .6 }} className="mt-[1.7vw] max-w-[25vw] font-body text-[clamp(.9rem,1.25vw,1.45rem)] leading-[1.22] text-[var(--ink-soft)]">The recommendation balances accessibility, confidence, freshness, obstacle severity, and distance.</motion.p>
          <div className="mt-[3.3vw]"><Timeline active={4} /></div>
        </div>
        <motion.div initial={{ opacity: 0, x: 35, rotateY: -8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ delay: .28, duration: 1.05, ease: EASE }} className="glass-panel mr-[2vw] w-[42vw] rounded-[1.2vw] p-[1.4vw]">
          <div className="flex items-center justify-between border-b border-[var(--line)] pb-[.95vw]">
            <div><div className="font-mono text-[clamp(.46rem,.58vw,.68rem)] uppercase tracking-[.11em] text-[var(--ink-soft)]">route planner / accessibility-first</div><div className="mt-[.4vw] font-display text-[clamp(1rem,1.42vw,1.65rem)] font-bold">2 alternatives found</div></div>
            <div className="demo-stamp">demo route</div>
          </div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .92, duration: .55, ease: EASE }} className="mt-[1.2vw] rounded-[.9vw] border-2 border-[var(--teal)] bg-[rgba(39,181,162,.08)] p-[1vw]">
            <div className="flex items-start justify-between">
              <div><div className="flex items-center gap-[.55vw]"><span className="h-[.6vw] w-[.6vw] min-h-[5px] min-w-[5px] rounded-full bg-[var(--teal)]" /><span className="font-mono text-[clamp(.48rem,.6vw,.7rem)] uppercase tracking-[.1em] text-[var(--teal)]">recommended</span></div><div className="mt-[.48vw] font-display text-[clamp(1.05rem,1.55vw,1.8rem)] font-bold">Accessible route</div></div>
              <div className="text-right"><div className="font-display text-[clamp(1.5rem,2.2vw,2.6rem)] font-bold text-[var(--teal)]">22 min</div><div className="font-mono text-[clamp(.44rem,.55vw,.64rem)] text-[var(--ink-soft)]">+ 4 min / + 91 confidence</div></div>
            </div>
            <div className="mt-[.85vw] flex gap-[.5vw]"><span className="rounded-full bg-[rgba(39,181,162,.15)] px-[.65vw] py-[.4vw] font-mono text-[clamp(.44rem,.56vw,.65rem)] text-[var(--teal)]">0 high-severity obstacles</span><span className="rounded-full bg-[rgba(244,201,93,.17)] px-[.65vw] py-[.4vw] font-mono text-[clamp(.44rem,.56vw,.65rem)] text-[#8b6b1d]">fresh signal</span></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.13, duration: .55, ease: EASE }} className="mt-[.85vw] flex items-center justify-between rounded-[.9vw] border border-[var(--line)] bg-[rgba(247,251,248,.45)] p-[1vw]">
            <div><div className="font-mono text-[clamp(.45rem,.57vw,.66rem)] uppercase tracking-[.1em] text-[var(--ink-soft)]">fastest route</div><div className="mt-[.38vw] font-display text-[clamp(.95rem,1.3vw,1.5rem)] font-bold">18 min</div></div>
            <div className="text-right font-mono text-[clamp(.45rem,.57vw,.66rem)] text-[var(--coral)]">2 blocked curb cuts<br />confidence 54%</div>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.45 }} className="mt-[1.1vw] flex items-center justify-between">
            <span className="font-mono text-[clamp(.48rem,.6vw,.7rem)] uppercase tracking-[.08em] text-[var(--ink-soft)]">decision trace</span>
            <span className="font-mono text-[clamp(.48rem,.6vw,.7rem)] text-[var(--teal)]">reliability over speed</span>
          </motion.div>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: .65, ease: EASE }} className="absolute bottom-[4.3vw] left-[6vw] flex items-center gap-[.75vw]">
        <div className="h-[1.7vw] w-[1.7vw] min-h-[16px] min-w-[16px] rotate-45 rounded-[.35vw] bg-[var(--teal)]" />
        <span className="font-mono text-[clamp(.5rem,.65vw,.75rem)] tracking-[.06em] text-[var(--ink-soft)]">route intelligence, with its assumptions in view.</span>
      </motion.div>
    </SceneFrame>
  );
}