import React, { useEffect, useState } from 'react';
import { Composition } from 'remotion';
import { MyComposition, myCompSchema } from './components/Composition';
import './style.css';
import { z } from 'zod';
import { globalSettings } from './global-settings';
import { processPoemDocumentv2 } from './utils/process-inputv2';

// Infer the type for the poem data from the schema
type PoemDataType = z.infer<typeof myCompSchema>['data'];
export const RemotionRoot: React.FC = () => {
	// Initialize state with the inferred type
	const [data, setData] = useState<PoemDataType | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const poemData: PoemDataType = await processPoemDocumentv2(globalSettings.poem.textFile);
			setData(poemData);
		};

		fetchData();
	}, []);

	if (!data) {
		return <div>Loading...</div>;
	}

	const fps = globalSettings.video.fps;
	// Calculate the total duration based on the last couplet's start time
	const lastCouplet = data.couplets[data.couplets.length - 1];
	const totalDurationInFrames = Math.ceil(lastCouplet.coupletEndTime * fps) + globalSettings.outroDurationFPS;


	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={totalDurationInFrames}
				fps={fps}
				width={globalSettings.video.width}
				height={globalSettings.video.height}
				defaultProps={{
					data
				}}
			/>
		</>
	);
};
