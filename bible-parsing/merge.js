const fs = require("fs");
const R = require("ramda");

const lolcat = require("./formatted/lolcat.json")
const eng = require("./formatted/eng.json")
const en_bbe = require("./formatted/en_bbe.json")

const base_translation = sliceFn(lolcat);

function writeJSON(dest, input) {
  fs.writeFileSync(dest, JSON.stringify(input, null, 4))
}

function sliceFn(input, max=Infinity) {
  return R.pick(R.slice(0, max, R.keys(input)))(input)
}

const lolMergeFn = R.mapObjIndexed((chapters, bId) => 
  R.mapObjIndexed((verses, chId) =>
    R.mapObjIndexed((text, vId) => 
      [
        text,                             // Lolcat
        R.path([bId, chId, vId], eng),    // Eng
        R.path([bId, chId, vId], en_bbe)  // En_bbe
      ]
    )(verses)
  )(chapters)
)

const merged = R.pipe(
  lolMergeFn,
  R.values,
  R.chain(R.pipe(
    R.values,
    R.chain(R.values)
  ))
)(base_translation)


writeJSON("prepped/merged.json", merged);
