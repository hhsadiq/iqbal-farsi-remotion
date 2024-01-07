import { springTiming } from "@remotion/transitions";

// const poemBasePath = 'poems/zabur/hissa-e-awal/6 - man agarche tera khakam/';
const poemBasePath = 'poems/payam-e-mashriq/lala-e-toor/rubai-1/';

const transitionSpringTime = springTiming({
  config: {
    damping: 10,
    stiffness: 20,
  }
});

const fps = 30;

const transitionDurationFrames = transitionSpringTime.getDurationInFrames({ fps });

export const globalSettings = {
  video: {
    width: 720,
    height: 1280,
    fps: fps,
    springTransition: transitionSpringTime,
    transitionDurationFrames: transitionDurationFrames
  },
  introDurationFPS: 200,
  outroDurationFPS: 250,
  poem: {
    audioFile: poemBasePath + 'audio.wav',
    textFile: poemBasePath + 'poem.txt',
    markersFile: poemBasePath + 'markers.csv',
  }
}