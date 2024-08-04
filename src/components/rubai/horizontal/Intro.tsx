import React from 'react';
import { OffthreadVideo, staticFile } from 'remotion';
import { PoemDataSingleObjType } from '../../../utils/process-input';
import { globalSettings } from '../../../global-settings';

export const Intro: React.FC<PoemDataSingleObjType> = ({
  data,
}) => {

  if (!data) {
    return <div>Error or no data available.</div>;
  }

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Two columns layout */}
      <div className="flex w-full">
        {/* Left Column */}
        <div className="w-[60%] flex flex-col">
          {/* Poem Name */}

          <div className="flex items-top justify-center w-full pt-44 px-32 persian persian-intro">
            <p className="text-center text-red-600">
              {data.poemName}
            </p>
          </div>

          {/* Book Name */}
          <div className="flex items-top justify-center w-full px-24 mt-8 persian persian-intro-ref">
            <p className="text-center text-red-600">
              بحوالہ:&nbsp;&nbsp; {data.bookName}
            </p>
          </div>

          {/* Horizontal Line */}
          <div className="w-[80%] border-t-2 border-red-600 my-8 mx-auto" />

          {/* Poem Language */}
          <div className="flex items-top justify-center w-full px-24 urdu urdu-intro">
            <p className="text-center">
              فارسی کلام اقبال - اردو / Eng
            </p>
          </div>

          {/* Narrator */}
          <div className="flex items-top justify-center w-full px-24 pt-1 urdu urdu-intro">
            <p className="text-center">
              صدا: مخدوم حسان لاهوری
            </p>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[40%] flex flex-col items-center justify-center">
          {/* Logo Area */}
          <div className="w-[148%] flex flex-col justify-start" style={{ height: '50%' }}>
            <div className="w-full">
              <OffthreadVideo
                muted
                src={staticFile(globalSettings.logo.horizontal.video)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};