import React from 'react';
import { OffthreadVideo, staticFile } from 'remotion';
import { loadFont } from "@remotion/google-fonts/Roboto";
import { globalSettings } from '../../../global-settings';


const { fontFamily } = loadFont();

export const Outro: React.FC<object> = () => {

  return (
    <div className="flex flex-row w-full h-full bg-white">
      {/* Left Column - 70% width */}
      <div className="w-[60%] flex flex-col justify-start pt-12 mt-40 ml-48">
        {/* Urdu Outro */}
        <div className="flex items-center justify-center w-full mt-8">
          <p className="text-center urdu urdu-outro">
            آئیے اقبال کا ایک فارسی شعر روزانہ سیکھیں
          </p>
        </div>
        {/* English Outro */}
        <div className="flex items-center justify-center w-full px-16 mt-8">
          <p className="text-center english-outro leading-relaxed" style={{ fontFamily }}>
            Unveil Iqbal's Persian Poetry: One Verse a Day
          </p>
        </div>
        {/* Social Media Icons */}
        <div className="flex items-center justify-center w-full mt-24 px-48">
          <img alt="Social Media Icons" src={staticFile('img/channel-icons-and-names.svg')} className="w-[80%] h-auto" />
        </div>
      </div>

      {/* Right Column */}
      <div className="w-[70%] flex flex-col items-center justify-center">
        {/* Logo Area */}
        <div className="flex flex-col justify-start">
          <div className="w-full">
            <OffthreadVideo
              muted
              src={staticFile(globalSettings.logo.horizontal.video)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};