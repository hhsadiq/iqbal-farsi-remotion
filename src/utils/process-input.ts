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
  const totalCouplets = coupletMatches.length;
  const couplets = [];

  for (let i = 0; i < totalCouplets; i++) {
    const lines = coupletMatches[i].trim().split('\n').map(line => line.trim());
    // Extract start time (first line)
    const startTime = parseFloat(lines[0]);
    if (lines.length >= 5) {
      const persian = lines[1] + "\n" + lines[2];
      const urdu = lines[3];
      const english = lines[4];

      couplets.push({
        number: i + 1,
        startTime: startTime,
        persian: persian,
        urdu: urdu,
        english: english
      });
    }
  }

  const poemData = { bookName, poemName, poemType, couplets };
  return poemData;
}