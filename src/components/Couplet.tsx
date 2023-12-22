import React from 'react';
import { z } from 'zod';
import { coupletSchema } from './Composition';
import { staticFile } from 'remotion';

type coupletCompSchema = {
  couplet: z.infer<typeof coupletSchema>;
  bookName: string;
};

export const Couplet: React.FC<coupletCompSchema> = ({
  couplet,
  bookName
}) => {
  return (
    <div className="bg-white flex flex-row justify-center w-full h-full">
      <div className="flex flex-col justify-start items-center w-full max-w-[1544px] h-full py-4 px-16">
        {/* Left side main content */}
        <p className="mt-8 text-[#ff0000] text-[48px] [font-family:'Noto_Nastaliq_Urdu-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal] [direction:rtl]">
          {couplet.persian1}
          <br />
          {couplet.persian2}
        </p>
        <p className="mt-8 text-black text-[36px] [font-family:'Noto_Nastaliq_Urdu-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal] [direction:rtl]">
          {couplet.urdu}
        </p>
        <p className="mt-16 [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-black text-[42px] text-center tracking-[0] leading-[normal]">
          {couplet.english}
        </p>
        <img className="mt-48" alt="Frame" src={staticFile('img/frame-1.svg')} />
      </div>
      <div className="flex flex-col justify-start items-center h-full">
        <img className=" h-[1000px]" alt="Line" src={staticFile('img/line-1.svg')} />
      </div>
      <div className="flex flex-col justify-start items-center w-[372px] h-full">
        {/* Right side reference content */}
        <img className="mt-4 w-[307px] h-[352px]" alt="Rectangle" src={staticFile('img/rectangle-1.png')} />
        <p className="mt-4 text-transparent text-[24px] [font-family:'Noto_Nastaliq_Urdu-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal] [direction:rtl]">
          <span className="text-[#ff0000]">بحوالہ:&nbsp;&nbsp;</span>
          <span className="text-black"> {bookName} </span>
        </p>
        <p className="mt-4 text-transparent text-[24px] [font-family:'Noto_Nastaliq_Urdu-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal] [direction:rtl]">
          <span className="text-[#ff0000]">آواز:</span>
          <span className="text-black"> حسان لاھوری</span>
        </p>
      </div>
    </div>
  );
};
