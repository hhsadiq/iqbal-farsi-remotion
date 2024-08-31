const {exec} = require('child_process');

const basePath = 'poems/payam-e-mashriq/lala-e-toor/';
const startRubai = 72; // Start of the range
const endRubai = 90; // End of the range

function renderRubai(rubaiNumber, layout) {
	return new Promise((resolve, reject) => {
		const poemBasePath = `${basePath}rubai-${rubaiNumber}/`;
		const outputFileName = `upload/rubai-${rubaiNumber}-${layout}.mp4`;

		console.log('Setting REMOTION_POEM_BASE_PATH to:', poemBasePath, layout);

		const renderCommand = `REMOTION_POEM_BASE_PATH=${poemBasePath} REMOTION_LAYOUT=${layout} remotion render MyComp public/${poemBasePath}${outputFileName}`;
		console.log(`Executing: ${renderCommand}`);

		const child = exec(renderCommand, {
			env: {
				...process.env,
				REMOTION_POEM_BASE_PATH: poemBasePath,
				REMOTION_LAYOUT: layout,
			},
		});

		child.stdout.on('data', (data) => {
			console.log(data);
		});

		child.stderr.on('data', (data) => {
			console.error(data);
		});

		child.on('exit', (code) => {
			console.log(`Child process exited with code ${code}`);
			resolve();
		});

		child.on('error', (error) => {
			console.error(`Error: ${error.message}`);
			reject(error);
		});
	});
}

async function processRubais() {
	for (let i = startRubai; i <= endRubai; i++) {
		await renderRubai(i, 'vertical');
		console.log('Finished vertical layout');
		await renderRubai(i, 'horizontal');
		console.log('Finished horizontal layout');
	}
}

processRubais();
