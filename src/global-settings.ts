import { springTiming } from "@remotion/transitions";

// const poemBasePath = 'poems/zabur/hissa-e-awal/6 - man agarche tera khakam/';
const poemBasePath = 'poems/payam-e-mashriq/lala-e-toor/rubai-3/';

// const poemBasePath = 'poems/zabur/hissa-e-awal/0 - bikhawanda e kitab/';

const fps = 60;

const transitionSpringTime = springTiming({
  config: {
    damping: 10,
    stiffness: 20,
  }
});
const transitionDurationFrames = transitionSpringTime.getDurationInFrames({ fps });

const transitionSpringTimeFirst = springTiming({
  config: {
    damping: 40,
    stiffness: 5,
  }
});

const transitionDurationFramesFirst = transitionSpringTimeFirst.getDurationInFrames({ fps });


export const globalSettings = {
  video: {
    width: 1080,
    height: 1920,
    fps: fps,
    springTransition: transitionSpringTime,
    transitionDurationFrames: transitionDurationFrames,
    springTransitionFirst: transitionSpringTimeFirst,
    transitionDurationFramesFirst: transitionDurationFramesFirst
  },
  introDurationFPS: 200,
  outroDurationFPS: 250,
  logo: {
    videoComplete: 'videos/full-logo-with-intro.mp4',
    videoTrimmed: 'videos/logo.mp4',
    img: 'img/logo.png',
  },
  poem: {
    cursorBlinkCycleFrames: fps,
    audioFile: poemBasePath + 'audio.wav',
    textFile: poemBasePath + 'poem.txt',
    markersFile: poemBasePath + 'markers.csv',
  }
}