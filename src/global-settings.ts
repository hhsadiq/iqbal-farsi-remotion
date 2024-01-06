const poemBasePath = 'poems/zabur/hissa-e-awal/6 - man agarche tera khakam/';

export const globalSettings = {
  video: {
    width: 720,
    height: 1280,
    fps: 30,  
  },
  introDurationFPS: 200,
  outroDurationFPS: 250,
  poem: {
    audioFile: poemBasePath + 'audio.wav',
    textFile: poemBasePath + 'poem.txt',
    markersFile: poemBasePath + 'markers.csv',
  }
}