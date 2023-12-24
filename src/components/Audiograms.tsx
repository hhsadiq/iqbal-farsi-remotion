import React from 'react';
import { useAudioData, visualizeAudio } from "@remotion/media-utils";
import { staticFile, useCurrentFrame } from 'remotion';


type audiogramSchema = {
  fps: number;
  audioPath: string;
};

export const Audiograms: React.FC<audiogramSchema> = ({
  fps,
  audioPath,
}) => {

  const currentFrame = useCurrentFrame(); // Get the current frame
  const audioData = useAudioData(staticFile(audioPath));
  if (!audioData) {
    return null;
  }

  const visualization = visualizeAudio({
    fps,
    frame: currentFrame, // Assuming you want to visualize the entire duration
    audioData,
    numberOfSamples: 256, // Use a power of two here
  });


  // Apply transformation to emphasize middle values
  const transformedVisualization = visualization.map((v, i, arr) => {
    const middleIndex = arr.length / 2;
    // Mirror the index calculation around the middle
    const mirroredIndex = i > middleIndex ? arr.length - i : i;
    const distanceFromMiddle = Math.abs(mirroredIndex - middleIndex);
    // Gaussian-like transformation
    const scaleFactor = Math.exp(-Math.pow(distanceFromMiddle / middleIndex, 2) * 4);
    return v * scaleFactor;
  });
  
  return (
    <div className="absolute -bottom-8 index w-full h-[400px] flex flex-row items-center justify-center ml-16 pr-16">
      {transformedVisualization.map((v, i) => {
        let barHeight = Math.max(10, v * 120000); // Height calculation
        barHeight = Math.min(barHeight, 400);

        return (
          <div
            key={i}
            style={{
              width: '4px', // Fixed width for each bar
              height: `${barHeight}px`, // Dynamic height based on audio data
              backgroundColor: "#f08686",
              display: 'inline-block', // Align bars next to each other horizontally
            }}
          />
        );
      })}
    </div>

  );
};