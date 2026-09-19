import { motion } from 'framer-motion';

import { EASE, MapPanel, SceneFrame, StatPill, Timeline } from './visuals';

export function Scene3() {
  const evidence = [
    ['source reliability', 'community report', 'verified'],
    ['freshness', '8 minutes ago', 'strong'],
    ['obstacle severity', 'high', 'flagged'],
  ];
  return (
    <SceneFrame tint="yellow">
      <div className="flex h-full items-center justify-between gap-[4vw]">
        <div className="w-[35vw]">
          <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .12, duration: .6, ease: EASE }} className="label-kicker">02 / verify</motion.div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .26, duration: .78, ease: EASE }} className="mt-[1.35vw] font-display text-[clamp(2.2rem,4.7vw,5.7rem)] font-bold leading-[.91] tracking-[-.08em]">
            Trust is<br /><span className="text-[var(--teal)]">a score.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .74, duration: .6 }} className="mt-[1.7vw] max-w-[25vw] font-body text-[clamp(.9rem,1.25vw,1.45rem)] leading-[1.22] text-[var(--ink-soft)]">Every observation carries context, so the route engine can tell a fresh signal from a stale guess.</motion.p>
          <div className="mt-[3.4vw]"><Timeline active={1} /></div>
        </div>
        <motion.div initial={{ opacity: 0, x: 40, rotateY: 8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} transition={{ delay: .3, duration: 1, ease: EASE }} className="flex items-center gap-[1.35vw] mr-[1vw]">
          <MapPanel compact />
          <div className="glass-panel w-[18vw] rounded-[1vw] p-[1.2vw]">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[clamp(.46rem,.58vw,.68rem)] uppercase tracking-[.11em] text-[var(--ink-soft)]">confidence</span>
              <span className="h-[.6vw] w-[.6vw] min-h-[5px] min-w-[5px] rounded-full bg-[var(--teal-bright)]" />
            </div>
            <motion.div initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .86, duration: .65, ease: EASE }} className="mt-[.9vw] font-display text-[clamp(2.8rem,5vw,5.5rem)] font-bold leading-none tracking-[-.09em] text-[var(--teal)]">83<span className="text-[.48em] text-[var(--ink)]">%</span></motion.div>
            <div className="mt-[.8vw] h-[.55vw] overflow-hidden rounded-full bg-[var(--paper-deep)]">
              <motion.div initial={{ width: 0 }} animate={{ width: '83%' }} transition={{ delay: .9, duration: 1.1, ease: EASE }} className="h-full rounded-full bg-[var(--teal)]" />
            </div>
            <div className="mt-[1.15vw] space-y-[.72vw]">
              {evidence.map(([label, value, state], index) => (
                <motion.div key={label} initial={{ opacity: 0, x: 14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.05 + index * .16, duration: .45, ease: EASE }} className="border-t border-[var(--line)] pt-[.6vw]">
                  <div className="font-mono text-[clamp(.42rem,.52vw,.6rem)] uppercase tracking-[.08em] text-[var(--ink-soft)]">{label}</div>
                  <div className="mt-[.2vw] flex items-center justify-between gap-[.4vw] text-[clamp(.54rem,.66vw,.78rem)] font-semibold"><span>{value}</span><span className={state === 'flagged' ? 'text-[var(--coral)]' : 'text-[var(--teal)]'}>{state}</span></div>
                </motion.div>
              ))}
            </div>
            <div className="mt-[1.1vw] flex gap-[.5vw]"><StatPill label="status" value="ready" /><StatPill label="confidence" value="+12" tone="yellow" /></div>
          </div>
        </motion.div>
      </div>
    </SceneFrame>
  );
}