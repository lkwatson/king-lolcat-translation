const fs = require("fs");
const R = require("ramda");

const lolcat = require("./cleaned/lolcat.clean.json")

/* Using two english translations as an experiment */
const eng = require("./cleaned/eng.clean.json")
const en_bbe = require("./cleaned/en_bbe.clean.json")

/*
{
  [book]: {
    [chapter]: {
      [verse]: "string"
    }
  }
}
*/

function writeJSON(dest, input) {
  fs.writeFileSync(dest, JSON.stringify(input, null, 4))
}

function formatLolcat(input, max=Infinity) {
  return R.pipe(
    R.slice(0, max),
    R.groupBy(R.prop("book")),
    R.mapObjIndexed(R.pipe(
      R.indexBy(R.prop("chapter")),
      R.mapObjIndexed(R.prop("content"))
    ))
  )(input)
}

function formatEng(input, max=Infinity) {
  return R.pipe(
    R.path(['usfx', 'book']),
    R.slice(0, max),
    R.indexBy(R.prop("h")),
    R.mapObjIndexed(R.pipe(
      R.prop("c"),
      R.slice(0, max),
      R.indexBy(R.prop("@id")),
      R.mapObjIndexed(R.pipe(
        R.prop("v"),
        R.map(o => [o["@id"], o["#text"]]),
        R.fromPairs
      ))
    ))  
  )(input)
}

/* I can't believe I could't find a better way to do this. */
function unescapeAscii(text) {
  return text.replace(/&#x(\d+);/g, (m, dec) =>
    String.fromCharCode(Number(`0x${dec}`))
  );
}

function formatEn_bbe(input, max=Infinity) {
  return R.pipe(
    R.slice(0, max),
    R.indexBy(R.prop("book")),
    R.map(R.pipe(
      R.prop("chapters"),
      R.slice(0, max),
      R.mergeAll,
      R.map(R.map(unescapeAscii))
    ))
  )(input)
}



writeJSON("formatted/lolcat.json", formatLolcat(lolcat))
writeJSON("formatted/eng.json", formatEng(eng))
writeJSON("formatted/en_bbe.json", formatEn_bbe(en_bbe))








//_
