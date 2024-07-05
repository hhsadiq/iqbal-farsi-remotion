import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile, useVideoConfig } from 'remotion';
import { TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Audiograms } from './Audiograms';
import { Outro } from "./Outro";
import { Intro } from "./Intro";
import { Couplet } from "./Couplet";
import { Thumbnail } from "./thumbnail";
import { globalSettings } from "../../global-settings";
import { PoemDataSingleObjType } from "../../utils/process-input";

const { fps } = globalSettings.video;

export const HorizontalComposition: React.FC<PoemDataSingleObjType> = ({ data }) => {
	if (!data) {
		return <div>Error or no data available.</div>;
	}

	const audioPath = globalSettings.poem.audioFile;
	const { durationInFrames } = useVideoConfig();
	let time: number = 0;

	if (data.couplets && data.couplets.length > 0 && data.couplets[0].coupletStartTime !== undefined) {
		time = data.couplets[0].coupletStartTime;
	}

	const firstCoupletStartFrame = Math.ceil((time * fps));

	const thumbnailDurationFrames = 3 * fps; // 3 seconds for the thumbnail slide
	const { springTransition } = globalSettings.video;
	const { transitionDurationFrames } = globalSettings.video;
	const outroDurationFrames = (data.outroEnd - data.outroStart) * fps + transitionDurationFrames;

	return (
		<AbsoluteFill className="bg-gray-100 flex flex-col items-center justify-center">
			<Audio src={staticFile(audioPath)} placeholder='persian-recitation' />
			<TransitionSeries>
				{/* Thumbnail Transition Sequence */}
				<TransitionSeries.Sequence
					key="thumbnail"
					durationInFrames={thumbnailDurationFrames}
					layout="none"
				>
					<Thumbnail data={data} />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={springTransition}
					presentation={fade()}
				/>

				{/* Intro and other components continue from here */}
				<TransitionSeries.Sequence
					key="intro"
					durationInFrames={firstCoupletStartFrame}
					layout="none"
				>
					<Intro data={data} />
				</TransitionSeries.Sequence>
				<TransitionSeries.Transition
					timing={springTransition}
					presentation={fade()}
				/>
				{data.couplets.map((couplet, i) => {
					const durationInFrames = Math.ceil((couplet.coupletEndTime - couplet.coupletStartTime) * fps) + transitionDurationFrames;
					return (
						<React.Fragment key={`couplet-${i}`}>
							<TransitionSeries.Sequence
								durationInFrames={durationInFrames}
								layout="none"
							>
								<Couplet couplet={couplet} fps={fps} />
							</TransitionSeries.Sequence>
							<TransitionSeries.Transition
								timing={springTransition}
								presentation={fade()}
							/>
						</React.Fragment>
					);
				})}
				<TransitionSeries.Sequence
					key="outro"
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
