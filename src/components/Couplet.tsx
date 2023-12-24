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
    <div className="flex flex-col w-full h-full">
      {/* Row 1 with two columns */}
      <div className="flex flex-row w-full h-1/5">
        {/* Left Column 60% with two child rows */}
        <div className="flex flex-col flex-grow p-4 bg-gray-200 [direction:rtl]">
          <div className="flex items-end justify-center flex-grow p-2 bg-gray-300">
            <span className="text-red-600">شعر:</span> (1/2)
            &nbsp;
            <span className="text-red-600">غزل:</span>  شہید ناز او بزم وجود است
          </div>
          <div className="flex items-start justify-center flex-grow p-2 bg-gray-400">
            <span className="text-red-600">بحوالہ:</span>
            پیام مشرق، لالۂ طور، رباعی1
          </div>
        </div>
        {/* Right Column 40% */}
        <div className="w-1/3 p-4 bg-gray-500">
          <img alt="Rectangle" src={staticFile('img/logo.png')} />
        </div>
      </div>
      {/* Row 2 */}
      <div className="flex items-start justify-center w-full h-1/5 p-4 bg-gray-300">
        <p>
          {couplet.persian1}
          <br />
          {couplet.persian2}
        </p>
      </div>
      {/* Row 3 */}
      <div className="flex items-center justify-center w-full h-1/5 p-4 bg-gray-500">
        <p>
          {couplet.urdu}
        </p>
      </div>
      {/* Row 4 */}
      <div className="flex items-center justify-center w-full h-1/5 p-4 bg-gray-600">
        <p>
          {couplet.english}
        </p>
      </div>
      {/* Row 5 */}
      <div className="flex items-center justify-center w-full h-1/5 p-4 bg-gray-700">
        <img alt="audiograms" src={staticFile('img/audiograms.jpeg')} />
      </div>
    </div>
  );
};
