import React from 'react';
import { staticFile } from 'remotion';
import { PoemDataSingleObjType } from '../utils/process-inputv2';

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
        <div className="w-[55%]">
          <img alt="Rectangle" src={staticFile('img/logo.png')} />
        </div>
      </div>
      {/* Row 2 */}
      <div className="flex items-top justify-center w-full px-16 -mt-8 pt-16 persian">
        <p className="text-center text-red-600">
          {data.poemType}: {data.poemName}
        </p>
      </div>
      {/* Row 4 */}
      <div className="flex items-top justify-center w-full px-16 -mt-8 pt-16 urdu">
        <p className="text-center text-[40px]">
          بحوالہ: {data.bookName}
        </p>
      </div>
      {/* Row 5 */}
      <div className="flex items-top justify-center w-full px-16 -mt-8 pt-12 urdu">
        <p className="text-center text-[40px]">
          صدا: حسان لاھوری
        </p>
      </div>
    </div>
  );
};