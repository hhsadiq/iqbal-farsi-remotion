import React from 'react';
import { z } from 'zod';
import { coupletSchema, poemDataSchema } from './Composition';
import { staticFile } from 'remotion';

type coupletCompSchema = {
  couplet: z.infer<typeof coupletSchema>;
  data: z.infer<typeof poemDataSchema>;
};

export const Couplet: React.FC<coupletCompSchema> = ({
  couplet,
  data,
}) => {
  console.log(data);
  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Row 1 with two columns */}
      <div className="flex flex-row w-full h-1/5">
        {/* Left Column 60% with two child rows */}
        <div className="flex flex-col flex-grow p-4 rtl font-nastaliq text-[22px] -mr-12 z-10">
          <div className="flex items-end justify-start flex-grow p-2 font-[Noto Nastaliq Urdu]">
            <span className="text-red-600">شعر:&nbsp;</span> ({couplet.number}/{data.totalCouplets})
            &nbsp;
            <span className="text-red-600">{data.poemType}:&nbsp;</span> {data.poemName}
          </div>
          <div className="flex justify-start flex-grow p-2 font-[Noto Nastaliq Urdu]">
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
      <div className="flex items-top justify-center w-full h-1/5 px-8 font-nastaliq-variable rtl">
        <p className="text-[40px] text-red-600 text-center leading-loose-persian">
          {couplet.persian1}
          <br />
          <span>{couplet.persian2}</span>
        </p>
      </div>
      {/* Row 3 */}
      <div className="flex items-top justify-center w-full h-1/5 px-12 font-nastaliq rtl -mt-8">
        <p className="text-[30px] text-center leading-loose-urdu">
          {couplet.urdu}
        </p>
      </div>
      {/* Row 4 */}
      <div className="flex items-top justify-center w-full h-1/5 px-12">
        <p className="text-[32px] text-center font-[Noto Sans] leading-relaxed">
          {couplet.english}
        </p>
      </div>
      {/* Row 5 */}
      <div className="flex items-center justify-center w-full h-1/5 bg-white">
        <img alt="audiograms" src={staticFile('img/audiograms.jpeg')} />
      </div>
    </div>
  );
};