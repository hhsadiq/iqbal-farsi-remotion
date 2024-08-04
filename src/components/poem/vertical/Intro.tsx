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
			{/* Row 1 with two columns */}
			<div className="flex items-center justify-center w-full pt-12">
				<div className="w-full h-full">
					<OffthreadVideo
						muted
						src={staticFile(globalSettings.logo.vertical.video)}
					/>
				</div>
			</div>
			{/* Row 2 */}
			<div className="flex items-top justify-center w-full px-24 -mt-8 pt-24 persian persian-intro">
				<p className="text-center text-red-600 font-bold">
					{data.thumbnailPersian}
				</p>
			</div>
			{/* Row 2 */}
			<div
				className="flex items-top justify-center w-full px-24 -mt-8 pt-24 english-intro"
				style={{fontFamily}}
			>
				<p className="text-center text-red-600 font-bold">
					{data.thumbnailEnglish}
				</p>
			</div>{' '}
			{/* Horizontal Line */}
			<div className="w-[60%] border-t-2 border-red-600 mt-20 mb-12 mx-auto" />
			{/* Row 4 */}
			<div className="flex items-top justify-center w-full px-24 persian persian-intro-ref">
				<p className="text-center text-black-600">
					بحوالہ:&nbsp;&nbsp; {data.bookName}
				</p>
			</div>
			{/* Row 5 */}
			<div className="flex items-top justify-center w-full px-24 persian persian-intro-ref">
				<p className="text-center">صدا: مخدوم حسان لاهوری</p>
			</div>
		</div>
	);
};
