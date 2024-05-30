import React, { useEffect, useRef, useState } from 'react';
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

  const urdu1RefSpan = useRef<HTMLDivElement>(null);
  const urdu1RefDiv = useRef<HTMLDivElement>(null);

  const eng1RefSpan = useRef<HTMLDivElement>(null);
  const eng1RefDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eng1RefSpan.current) {
      const containerRect = eng1RefSpan.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const content = eng1RefSpan.current.textContent || '';
      const words = content.split(' ');
  
      console.log('Container width:', containerWidth);
      console.log('Full content:', content);
  
      const tempElement = document.createElement('div');
      tempElement.style.position = 'fixed';
      tempElement.style.bottom = '10px';
      tempElement.style.left = '10px';
      tempElement.style.whiteSpace = 'nowrap';
      tempElement.style.backgroundColor = 'yellow'; // Added background color for visibility
      tempElement.style.color = 'red';
      tempElement.style.fontSize = '11px';
      tempElement.style.zIndex = '1000'; // Ensure it's on top of other elements
  
      document.body.appendChild(tempElement);
  
      let currentLineWidth = 0;
      let currentLine = '';
      let lines = [];
  
      words.forEach((word, index) => {
        tempElement.textContent = currentLine + (currentLine ? ' ' : '') + word;
        const textWidth = tempElement.getBoundingClientRect().width;
        console.log(`Word: ${word}`);
        console.log(`Text width with word: ${textWidth}`);
        console.log(`Current line width before adding word: ${currentLineWidth}`);
  
        if (textWidth > containerWidth) {
          console.log(`Line break detected. Current line: ${currentLine.trim()}`);
          lines.push(currentLine.trim());
          currentLine = word;
          currentLineWidth = tempElement.getBoundingClientRect().width;
        } else {
          currentLine += (currentLine ? ' ' : '') + word;
          currentLineWidth = textWidth;
        }
  
        console.log(`Current line: ${currentLine}`);
        console.log(`Current line width after adding word: ${currentLineWidth}`);
      });
  
      lines.push(currentLine.trim());
      // Keeping the element for testing
      // document.body.removeChild(tempElement);
  
      const lastLineContent = lines[lines.length - 1];
      console.log('Lines:', lines);
      console.log('Content of last line:', lastLineContent);
  
      if (lastLineContent === "—" && eng1RefDiv.current) {
        eng1RefDiv.current.classList.replace('px-44', 'px-42');
      }
    }
  }, []);
  
  // Measure and log the number of lines after the component is rendered
  useEffect(() => {
    if (urdu1RefSpan.current) {
      const containerRect = urdu1RefSpan.current.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const content = urdu1RefSpan.current.textContent || '';
      const words = content.split(' ');
    
      const tempElement = document.createElement('div');
      tempElement.style.fontSize = '11px';

      document.body.appendChild(tempElement);
  
      let currentLineWidth = 0;
      let currentLine = '';
      let lines = [];
  
      words.forEach((word, index) => {
        tempElement.textContent = currentLine + (currentLine ? ' ' : '') + word;
        const textWidth = tempElement.getBoundingClientRect().width;
  
        if (textWidth > containerWidth) {
          lines.push(currentLine.trim());
          currentLine = word;
          currentLineWidth = tempElement.getBoundingClientRect().width;
        } else {
          currentLine += (currentLine ? ' ' : '') + word;
          currentLineWidth = textWidth;
        }
      });
  
      lines.push(currentLine.trim());
      document.body.removeChild(tempElement);
  
      const lastLineContent = lines[lines.length - 1];

      if (lastLineContent === "—" && urdu1RefDiv.current) {
        urdu1RefDiv.current.classList.replace('px-44', 'px-42');
      }      
    }
  }, []);
                                  
 
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

  // Create a spring animation value for translation reveal

  const { fps: fpsV } = useVideoConfig();
  const fadeStartFrame = verseRelativeEndFrame + couplet.persian2.length * 7;
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
        <div className="w-[30%]">
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

      {/* Urdu Translation */}
      <div
        ref={urdu1RefDiv}
        className="flex items-top justify-center w-full px-44 rtl urdu urdu-couplet"        
      >
        <p ref={urdu1RefSpan} className="text-center">
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
        ref={eng1RefDiv}
        className="flex items-top justify-center w-full px-44 pt-8"
        style={{ fontFamily }}
      >
        <p ref={eng1RefSpan} className="english-couplet text-center leading-relaxed">
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

      {/* Additional rows can be added here */}
    </div>
  );
};
