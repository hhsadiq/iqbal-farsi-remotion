import { AbsoluteFill } from 'remotion';
import { Persian } from './Title';
import { z } from 'zod';
import { zColor } from '@remotion/zod-types';

const coupletSchema = z.object({
  number: z.number(),
  persian: z.string(),
  urdu: z.string(),
  english: z.string(),
});

export const myCompSchema = z.object({
  titleText: z.string(),
  titleColor: zColor(),
  logoColor: zColor(),
  data: z.object({
    bookName: z.string(),
    poemName: z.string(),
    poemType: z.string(),
    couplets: z.array(coupletSchema),
  }),
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
				titleText={data.bookName}
				titleColor={propTwo}
			/>
		</AbsoluteFill>
	);
};
