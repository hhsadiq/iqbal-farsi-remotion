import {Composition, staticFile} from 'remotion';
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
					titleText: 'من اگرچہ تیرہ خاکم دلکیست برگ و سازم',
					titleColor: '#FF0000',
					logoColor: '#00bfff',
					data: {
						poemName: '',
						bookName: '',
						poemType: '',
						couplets: []
					}
				}}
				calculateMetadata={async ({ props }) => {
					const data = await fetch(staticFile('6.txt'));
					const text = await data.text();
					return {
						props: {
							...props,
							data: processPoemDocument(text),
						},
					};
				}}
				/>
		</>
	);
};
