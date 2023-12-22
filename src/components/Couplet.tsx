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
    <div className="bg-white flex flex-row justify-center w-full">
      <div className="bg-white w-[1920px] h-[1080px] relative">
        <p className="w-[1086px] top-[35px] left-[250px] text-[#ff0000] text-[48px] absolute [font-family:'Noto_Nastaliq_Urdu-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal] [direction:rtl]">
          {couplet.persian1}
          <br />
          {couplet.persian2}
        </p>
        <p className="w-[1353px] top-[373px] left-[111px] text-black text-[36px] absolute [font-family:'Noto_Nastaliq_Urdu-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal] [direction:rtl]">
          {couplet.urdu}
        </p>
        <p className="absolute w-[1353px] top-[565px] left-[116px] [font-family:'Noto_Sans-Regular',Helvetica] font-normal text-black text-[40px] text-center tracking-[0] leading-[normal]">
          <span className="[font-family:'Noto_Sans-Regular',Helvetica] font-normal text-black text-[40px] tracking-[0]">
            {couplet.english}
            <br />
          </span>
          <span className="[font-family:'Noto_Nastaliq_Urdu-Regular',Helvetica]">
            <br />
          </span>
        </p>
        <img
          className="absolute w-[307px] h-[352px] top-0 left-[1599px] object-cover"
          alt="Rectangle"
          src={staticFile('img/rectangle-1.png')}
        />
        <img className="absolute w-[11px] h-[959px] top-0 left-[1544px]" alt="Line" src={staticFile('img/line-1.svg')} />
        <p className="top-[491px] left-[1669px] text-transparent text-[24px] absolute [font-family:'Noto_Nastaliq_Urdu-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal] [direction:rtl]">
          <span className="text-[#ff0000]">آواز:</span>
          <span className="text-black"> حسان لاھوری</span>
        </p>
        <p className="top-[394px] left-[1596px] text-transparent text-[24px] absolute [font-family:'Noto_Nastaliq_Urdu-Regular',Helvetica] font-normal text-center tracking-[0] leading-[normal] [direction:rtl]">
          <span className="text-[#ff0000]">بحوالہ:&nbsp;&nbsp;</span>
          <span className="text-black"> {bookName} </span>
        </p>
        <img className="absolute w-[1353px] h-[140px] top-[814px] left-[111px]" alt="Frame" src={staticFile('img/frame-1.svg')} />
      </div>
    </div>
  );
};
