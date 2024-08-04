import React, { useEffect } from 'react';
import { Composition, CalculateMetadataFunction } from 'remotion';
import { VerticalRubaiComposition } from './components/rubai/vertical/Composition';
import { HorizontalRubaiComposition } from './components/rubai/horizontal/Composition';
import { globalSettings } from './global-settings';
import { PoemDataType, processPoemDocument, PoemDataSingleObjType } from './utils/process-input';

const calculateMetadataForVertical: CalculateMetadataFunction<PoemDataSingleObjType> = async () => {
	const { fps } = globalSettings.video;

	try {
		const poemData: PoemDataType = await processPoemDocument();
		const durationInFrames = Math.ceil(poemData.outroEnd * fps);

		return {
			durationInFrames,
			fps,
			width: globalSettings.video.vertical.width,
			height: globalSettings.video.vertical.height,
			props: {
				data: poemData,
			},
		};
	} catch (error) {
		console.error("Error fetching poem data:", error);
		// Fallback values if data fetching fails
		return {
			durationInFrames: 300, // Default duration
			fps,
			width: globalSettings.video.vertical.width,
			height: globalSettings.video.vertical.height,
			props: {
				data: null,
			},
		};
	}
};

const calculateMetadataForHorizontal: CalculateMetadataFunction<PoemDataSingleObjType> = async () => {
	const { fps } = globalSettings.video;

	try {
		const poemData: PoemDataType = await processPoemDocument();
		const durationInFrames = Math.ceil(poemData.outroEnd * fps);

		return {
			durationInFrames,
			fps,
			width: globalSettings.video.horizontal.width,
			height: globalSettings.video.horizontal.height,
			props: {
				data: poemData,
			},
		};
	} catch (error) {
		console.error("Error fetching poem data:", error);
		// Fallback values if data fetching fails
		return {
			durationInFrames: 300, // Default duration
			fps,
			width: globalSettings.video.horizontal.width,
			height: globalSettings.video.horizontal.height,
			props: {
				data: null,
			},
		};
	}
};


export const RemotionRoot: React.FC = () => {
	useEffect(() => {
		const loadCSS = async () => {
			if (globalSettings.layout === 'vertical') {
				await import('./vertical-style.css');
			} else {
				await import('./horizontal-style.css');
			}
		};

		loadCSS();
	}, []); // Empty dependency array ensures this runs once on mount

	const vertical = <Composition
		id="MyComp"
		component={VerticalRubaiComposition}
		defaultProps={{
			data: null
		}}
		calculateMetadata={calculateMetadataForVertical}
	/>

	const horizontal = <Composition
		id="MyComp"
		component={HorizontalRubaiComposition}
		defaultProps={{
			data: null
		}}
		calculateMetadata={calculateMetadataForHorizontal}
	/>

	console.log('layout', globalSettings.layout);
	return globalSettings.layout === 'vertical' ? vertical : horizontal;
};
