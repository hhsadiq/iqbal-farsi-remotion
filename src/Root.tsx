import React, { useEffect, useState } from 'react';
import { Composition } from 'remotion';
import { MyComposition, myCompSchema } from './components/Composition';
import './style.css';
import { processPoemDocument } from './utils/process-input';
import { z } from 'zod';

// Infer the type for the poem data from the schema
type PoemDataType = z.infer<typeof myCompSchema>['data'];

export const RemotionRoot: React.FC = () => {
	// Initialize state with the inferred type
	const [data, setData] = useState<PoemDataType | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const poemData: PoemDataType = await processPoemDocument('poems/zabur/hissa-e-awal/6 - man agarche tera khakam/poem.txt');
			setData(poemData);
		};

		fetchData();
	}, []);

	if (!data) {
		return <div>Loading...</div>;
	}

	// Calculate the total duration of the video
	const perCoupletDuration = 2;
	const fps = 30;
	const framesPerCouplet = perCoupletDuration * fps;
	const totalDurationInFrames = data.couplets.length * framesPerCouplet;

	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={totalDurationInFrames}
				fps={fps}
				width={1280}
				height={720}
				defaultProps={{
					framesPerCouplet,
					data,
				}}
			/>
		</>
	);
};
