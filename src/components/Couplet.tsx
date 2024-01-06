import React from 'react';
import { z } from 'zod';
import { coupletSchema, poemDataSchema } from './Composition';
import { staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Roboto";


type coupletCompSchema = {
  couplet: z.infer<typeof coupletSchema>;
  data: z.infer<typeof poemDataSchema>;
  fps: number;
};

const { fontFamily } = loadFont();

export const Couplet: React.FC<coupletCompSchema> = ({
  couplet,
  data,
  fps,
}) => {
  const frame = useCurrentFrame();

  // Adjust verse start and end frames relative to the start of the couplet
  const verseStartFrame = (couplet.verseStartTime - couplet.coupletStartTime) * fps;
  const verseEndFrame = (couplet.verseEndTime - couplet.coupletStartTime) * fps;

  // Start typewriter effect for persian1 after midTimeFrame
  const charsShownPersian1 = frame > verseStartFrame ? Math.floor((frame - verseStartFrame) / 3) : 0;
  const textToShowPersian1 = couplet.persian1.slice(0, charsShownPersian1);

  // Start typewriter effect for persian2 after midTimeFrame
  const charsShownPersian2 = frame > verseEndFrame ? Math.floor((frame - verseEndFrame) / 3) : 0;
  const textToShowPersian2 = couplet.persian2.slice(0, charsShownPersian2);


  // Determine if the first verse is completely typed
  const isFirstVerseComplete = charsShownPersian1 >= couplet.persian1.length;
  const isSecondVerseComplete = charsShownPersian2 >= couplet.persian2.length;

  // Determine cursor state
  const isBeforeFirstVerse = frame < verseStartFrame;
  
  const isTypingSecondVerse = frame > verseEndFrame && !isSecondVerseComplete;

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Row 1 with two columns */}
      <div className="flex flex-row w-full h-1/5">
        {/* Left Column 60% with two child rows */}
        <div className="flex flex-col flex-grow p-4 persian-small text-[22px] -mr-16 z-10 mt-2">
          <div className="flex items-end justify-start flex-grow p-2">
            <span className="text-red-600">شعر:&nbsp;</span> ({couplet.number}/{data.totalCouplets})
            &nbsp;
            <span className="text-red-600">{data.poemType}:&nbsp;</span> {data.poemName}
          </div>
          <div className="flex justify-start flex-grow p-2">
            <span className='pr-12'>
              <span className="text-red-600 text-center">بحوالہ:&nbsp;&nbsp;&nbsp;</span>
              {data.bookName}
            </span>
          </div>
        </div>
        {/* Right Column 40% */}
        <div className="w-1/3">
          <img alt="Rectangle" src={staticFile('img/logo.png')} />
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