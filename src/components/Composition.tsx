import { AbsoluteFill, Sequence, Audio, staticFile, useVideoConfig } from 'remotion';
import React from 'react';
import { z } from 'zod';
import { Couplet } from './Couplet';
import { Audiograms } from './Audiograms';

export const coupletSchema = z.object({
	number: z.number(),
	startTime: z.number(),
	endTime: z.number(),
	persian1: z.string(),
	persian2: z.string(),
	urdu: z.string(),
	english: z.string(),
});

export const poemDataSchema =
	z.object({
		bookName: z.string(),
		poemName: z.string(),
		poemType: z.string(),
		totalCouplets: z.number(),
		couplets: z.array(coupletSchema),
	});

export const myCompSchema = z.object({
	poemPath: z.string(),
	data: poemDataSchema,
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	data,
	poemPath
}) => {
	const fps = 30;
	const audioPath = poemPath + 'audio.m4a';
	const { durationInFrames } = useVideoConfig();

	return (
		<AbsoluteFill className="bg-gray-100 flex flex-col items-center justify-center">
			<Audio src={staticFile(audioPath)} placeholder='persian-recitation' />
			{data.couplets.map((couplet) => {
				const from = Math.ceil(couplet.startTime * fps);
				const durationInFrames = Math.ceil((couplet.endTime - couplet.startTime) * fps);

				return (
					<Sequence
						key={couplet.number}
						from={from}
						durationInFrames={durationInFrames}
						layout="none"
					>
						<Couplet couplet={couplet} data={data} />
					</Sequence>
				);
			})}


			{/* Dynamic Audio Visualization */}
			<Sequence from={0} durationInFrames={durationInFrames} layout="none">
				<Audiograms fps={fps} audioPath={audioPath} />
			</Sequence>

		</AbsoluteFill>
	);
};
