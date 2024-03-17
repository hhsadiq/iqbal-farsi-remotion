import React from 'react';
import { OffthreadVideo, staticFile } from 'remotion';
import { PoemDataSingleObjType } from '../utils/process-inputv2';
import { globalSettings } from '../global-settings';

export const Intro: React.FC<PoemDataSingleObjType> = ({
  data,
}) => {

  if (!data) {
    return <div>Error or no data available.</div>;
  }

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Row 1 with two columns */}
      <div className="flex items-center justify-center w-full pt-12">
        <div className="w-full h-full">
          <OffthreadVideo muted src={staticFile(globalSettings.logo.videoComplete)} />
        </div>
      </div>
      {/* Row 2 */}
      <div className="flex items-top justify-center w-full px-24 -mt-8 pt-24 persian persian-intro">
        <p className="text-center text-red-600">
          {data.poemType}: {data.poemName}
        </p>
      </div>
      {/* Row 4 */}
      <div className="flex items-top justify-center w-full px-24 mt-8 persian persian-intro-ref">
        <p className="text-center text-red-600">
          بحوالہ:&nbsp;&nbsp; {data.bookName}
        </p>
      </div>
      {/* Horizontal Line */}
      <div className="w-[60%] border-t-2 border-red-600 my-8 mx-auto"></div>

      {/* Row 6 */}
      <div className="flex items-top justify-center w-full px-24 urdu urdu-intro">
        <p className="text-center">
          فارسی کلام اقبال - اردو / Eng
        </p>
      </div>

      {/* Row 5 */}
      <div className="flex items-top justify-center w-full px-24 pt-4 urdu urdu-intro">
        <p className="text-center">
          صدا: مخدوم حسان لاهوری
        </p>
      </div>
    </div>
  );
};