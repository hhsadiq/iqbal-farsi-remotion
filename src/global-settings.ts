import { springTiming } from "@remotion/transitions";
import { getConfig } from './config';

const { poemBasePath } = getConfig();

const { layout, type } = getConfig();

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

const transitionSpringTimeThumbnail = springTiming({
  config: {
    damping: 10,
    stiffness: 20,
  }
});
const transitionDurationFramesThumbnail = transitionSpringTimeThumbnail.getDurationInFrames({ fps });

export const globalSettings = {
  video: {
    vertical: {
      width: 1080,
      height: 1920,        
    },
    horizontal: {
      width: 1920,
      height: 1080,
    },
    fps,
    springTransition: transitionSpringTime,
    transitionDurationFrames,
    springTransitionFirst: transitionSpringTimeFirst,
    transitionDurationFramesFirst,
    transitionSpringTimeThumbnail,
    transitionDurationFramesThumbnail
  },
  introDurationFPS: 200,
  outroDurationFPS: 250,
  logo: {
    vertical: {
      video: 'videos/logo-vertical.mp4',
      img: 'img/logo-vertical.png',  
    },
    horizontal: {
      video: 'videos/logo-horizontal.mp4',
      img: 'img/logo-horizontal.png',
    },
  },
  poem: {
    cursorBlinkCycleFrames: fps,
    audioFile: poemBasePath + 'audio.wav',
    textFile: poemBasePath + 'poem.txt',
    markersFile: poemBasePath + 'markers.csv',
  },
  layout,
  type,
}