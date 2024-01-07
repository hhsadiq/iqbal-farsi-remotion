import React from 'react';
import { staticFile } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Roboto";


const { fontFamily } = loadFont();

export const ChannelInro: React.FC<{}> = () => {

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Row 1 with two columns */}
      <div className="flex items-center justify-center w-full pt-12">
        <div className="w-1/2">
          <img alt="Rectangle" src={staticFile('img/logo.png')} />
        </div>
      </div>
      {/* Row 2 */}
      <div className="flex items-top justify-center w-full px-20 rtl -mt-8 pt-16 urdu-jameel">
        <p className="text-center text-[48px]">
          آئیے اقبال کا ایک فارسی شعر روزانہ سیکھیں
        </p>
      </div>
      {/* Row 4 */}
      <div className="flex items-top justify-center w-full px-24 pt-8">
        <p className="text-[32px] text-center leading-relaxed"
          style={{
            fontFamily,
          }}
        >
          Unveil Iqbal's Persian Poetry: One Verse a Day
        </p>
      </div>
      {/* Row 5 */}
      <div className="flex items-top justify-center w-full px-24 pt-16">
        <img alt="Rectangle" src={staticFile('img/channel-icons-and-names.svg')} />
      </div>
    </div>
  );
};