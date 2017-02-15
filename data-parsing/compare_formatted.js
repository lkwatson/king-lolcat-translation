const fs = require("fs");
const R = require("ramda");

const lolcat = require("./formatted/lolcat.json")
const eng = require("./formatted/eng.json")
const en_bbe = require("./formatted/en_bbe.json")

const lolKeys = R.keys(lolcat);
const engKeys = R.keys(eng);
const en_bbeKeys = R.keys(en_bbe);


console.log("LENGTH: ", lolKeys.length, engKeys.length, en_bbeKeys.length)

const onlyLolcat = R.difference(
  lolKeys,
  R.union(engKeys, en_bbeKeys)
)

const onlyEng = R.difference(
  engKeys,
  R.union(lolKeys, en_bbeKeys)
)

const onlyEn_bbe = R.difference(
  en_bbeKeys,
  R.union(engKeys, en_bbeKeys)
)

console.log("\n --------  LOLCAT  -------- \n", onlyLolcat)
console.log("\n --------  ENG  -------- \n", onlyEng.length)
console.log("\n --------  EN_BBE  -------- \n", onlyEn_bbe)



//_
