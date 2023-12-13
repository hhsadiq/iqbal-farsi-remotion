import {Composition} from 'remotion';
import {MyComposition, myCompSchema} from './Composition';
import './style.css';

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
				}}
			/>
		</>
	);
};
