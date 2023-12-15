import {Composition} from 'remotion';
import {MyComposition, myCompSchema} from './components/Composition';
import './style.css';
import { processPoemDocument } from './utils/process-input';

export const RemotionRoot: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComposition}
				durationInFrames={240}
				fps={30}
				width={1280}
				height={720}
				schema={myCompSchema}
				defaultProps={{
					data: {
						poemName: '',
						bookName: '',
						poemType: '',
						couplets: []
					}
				}}
				calculateMetadata={async ({ props }) => {
					return {
						props: {
							...props,
							data: await processPoemDocument('6.txt'),
						},
					};
				}}
				/>
		</>
	);
};
