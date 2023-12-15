import { AbsoluteFill } from 'remotion';
import { Persian } from './Title';
import { z } from 'zod';

const coupletSchema = z.object({
  number: z.number(),
  persian: z.string(),
  urdu: z.string(),
  english: z.string(),
});

export const myCompSchema = z.object({
  data: z.object({
    bookName: z.string(),
    poemName: z.string(),
    poemType: z.string(),
    couplets: z.array(coupletSchema),
  }),
});

export const MyComposition: React.FC<z.infer<typeof myCompSchema>> = ({
	data: data,
}) => {
	return (
		<AbsoluteFill className="bg-gray-100 items-center justify-center">
			<Persian
				titleText={data.poemName}
				titleColor='#FF0000'
			/>
		</AbsoluteFill>
	);
};
