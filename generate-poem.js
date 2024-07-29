const { exec } = require('child_process');

const basePath = "poems/masnavi-pas-cheh-bayad/";
const poemName = "08-faqr-45-68";

function renderPoem(poemName, layout) {
  return new Promise((resolve, reject) => {
    const poemBasePath = `${basePath}${poemName}/`;
    const outputFileName = `upload/${poemName}-${layout}.mp4`;

    console.log("Setting REMOTION_POEM_BASE_PATH to:", poemBasePath, layout);

    const renderCommand = `REMOTION_POEM_BASE_PATH=${poemBasePath} REMOTION_LAYOUT=${layout} remotion render MyComp public/${poemBasePath}${outputFileName}`;
    console.log(`Executing: ${renderCommand}`);

    const child = exec(renderCommand, {
      env: {
        ...process.env,
        REMOTION_POEM_BASE_PATH: poemBasePath,
        REMOTION_LAYOUT: layout
      }
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

async function processPoems() {
  await renderPoem(poemName, 'vertical');
  console.log("Finished vertical layout");
  await renderPoem(poemName, 'horizontal');
  console.log("Finished horizontal layout");
}

processPoems();
