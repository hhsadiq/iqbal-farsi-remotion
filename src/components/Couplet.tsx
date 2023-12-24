import React from 'react';
import { z } from 'zod';
import { coupletSchema, poemDataSchema } from './Composition';
import { staticFile } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Roboto";


type coupletCompSchema = {
  couplet: z.infer<typeof coupletSchema>;
  data: z.infer<typeof poemDataSchema>;
};

const { fontFamily } = loadFont();

export const Couplet: React.FC<coupletCompSchema> = ({
  couplet,
  data,
}) => {


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
      <div className="flex items-top justify-center w-full px-8 persian">
        <p className="text-red-600 text-center">
          {couplet.persian1}
          <br />
          <span>{couplet.persian2}</span>
        </p>
      </div>
      {/* Row 3 */}
      <div className="flex items-top justify-center w-full px-8 rtl -mt-8 pt-20 urdu">
        <p className="text-center">
          {couplet.urdu}
        </p>
      </div>
      {/* Row 4 */}
      <div className="flex items-top justify-center w-full px-8 pt-12">
        <p className="text-[32px] text-center leading-relaxed"
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