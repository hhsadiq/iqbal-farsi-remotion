import { AbsoluteFill, Sequence } from 'remotion';
import React from 'react';
import { Text } from './Text'; // Assuming Text is the component you have defined earlier
import { z } from 'zod';

const coupletSchema = z.object({
	number: z.number(),
	persian: z.string(),
	urdu: z.string(),
	english: z.string(),
});

export const myCompSchema = z.object({
	framesPerCouplet: z.number(),
	data: z.object({
		bookName: z.string(),
		poemName: z.string(),
		poemType: z.string(),
		couplets: z.array(coupletSchema),
	}),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	data,
	framesPerCouplet
}) => {

	return (
		<AbsoluteFill className="bg-gray-100 flex flex-col items-center justify-center">
			{data.couplets.map((couplet, index) => (
				<Sequence
					key={index}
					from={index * framesPerCouplet}
					durationInFrames={framesPerCouplet}
					layout="none" // This will prevent the Sequence from affecting layout
				>
					<div className="space-y-4"> {/* Adjust spacing as needed */}
						<Text text={couplet.persian} language="persian" />
						<Text text={couplet.urdu} language="urdu" />
						<Text text={couplet.english} language="english" />
					</div>
				</Sequence>
			))}
		</AbsoluteFill>
	);
};
