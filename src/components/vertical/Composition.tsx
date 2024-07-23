import {
	TransitionSeries
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { Audiograms } from './Audiograms';
import { Outro } from "./Outro";
import { Intro } from "./Intro";
import { globalSettings } from "../../global-settings";
import { PoemDataSingleObjType } from "../../utils/process-input";
import { Couplet } from "./Couplet";

const {fps} = globalSettings.video;

export const VerticalComposition: React.FC<PoemDataSingleObjType> = ({
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

	const firstCoupletStartFrame = Math.ceil(((time) * fps));


	const {springTransition} = globalSettings.video
	const {transitionDurationFrames} = globalSettings.video;

	const outroDurationFrames = (data.outroEnd - data.outroStart) * fps + transitionDurationFrames;

	return (
		<AbsoluteFill className="bg-gray-100 flex flex-col items-center justify-center">
			<Audio src={staticFile(audioPath)} placeholder='persian-recitation' />
			<TransitionSeries>
				<TransitionSeries.Sequence
					key={200}
					durationInFrames={firstCoupletStartFrame + globalSettings.video.transitionDurationFramesFirst}
					layout="none"
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
								key={i + 1}
								durationInFrames={durationInFrames}
								layout="none"
							>
								<Couplet couplet={couplet} fps={fps} />
							</TransitionSeries.Sequence>
							<TransitionSeries.Transition
								key={i + 2}
								timing={springTransition}
								presentation={fade()}
							/>
						</React.Fragment>
					);
				})}

				<TransitionSeries.Sequence
					key={343}
					durationInFrames={outroDurationFrames}
					layout="none"
				>
					<Outro />
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
