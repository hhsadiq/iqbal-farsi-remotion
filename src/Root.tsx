import React, {useEffect} from 'react';
import {Composition, CalculateMetadataFunction} from 'remotion';
import {VerticalRubaiComposition} from './components/rubai/vertical/Composition';
import {HorizontalRubaiComposition} from './components/rubai/horizontal/Composition';
import {globalSettings} from './global-settings';
import {
	PoemDataType,
	processPoemDocument,
	PoemDataSingleObjType,
} from './utils/process-input';
import {VerticalPoemComposition} from './components/poem/vertical/Composition';
import {HorizontalPoemComposition} from './components/poem/horizontal/Composition';

const calculateMetadataForVertical: CalculateMetadataFunction<
	PoemDataSingleObjType
> = async () => {
	const {fps} = globalSettings.video;

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
		console.error('Error fetching poem data:', error);
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

const calculateMetadataForHorizontal: CalculateMetadataFunction<
	PoemDataSingleObjType
> = async () => {
	const {fps} = globalSettings.video;

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
		console.error('Error fetching poem data:', error);
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
			let cssPath;

			switch (globalSettings.layout) {
				case 'vertical':
					cssPath =
						globalSettings.type === 'poem'
							? './components/poem/vertical/style.css'
							: './components/rubai/vertical/style.css';
					break;
				case 'horizontal':
					cssPath =
						globalSettings.type === 'poem'
							? './components/poem/horizontal/style.css'
							: './components/rubai/horizontal/style.css';
					break;
				default:
					console.error('Invalid layout or type');
					return;
			}

			try {
				await import(`${cssPath}`); // Strange behaviour: when directly using the variable in lazy loading, it won't work
			} catch (error) {
				console.error('Error loading CSS:', error);
			}
		};

		loadCSS();
	}, []); // Empty dependency array ensures this runs once on mount

	const verticalRubai = (
		<Composition
			id="MyComp"
			component={VerticalRubaiComposition}
			defaultProps={{
				data: null,
			}}
			calculateMetadata={calculateMetadataForVertical}
		/>
	);

	const horizontalRubai = (
		<Composition
			id="MyComp"
			component={HorizontalRubaiComposition}
			defaultProps={{
				data: null,
			}}
			calculateMetadata={calculateMetadataForHorizontal}
		/>
	);

	const verticalPoem = (
		<Composition
			id="MyComp"
			component={VerticalPoemComposition}
			defaultProps={{
				data: null,
			}}
			calculateMetadata={calculateMetadataForVertical}
		/>
	);

	const horizontalPoem = (
		<Composition
			id="MyComp"
			component={HorizontalPoemComposition}
			defaultProps={{
				data: null,
			}}
			calculateMetadata={calculateMetadataForHorizontal}
		/>
	);

	console.log('layout', globalSettings.layout, 'type', globalSettings.type);

	let selectedComposition;
	if (globalSettings.layout === 'vertical') {
		selectedComposition =
			globalSettings.type === 'poem' ? verticalPoem : verticalRubai;
	} else {
		selectedComposition =
			globalSettings.type === 'poem' ? horizontalPoem : horizontalRubai;
	}

	return selectedComposition;
};
