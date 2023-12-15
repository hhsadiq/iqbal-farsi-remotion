import {Composition} from 'remotion';
import {MyComposition, myCompSchema} from './components/Composition';
import './style.css';
// import Profile from './entries.json';
// import { processPoemDocument } from './utils/process-input';

export const RemotionRoot: React.FC = () => {
	console.log('testing');
	// processPoemDocument('public/poems/zabur/hissa-e-awal/6 - man agarche tera khakam/6 - man agarche tera khakam.txt');
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
					data: {}
				}}
				calculateMetadata={async ({ props }) => {
					const data = await fetch('assets/6.txt');
					const json = await data.text();
					console.log(json);
					return {
						props: {
							...props,
							data: json,
						},
					};
				}}
				/>
		</>
	);
};
