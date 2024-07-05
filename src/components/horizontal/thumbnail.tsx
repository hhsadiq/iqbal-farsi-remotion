import React from 'react';
import { Img, staticFile } from 'remotion';
import { PoemDataSingleObjType } from '../../utils/process-input';

export const Thumbnail: React.FC<PoemDataSingleObjType> = ({
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


          {/* Persian */}
          <div className="flex items-top justify-center w-full pt-48 persian persian-thumbnail">
            <p className="text-center text-red-600">
              شہید ناز
            </p>
          </div>

          {/* Persian */}
          <div className="flex items-top justify-center w-full pt-48 english english-thumbnail">
            <p className="text-center text-red-600 font-bold">
              Testament To Allah
            </p>
          </div>

        </div>

        {/* Right Column */}
        <div className="w-[40%] flex flex-col items-center justify-center">
          {/* Logo Area */}
          <div className="w-[160%] h-[90%] mt-[-80px] flex flex-col justify-center" >
            <div className="w-full">
              <Img src={staticFile('img/logo-horizontal.png')} placeholder='logo' className="w-full h-auto ml-[-96px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};