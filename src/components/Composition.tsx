import { AbsoluteFill, Sequence, Audio, staticFile } from 'remotion';
import React from 'react';
import { Text } from './Text'; // Assuming Text is the component you have defined earlier
import { z } from 'zod';

const coupletSchema = z.object({
    number: z.number(),
    startTime: z.number(),
    endTime: z.number(),
    persian: z.string(),
    urdu: z.string(),
    english: z.string(),
});

export const myCompSchema = z.object({
    poemPath: z.string(),
    data: z.object({
        bookName: z.string(),
        poemName: z.string(),
        poemType: z.string(),
        couplets: z.array(coupletSchema),
    }),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
    data,
    poemPath
}) => {
    const fps = 30;
    const audioPath = poemPath + 'audio.m4a';

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
                        <div className="space-y-4">
                            <Text text={couplet.persian} language="persian" />
                            <Text text={couplet.urdu} language="urdu" />
                            <Text text={couplet.english} language="english" />
                        </div>
                    </Sequence>
                );
            })}
        </AbsoluteFill>
    );
};
