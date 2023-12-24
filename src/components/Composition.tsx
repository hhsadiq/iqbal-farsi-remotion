import { AbsoluteFill, Sequence, Audio, Series, staticFile, useVideoConfig } from 'remotion';
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
	let time: number = 0;

	if (data.couplets && data.couplets.length > 0 && data.couplets[0].startTime !== undefined) {
		time = data.couplets[0].startTime;
	}


	let firstCoupletStartTime = Math.ceil((time) * fps);

	return (
		<AbsoluteFill className="bg-gray-100 flex flex-col items-center justify-center">
			<Audio src={staticFile(audioPath)} placeholder='persian-recitation' />
			<Series>
				{data.couplets.map((couplet, i) => {
					const durationInFrames = Math.ceil((couplet.endTime - couplet.startTime) * fps);
					firstCoupletStartTime = i == 0 ? firstCoupletStartTime : 0;

					return (
						<Series.Sequence
							key={couplet.number}
							offset={firstCoupletStartTime}
							durationInFrames={durationInFrames}
							layout="none"
						>
							<Couplet couplet={couplet} data={data} />
						</Series.Sequence>
					);
				})}
			</Series>


			{/* Dynamic Audio Visualization */}
			<Sequence from={0} durationInFrames={durationInFrames} layout="none">
				<Audiograms fps={fps} audioPath={audioPath} />
			</Sequence>

		</AbsoluteFill>
	);
};
