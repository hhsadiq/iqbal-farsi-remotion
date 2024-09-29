import React from 'react';
import {OffthreadVideo, staticFile} from 'remotion';
import {PoemDataSingleObjType} from '../../../utils/process-input';
import {globalSettings} from '../../../global-settings';

import {loadFont} from '@remotion/google-fonts/Roboto';

const {fontFamily} = loadFont();

export const Intro: React.FC<PoemDataSingleObjType> = ({data}) => {
	if (!data) {
		return <div>Error or no data available.</div>;
	}

	return (
		<div className="flex flex-col w-full h-full bg-white">
			{/* Two columns layout */}
			<div className="flex w-full">
				{/* Left Column */}
				<div className="w-[60%] flex flex-col">
					{/* Poem Name */}
					<div className="flex items-top justify-center w-full pt-44 px-32 persian persian-intro">
						<p className="text-center text-red-600 font-bold">
							{data.thumbnailPersian}
						</p>
					</div>
					{/* Row 2 */}
					<div
						className="flex items-top justify-center w-full px-24 -mt-8 pt-24 english-intro"
						style={{fontFamily}}
					>
						<p className="text-center text-black-600">
							{data.thumbnailEnglish}
						</p>
					</div>
					<div className="flex items-top justify-center w-full px-24 -mt-8 pt-12 urdu2 urdu-intro">
						<p className="text-center text-black font-bold">
							{data.thumbnailUrdu}
						</p>
					</div>{' '}
					{/* Horizontal Line */}
					<div className="w-[80%] border-t-2 border-red-600 mt-16 mx-auto" />
					{/* Book Name */}
					<div className="flex items-top justify-center w-full px-24 mt-8 persian persian-intro-ref">
						<p className="text-center text-black-600">
							بحوالہ:&nbsp;&nbsp; {data.bookName}
						</p>
					</div>
					{/* Narrator */}
					<div className="flex items-top justify-center w-full px-24 pt-1 persian persian-intro-ref">
						<p className="text-center">صدا: مخدوم حسان لاهوری</p>
					</div>
				</div>

				{/* Right Column */}
				<div className="w-[40%] flex flex-col items-center justify-center">
					{/* Logo Area */}
					<div
						className="w-[148%] flex flex-col justify-start"
						style={{height: '50%'}}
					>
						<div className="w-full">
							<OffthreadVideo
								muted
								src={staticFile(globalSettings.logo.horizontal.video)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
