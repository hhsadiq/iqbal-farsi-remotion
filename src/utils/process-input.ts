import {staticFile} from 'remotion';

export async function processPoemDocument(path:string) {
  const data = await fetch(staticFile(path));
  const inputText = await data.text();

  const bookNameMatch = inputText.match(/#BookName:\s*([\s\S]*?)\n/);
  const poemNameMatch = inputText.match(/#PoemName:\s*([\s\S]*?)\n/);
  const poemTypeMatch = inputText.match(/#PoemType:\s*([\s\S]*?)\n/);

  const bookName = bookNameMatch ? bookNameMatch[1].trim() : "Book Name Not Found";
  const poemName = poemNameMatch ? poemNameMatch[1].trim() : "Poem Name Not Found";
  const poemType = poemTypeMatch ? poemTypeMatch[1].trim() : "Poem Type Not Found";

  const coupletMatches = inputText.split('#v').slice(1);
  const couplets = coupletMatches.map((coupletMatch, index) => {
    const lines = coupletMatch.trim().split('\n').map(line => line.trim());
    const [startTimeStr, endTimeStr] = lines[0].split(/\s+/); // Split by whitespace or tab
    const startTime = parseFloat(startTimeStr);
    const endTime = parseFloat(endTimeStr);
    const persian = lines[1] + "\n" + lines[2];
    const urdu = lines[3];
    const english = lines[4];

    return {
        number: index + 1, // Calculate the couplet number based on the index
        startTime,
        endTime,
        persian,
        urdu,
        english
    };
});

  const poemData = { bookName, poemName, poemType, couplets };
  return poemData;
}