import { interpolate, useCurrentFrame } from 'remotion';
import React from 'react';
import { CSSProperties } from 'react';

export const Text: React.FC<{
  text: string;
  language: 'persian' | 'urdu' | 'english';
}> = ({ text, language }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const getClassName = () => {
    switch (language) {
      case 'persian':
      case 'urdu':
        return 'text-4xl font-bold leading-relaxed';
      case 'english':
        return 'text-3xl font-semibold';
      default:
        return '';
    }
  };

  const getStyle = (): CSSProperties => {
    switch (language) {
      case 'persian':
      case 'urdu':
        return {
          opacity,
          fontFamily: '"Noto Nastaliq Urdu", sans-serif',
          direction: 'rtl' as const // Ensure the type is 'rtl'
        };
      case 'english':
        return {
          opacity,
          fontFamily: 'Arial, sans-serif',
          direction: 'ltr' as const // Ensure the type is 'ltr'
        };
      default:
        return { opacity };
    }
  };

  return (
    <div style={getStyle()} className={getClassName()}>
      {text}
    </div>
  );
};
