import {
	TransitionSeries,
	linearTiming,
	springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { z } from 'zod';
import { Audiograms } from './Audiograms';
import { Couplet } from './Couplet';

export const coupletSchema = z.object({
	number: z.number(),
	coupletStartTime: z.number(),
	coupletEndTime: z.number(),
	verseStartTime: z.number(),
	verseEndTime: z.number(),
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

export const fps = 30;

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	data,
	poemPath
}) => {
	const audioPath = poemPath + 'audio.m4a';
	const { durationInFrames } = useVideoConfig();
	let time: number = 0;

	console.log(data);
	if (data.couplets && data.couplets.length > 0 && data.couplets[0].coupletStartTime !== undefined) {
		time = data.couplets[0].coupletStartTime;
	}

	let firstCoupletStartTime = Math.ceil((time) * fps);

	const transitionSpringTime = springTiming({
		config: {
			damping: 10,
			stiffness: 20,
		}
	});

	const transitionTimings = transitionSpringTime.getDurationInFrames({ fps });

	return (
		<AbsoluteFill className="bg-gray-100 flex flex-col items-center justify-center">
			<Audio src={staticFile(audioPath)} placeholder='persian-recitation' startFrom={firstCoupletStartTime} />
			<TransitionSeries>
				<TransitionSeries.Transition
					timing={linearTiming({ durationInFrames: 100 })}
					presentation={fade()}
				/>
				{data.couplets.map((couplet, i) => {
					const durationInFrames = Math.ceil((couplet.coupletEndTime - couplet.coupletStartTime) * fps) + transitionTimings;
					firstCoupletStartTime = i == 0 ? firstCoupletStartTime : 0;
					console.log(transitionTimings, fps);
					return (
						<React.Fragment key={i}>
							<TransitionSeries.Sequence
								durationInFrames={durationInFrames}
								layout="none"
								key={i + 1}
							>
								<Couplet couplet={couplet} data={data} fps={fps} />
							</TransitionSeries.Sequence>
							<TransitionSeries.Transition
								timing={transitionSpringTime}
								presentation={fade()}
								key={i + 2}
							/>
						</React.Fragment>
					);
				})}
			</TransitionSeries>


			{/* Dynamic Audio Visualization */}
			<Sequence from={0} durationInFrames={durationInFrames} layout="none">
				<Audiograms fps={fps} audioPath={audioPath} />
			</Sequence>

		</AbsoluteFill>
	);
};
