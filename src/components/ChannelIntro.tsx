import React from 'react';
import { OffthreadVideo, staticFile } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Roboto";
import { globalSettings } from '../global-settings';


const { fontFamily } = loadFont();

export const ChannelInro: React.FC<{}> = () => {

  return (
    <div className="flex flex-col w-full h-full bg-white">
      {/* Row 1 with two columns */}
      <div className="flex items-center justify-center w-full pt-12">
        <div className="w-full">
          <OffthreadVideo muted src={staticFile(globalSettings.logo.videoComplete)} />
        </div>
      </div>
      {/* Row 2 */}
      <div className="flex items-top justify-center w-full px-24 rtl -mt-8 pt-40 urdu urdu-outro">
        <p className="text-center">
          آئیے اقبال کا ایک فارسی شعر روزانہ سیکھیں
        </p>
      </div>
      {/* Row 4 */}
      <div className="flex items-top justify-center w-full px-32 pt-12">
        <p className="english-outro text-center leading-relaxed"
          style={{
            fontFamily,
          }}
        >
          Unveil Iqbal's Persian Poetry: One Verse a Day
        </p>
      </div>
      {/* Row 5 */}
      <div className="flex items-top justify-center w-full h-[50%] px-36 mt-[-256px]">
        <img alt="Rectangle" src={staticFile('img/channel-icons-and-names.svg')} />
      </div>
    </div>
  );
};