import React from 'react';
import { Composition, CalculateMetadataFunction } from 'remotion';
import { MyComposition } from './components/Composition';
import './style.css';
import { globalSettings } from './global-settings';
import { PoemDataType, processPoemDocumentv2, PoemDataSingleObjType } from './utils/process-inputv2';

const calculateMetadata: CalculateMetadataFunction<PoemDataSingleObjType> = async () => {
	const fps = globalSettings.video.fps;

	try {
		const poemData: PoemDataType = await processPoemDocumentv2();
		const durationInFrames = Math.ceil(poemData.outroEnd * fps);

		return {
			durationInFrames,
			fps,
			width: globalSettings.video.width,
			height: globalSettings.video.height,
			props: {
				data: poemData,
			},
		};
	} catch (error) {
		console.error("Error fetching poem data:", error);
		// Fallback values if data fetching fails
		return {
			durationInFrames: 300, // default duration
			fps,
			width: globalSettings.video.width,
			height: globalSettings.video.height,
			props: {
				data: null,
			},
		};
	}
};

export const RemotionRoot: React.FC = () => {
	return (
		<Composition
			id="MyComp"
			component={MyComposition}
			defaultProps={{
				data: null
			}}
			calculateMetadata={calculateMetadata}
		/>
	);
};
