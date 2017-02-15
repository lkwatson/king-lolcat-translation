const fs = require("fs");
const R = require("ramda");

const merged = require("./prepped/merged.json");
const texts = makeTexts(merged);


// Clean newlines, punctionation, etc
function cleanStr(str) {
  return str
    .replace(/[\n\"\'\“\”]/g, " ")
    .replace(/([^a-zA-Z0-9\s])/g, " $1 ")
}

function makeTexts(mergedInput, max=Infinity) {
  return R.pipe(
    R.slice(1, max),
    R.filter(R.all(v => !!v)),
    R.map(R.map(cleanStr)),
    R.transpose,     // Turns into [lolcat[], eng[], eng_bbe[]]
    R.map(R.join("\n"))
  )(mergedInput);
}


fs.writeFileSync("prepped/lolcat.txt", texts[0]);
fs.writeFileSync("prepped/eng.txt", texts[1]);
fs.writeFileSync("prepped/eng_bbe.txt", texts[2]);

fs.writeFileSync("prepped/double_lolcat.txt", `${texts[0]}\n${texts[0]}` );
fs.writeFileSync("prepped/double_english.txt", `${texts[1]}\n${texts[2]}` );







//_
