import {interpolate} from 'remotion';
import {useCurrentFrame} from 'remotion';
import React from 'react';

export const Persian: React.FC<{
	titleText: string;
	titleColor: string;
}> = ({titleText, titleColor}) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [20, 40], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div
			style={{ opacity, color: titleColor, fontFamily: '"Noto Nastaliq Urdu", sans-serif', direction: 'rtl' }}
			className="text-5xl font-bold leading-relaxed"
		>
			{' '}
			{titleText}
		</div>
	);
};
