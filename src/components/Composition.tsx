import {
	TransitionSeries
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { Audiograms } from './Audiograms';
import { ChannelInro } from "./ChannelIntro";
import { Intro } from "./Intro";
import { globalSettings } from "../global-settings";
import { PoemDataSingleObjType } from "../utils/process-inputv2";
import { Couplet } from "./Couplet";

const fps = globalSettings.video.fps;

export const MyComposition: React.FC<PoemDataSingleObjType> = ({
	data
}) => {
	if (!data) {
		return <div>Error or no data available.</div>;
	}

	const audioPath = globalSettings.poem.audioFile;
	const { durationInFrames } = useVideoConfig();
	let time: number = 0;

	if (data.couplets && data.couplets.length > 0 && data.couplets[0].coupletStartTime !== undefined) {
		time = data.couplets[0].coupletStartTime;
	}

	let firstCoupletStartFrame = Math.ceil(((time) * fps));


	const springTransition = globalSettings.video.springTransition
	const transitionDurationFrames = globalSettings.video.transitionDurationFrames;

	const outroDurationFrames = (data.outroEnd - data.outroStart) * fps + transitionDurationFrames;

	return (
		<AbsoluteFill className="bg-gray-100 flex flex-col items-center justify-center">
			<Audio src={staticFile(audioPath)} placeholder='persian-recitation' />
			<TransitionSeries>
				<TransitionSeries.Sequence
					durationInFrames={firstCoupletStartFrame + globalSettings.video.transitionDurationFramesFirst}
					layout="none"
					key={200}
				>
					<Intro data={data} />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={globalSettings.video.springTransitionFirst}
					presentation={fade()}
				/>
				{data.couplets.map((couplet, i) => {
					const durationInFrames = Math.ceil((couplet.coupletEndTime - couplet.coupletStartTime) * fps) + transitionDurationFrames;
					return (
						<React.Fragment key={i}>
							<TransitionSeries.Sequence
								durationInFrames={durationInFrames}
								layout="none"
								key={i + 1}
							>
								<Couplet couplet={couplet} fps={fps} />
							</TransitionSeries.Sequence>
							<TransitionSeries.Transition
								timing={springTransition}
								presentation={fade()}
								key={i + 2}
							/>
						</React.Fragment>
					);
				})}

				<TransitionSeries.Sequence
					durationInFrames={outroDurationFrames}
					layout="none"
					key={343}
				>
					<ChannelInro />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={springTransition}
					presentation={fade()}
				/>


			</TransitionSeries>


			{/* Dynamic Audio Visualization */}
			<Sequence from={0} durationInFrames={durationInFrames} layout="none">
				<Audiograms fps={fps} audioPath={audioPath} />
			</Sequence>

		</AbsoluteFill>
	);
};
