import React from 'react';
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Roboto";
import { CoupletType } from '../utils/process-inputv2';
import { globalSettings } from '../global-settings';

type coupletCompSchema = {
  couplet: CoupletType;
  fps: number;
};

const { fontFamily } = loadFont();

export const Couplet: React.FC<coupletCompSchema> = ({ couplet, fps }) => {
  const frame = useCurrentFrame();

  // Adjust verse start and end frames relative to the start of the couplet
  const verseRelativeStartFrame = (couplet.verseStartTime - couplet.coupletStartTime) * fps;
  const verseRelativeEndFrame = (couplet.verseEndTime - couplet.coupletStartTime) * fps;

  // Typewriter effect for Persian verses
  const charsShownPersian1 = frame > verseRelativeStartFrame ? Math.floor((frame - verseRelativeStartFrame) / 3) : 0;
  const textToShowPersian1 = couplet.persian1.slice(0, charsShownPersian1);
  const charsShownPersian2 = frame > verseRelativeEndFrame ? Math.floor((frame - verseRelativeEndFrame) / 3) : 0;
  const textToShowPersian2 = couplet.persian2.slice(0, charsShownPersian2);

  // Determine if the verse is completely typed
  const isFirstVerseComplete = charsShownPersian1 >= couplet.persian1.length;
  const isSecondVerseComplete = charsShownPersian2 >= couplet.persian2.length;
  const isTypingSecondVerse = frame > verseRelativeEndFrame && !isSecondVerseComplete;
  const isBeforeFirstVerse = frame < verseRelativeStartFrame;

  // Cursor Blinking Logic
  const BLINK_RATE = globalSettings.poem.cursorBlinkCycleFrames; // Number of frames for one blink cycle
  const cursorShouldBlink = frame % BLINK_RATE < BLINK_RATE / 2;

  // Determine cursor visibility
  let cursorOpacityFirst = 0;
  if (!isTypingSecondVerse && !isSecondVerseComplete) {
    if (isBeforeFirstVerse || isFirstVerseComplete) {
      cursorOpacityFirst = cursorShouldBlink ? 1 : 0;
    } else {
      cursorOpacityFirst = 1;
    }
  }

  let cursorOpacitySecond = 0;
  if (isTypingSecondVerse || isSecondVerseComplete) {
    if (isSecondVerseComplete) {
      cursorOpacitySecond = cursorShouldBlink ? 1 : 0;
    } else {
      cursorOpacitySecond = 1;
    }
  }

  // Create a spring animation value for translation reveal

  const { fps: fpsV } = useVideoConfig();
  const fadeStartFrame = verseRelativeEndFrame + couplet.persian2.length * 3;
  const driver = spring({
    frame: frame - fadeStartFrame, // Delaying the start of the spring
    fps: fpsV,
    config: {
      damping: 10,
      stiffness: 5,
    },
  });

  // Calculate the current opacity using interpolate
  const translationOpacity = interpolate(driver, [0, 1], [0, 1]);

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Row 1 with two columns */}
      <div className="flex items-center justify-center w-full pt-4">
        {/* Right Column 40% */}
        <div className="w-[40%]">
          <Img src={staticFile('img/logo.png')} placeholder={'logo'} />
        </div>
      </div>

      {/* Row 2: Verses with Cursor */}
      <div className="flex items-top justify-center w-full px-8 persian persian-couplet h-1/6">
        <p className="text-red-600 text-center">
          {textToShowPersian1}
          {(!isTypingSecondVerse && !isSecondVerseComplete) && (
            <span
              className="typing-cursor"
              style={{ opacity: cursorOpacityFirst }}
            ></span>
          )}
          <br />
          {textToShowPersian2}
          {(isTypingSecondVerse || isSecondVerseComplete) && (
            <span
              className="typing-cursor"
              style={{ opacity: cursorOpacitySecond }}
            ></span>
          )}
        </p>
      </div>

      {/* Row 3: Urdu Translation */}
      <div
        className="flex items-top justify-center w-full px-28 rtl urdu urdu-couplet"
        style={{ opacity: translationOpacity }}
      >
        <p className="text-center">
          {couplet.urdu}
        </p>
      </div>

      {/* Row 4: English Translation */}
      <div
        className="flex items-top justify-center w-full px-28 pt-16"
        style={{ opacity: translationOpacity, fontFamily }}
      >
        <p className="english-couplet text-center leading-relaxed">
          {couplet.english}
        </p>
      </div>

      {/* Additional rows can be added here */}
    </div>
  );
};
