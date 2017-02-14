const repl = require("repl");
const R = require("ramda");

const lolcat = require("./formatted/lolcat.json")
const eng = require("./formatted/eng.json")
const en_bbe = require("./formatted/en_bbe.json")

const context = { 
  R, 
  lolcat, 
  eng, 
  en_bbe 
}

const replServer = repl.start({
  prompt: "lolcat repl > ",
});

Object.keys(context).forEach(k => replServer.context[k] = context[k])





//
