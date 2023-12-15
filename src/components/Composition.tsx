import { AbsoluteFill } from 'remotion';
import { Persian } from './Title';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

export const myCompSchema = z.object({
	titleText: z.string(),
	titleColor: zColor(),
	logoColor: zColor(),
	data: z.object({}),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	titleText: propOne,
	titleColor: propTwo,
	logoColor: propThree,
	data: data,
}) => {
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
			<Persian
				titleText={propOne}
				titleColor={propTwo}
			/>
			{/* <YourComponent/> */}
		</AbsoluteFill>
	);
};
