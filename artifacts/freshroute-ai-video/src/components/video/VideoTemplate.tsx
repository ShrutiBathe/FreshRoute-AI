import {
  SafeFrame,
  VideoCanvas,
  type VideoAspectRatio,
  useVideoPlayer,
} from '@/lib/video';
import { AnimatePresence, motion } from 'framer-motion';

import { BrandMark } from './video_scenes/visuals';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

const SCENE_DURATIONS = {
  opening: 4300,
  detect: 4300,
  verify: 4400,
  decay: 4700,
  reroute: 5200,
};

const VIDEO_ASPECT_RATIO: VideoAspectRatio = '16:9';

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <VideoCanvas
      aspectRatio={VIDEO_ASPECT_RATIO}
      className="video-frame"
    >
      <div className="persistent-orb orb-a" />
      <div className="persistent-orb orb-b" />
      <div className="persistent-orb orb-c" />

      <SafeFrame className="pointer-events-none z-[3]">
        <div className="flex items-start justify-between">
          <BrandMark />
          <div className="flex items-center gap-[.8vw]">
            <span className="signal-dot" />
            <span className="font-mono text-[clamp(.48rem,.62vw,.72rem)] uppercase tracking-[.1em] text-[var(--ink-soft)]">prototype playback / no live data</span>
          </div>
        </div>
      </SafeFrame>

      <div className="pointer-events-none absolute left-[3.2vw] top-[40%] z-[2] flex -rotate-90 items-center gap-[.8vw]">
        <span className="font-mono text-[clamp(.48rem,.58vw,.68rem)] uppercase tracking-[.2em] text-[var(--teal)]">detect → verify → decay → update → reroute</span>
        <span className="h-[1px] w-[3vw] bg-[var(--teal)] opacity-40" />
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-[1.35vw] left-[6vw] right-[6vw] z-[4] flex items-center gap-[1vw]"
        animate={{ opacity: currentScene === 4 ? 1 : .75 }}
        transition={{ duration: .45 }}
      >
        <div className="h-[1px] flex-1 bg-[var(--line)]" />
        {[0, 1, 2, 3, 4].map((step) => (
          <motion.div
            key={step}
            animate={{
              width: step === currentScene ? '2.8vw' : '.55vw',
              backgroundColor: step === currentScene ? 'var(--teal)' : 'rgba(17,42,50,.24)',
            }}
            transition={{ duration: .5 }}
            className="h-[.35vw] min-h-[3px] min-w-[3px] rounded-full"
          />
        ))}
        <div className="h-[1px] flex-1 bg-[var(--line)]" />
        <span className="font-mono text-[clamp(.42rem,.52vw,.6rem)] uppercase tracking-[.12em] text-[var(--ink-soft)]">looping demo</span>
      </motion.div>

      <AnimatePresence mode="sync">
        {currentScene === 0 && <Scene1 key="opening" />}
        {currentScene === 1 && <Scene2 key="detect" />}
        {currentScene === 2 && <Scene3 key="verify" />}
        {currentScene === 3 && <Scene4 key="decay" />}
        {currentScene === 4 && <Scene5 key="reroute" />}
      </AnimatePresence>

      <div className="pointer-events-none absolute bottom-[.55vw] right-[6vw] z-[4] font-mono text-[clamp(.4rem,.48vw,.56rem)] uppercase tracking-[.1em] text-[var(--ink-soft)] opacity-70">
        FreshRoute AI · deterministic prototype visualization
      </div>
    </VideoCanvas>
  );
}
