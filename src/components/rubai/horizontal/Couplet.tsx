import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Roboto";
import { CoupletType } from '../../../utils/process-input';
import { globalSettings } from '../../../global-settings';

type coupletCompSchema = {
  couplet: CoupletType;
  fps: number;
  bookName: string;
};

const { fontFamily } = loadFont();


export const Couplet: React.FC<coupletCompSchema> = ({ couplet, bookName, fps }) => {
  const frame = useCurrentFrame();

  // Adjust verse start and end frames relative to the start of the couplet
  const verseRelativeStartFrame = (couplet.verseStartTime - couplet.coupletStartTime) * fps;
  const verseRelativeEndFrame = (couplet.verseEndTime - couplet.coupletStartTime) * fps;

  // Typewriter effect for Persian verses
  const charsShownPersian1 = frame > verseRelativeStartFrame ? Math.floor((frame - verseRelativeStartFrame) / 6) : 0;
  const textToShowPersian1 = couplet.persian1.slice(0, charsShownPersian1);
  const charsShownPersian2 = frame > verseRelativeEndFrame ? Math.floor((frame - verseRelativeEndFrame) / 6) : 0;
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

  return (
    <div className="flex flex-row w-full h-full bg-white">
      {/* Left Column - 60% width */}
      <div className="w-[70%] flex flex-col mt-40">
        {/* Row 2: Verses with Cursor */}
        <div className="flex items-top justify-center w-full px-8 persian persian-couplet h-[30%]">
          <p className="text-red-600 text-center">
            {textToShowPersian1}
            {(!isTypingSecondVerse && !isSecondVerseComplete) && (
              <span
                className="typing-cursor"
                style={{ opacity: cursorOpacityFirst }}
              />
            )}
            <br />
            {textToShowPersian2}
            {(isTypingSecondVerse || isSecondVerseComplete) && (
              <span
                className="typing-cursor"
                style={{ opacity: cursorOpacitySecond }}
              />
            )}
          </p>
        </div>

        {/* Urdu Translation */}
        <div
          className="flex items-top justify-center w-full rtl urdu urdu-couplet pt-8 px-16"
        >
          <p className="text-center">
            {couplet.urdu1}
          </p>
        </div>
        <div
          className="flex items-top justify-center w-full px-44 rtl urdu2 urdu-couplet"
        >
          <p className="text-center">
            {couplet.urdu2}
          </p>
        </div>

        {/* English Translation */}
        <div
          className="flex items-top justify-center w-full pt-8 px-20"
          style={{ fontFamily }}
        >
          <p className="english-couplet text-center leading-relaxed">
            {couplet.english1}
          </p>
        </div>
        <div
          className="flex items-top justify-center w-full px-44"
          style={{ fontFamily }}
        >
          <p className="english-couplet text-center leading-relaxed">
            {couplet.english2}
          </p>
        </div>
      </div>

      {/* Right Column - 40% width */}
      <div className="w-[30%] flex flex-col items-center justify-center">
        {/* Logo Area */}
        <div className="w-[158%] flex flex-col mt-[-132px] justify-start" style={{ height: '90%' }}>
          <div className="w-full">
            <Img src={staticFile(globalSettings.logo.horizontal.img)} placeholder='logo' className="w-full h-auto ml-[-96px]" />
          </div>
        </div>

        {/* Book Name in a Rectangle */}
        <div className="absolute w-full flex mt-[660px] mr-[208px] justify-center items-center">
          <div className="text-black bg-white px-8 pb-4 border-4 border-red-500 rounded-xl persian persian-ref-rect">
            <p>
              <span className="text-red-600">بحوالہ:</span>&nbsp;&nbsp;{bookName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
