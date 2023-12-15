export function processPoemDocument(inputText:string) {

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
    if (lines.length >= 4) {
      const persian = lines[0] + "\n" + lines[1];
      const urdu = lines[2];
      const english = lines[3];

      couplets.push({
        number: i + 1,
        persian: persian,
        urdu: urdu,
        english: english
      });
    }
  }

  const poemData = { bookName, poemName, poemType, couplets };
  return poemData;
}