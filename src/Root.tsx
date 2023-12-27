import React, { useEffect, useState } from 'react';
import { Composition } from 'remotion';
import { MyComposition, myCompSchema } from './components/Composition';
import './style.css';
import { processPoemDocument } from './utils/process-input';
import { z } from 'zod';

// Infer the type for the poem data from the schema
type PoemDataType = z.infer<typeof myCompSchema>['data'];
const poemPath = 'poems/zabur/hissa-e-awal/6 - man agarche tera khakam/';
export const RemotionRoot: React.FC = () => {
	// Initialize state with the inferred type
	const [data, setData] = useState<PoemDataType | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const poemData: PoemDataType = await processPoemDocument(poemPath + 'poem.txt');
			setData(poemData);
		};

		fetchData();
	}, []);

	if (!data) {
		return <div>Loading...</div>;
	}

	// Calculate the total duration based on the last couplet's start time
	const fps = 30;
	const lastCouplet = data.couplets[data.couplets.length - 1];
	const totalDurationInFrames = Math.ceil(lastCouplet.coupletEndTime * fps);


	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={totalDurationInFrames}
				fps={fps}
				width={720}
				height={1280}
				defaultProps={{
					data,
					poemPath,
				}}
			/>
		</>
	);
};
