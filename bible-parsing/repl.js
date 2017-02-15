const repl = require("repl");
const R = require("ramda");

const context = { 
  R, 
  // lolcat: require("./formatted/lolcat.json"),
  // eng: require("./formatted/eng.json"),
  // en_bbe: require("./formatted/en_bbe.json"),
  merged: require("./prepped/merged.json")
}

const replServer = repl.start({
  prompt: "lolcat repl > ",
});

Object.keys(context).forEach(k => replServer.context[k] = context[k])





//
