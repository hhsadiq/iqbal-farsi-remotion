import React from 'react';
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { staticFile, useVideoConfig, useCurrentFrame } from 'remotion';


type audiogramSchema = {
  fps: number;
  audioPath: string;
};

export const Audiograms: React.FC<audiogramSchema> = ({
  fps,
  audioPath,
}) => {

  const { durationInFrames } = useVideoConfig();
  const currentFrame = useCurrentFrame(); // Get the current frame
  const audioData = useAudioData(staticFile(audioPath));
  if (!audioData) {
    return null;
  }

  const visualization = visualizeAudio({
    fps,
    frame: durationInFrames, // Assuming you want to visualize the entire duration
    audioData,
    numberOfSamples: 64, // Use a power of two here
  });

  console.log(visualization);
  return (
    <div style={{ position: 'absolute', bottom: '0', width: '100%', height: '400px', display: 'flex', alignItems: 'center' }}>
      {visualization.map((v, i) => {
        const barHeight = Math.max(10, v * 4000); // Height calculation

        return (
          <div
            key={i}
            style={{
              width: '2px', // Fixed width for each bar
              height: `${barHeight}px`, // Dynamic height based on audio data
              backgroundColor: "red",
              margin: '0 1px', // Margin to separate the bars
              display: 'inline-block' // Align bars next to each other horizontally
            }}
          />
        );
      })}
    </div>

  );
};