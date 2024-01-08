import React from 'react';
import { Img, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Roboto";
import { CoupletType } from '../utils/process-inputv2';

type coupletCompSchema = {
  couplet: CoupletType;
  fps: number;
};

const { fontFamily } = loadFont();

export const Couplet: React.FC<coupletCompSchema> = ({
  couplet,
  fps,
}) => {
  const frame = useCurrentFrame();

  // Adjust verse start and end frames relative to the start of the couplet
  const verseRelativeStartFrame = (couplet.verseStartTime - couplet.coupletStartTime) * fps;
  const verseRelativeEndFrame = (couplet.verseEndTime - couplet.coupletStartTime) * fps;

  // Start typewriter effect for persian1 after midTimeFrame
  const charsShownPersian1 = frame > verseRelativeStartFrame ? Math.floor((frame - verseRelativeStartFrame) / 3) : 0;
  const textToShowPersian1 = couplet.persian1.slice(0, charsShownPersian1);

  // Start typewriter effect for persian2 after midTimeFrame
  const charsShownPersian2 = frame > verseRelativeEndFrame ? Math.floor((frame - verseRelativeEndFrame) / 3) : 0;
  const textToShowPersian2 = couplet.persian2.slice(0, charsShownPersian2);


  // Determine if the first verse is completely typed
  const isFirstVerseComplete = charsShownPersian1 >= couplet.persian1.length;
  const isSecondVerseComplete = charsShownPersian2 >= couplet.persian2.length;

  // Determine cursor state
  const isBeforeFirstVerse = frame < verseRelativeStartFrame;

  const isTypingSecondVerse = frame > verseRelativeEndFrame && !isSecondVerseComplete;

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Row 1 with two columns */}
      <div className="flex items-center justify-center w-full pt-4">
        {/* Right Column 40% */}
        <div className="w-[35%]">
          <Img src={staticFile('img/logo.png')} placeholder={'logo'}/>
        </div>
      </div>
      {/* Row 2 */}
      {/* Verse display with cursor */}
      <div className="flex items-top justify-center w-full px-8 persian h-1/6">
        <p className="text-red-600 text-center">
          {textToShowPersian1}
          {(!isTypingSecondVerse && !isSecondVerseComplete) && <span className={`typing-cursor${(isBeforeFirstVerse || isFirstVerseComplete) ? '' : '-static'}`}></span>}
          <br />
          {textToShowPersian2}
          {(isTypingSecondVerse || isSecondVerseComplete) && <span className={`typing-cursor${isSecondVerseComplete ? '' : '-static'}`}></span>}
        </p>
      </div>
      {/* Row 3 */}
      <div className="flex items-top justify-center w-full px-16 rtl -mt-8 pt-20 urdu">
        <p className="text-center">
          {couplet.urdu}
        </p>
      </div>
      {/* Row 4 */}
      <div className="flex items-top justify-center w-full px-16 pt-12">
        <p className="text-[30px] text-center leading-relaxed"
          style={{
            fontFamily,
          }}
        >
          {couplet.english}
        </p>
      </div>
      {/* Row 5 */}
    </div>
  );
};