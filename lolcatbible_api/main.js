const fs = require("fs");
const R = require("ramda");

const rp = require('request-promise');
const promiseLimit = require('promise-limit');
const cheerio = require("cheerio")

// /*  Download the Old Testement page ids  */
// const old_testament = "http://lolcatbible.com/api.php?action=query&format=json&list=categorymembers&cmlimit=500&cmtitle=Category:Old_Testament"
// rp(old_testament).then(json => {
//   let pages = JSON.parse(json).query.categorymembers
//     .filter(o => o.title.match(/.*\d$/))
//     .map(o => o.title);
// 
//   fs.writeFileSync("old_testament.json", JSON.stringify(pages, null, 4));
//   console.log('Done!');
// })


// /*  Download the New Testement page ids  */
// const new_testament = "http://lolcatbible.com/api.php?action=query&format=json&list=categorymembers&cmlimit=500&cmtitle=Category:New_Testament"
// rp(new_testament).then(json => {
//   let pages = JSON.parse(json).query.categorymembers
//     .filter(o => o.title.match(/.*\d$/))
//     .map(o => o.title);
//     
//   fs.writeFileSync("new_testament.json", JSON.stringify(pages, null, 4));
//   console.log('Done!');
// })


/*  Download all the pages  */
const old_testament = require("./old_testament.json");
const new_testament = require("./new_testament.json");

const limit = promiseLimit(6);
const titles = old_testament.concat(new_testament);
const urls = titles.map(t => `http://lolcatbible.com/index.php?title=${t.replace(/ /g, '_')}`)
const transform = uri => ({ uri, transform(body) { return cheerio.load(body) } })

function errFn(type) {
  return e => {
    console.error("ERROR", e.message);
    return {
      error: type,
      message: e.message
    }
  }
}

function parsePage($) {
  let title = $("#firstHeading").text();
  console.log("GOT: ", title)
  return {
    title,
    book: title.replace(/(.*?) \d+$/, "$1"),
    chapter: title.replace(/.*? (\d+)$/, "$1"),
    content: R.fromPairs($(".versetext > span")
      .toArray()
      .map(el => $(el))
      .map($el => [$el.attr("id"), $el.text().replace(/^\d+ /, "")]))
  }
}

limit.map(urls, url => rp(transform(url))
  .then(R.tryCatch(parsePage, errFn("PARSE")))
  .catch(errFn("URL"))
)
.then(allChapters => {
  fs.writeFileSync("lolcatbible.json", JSON.stringify(allChapters, null, 4));
  console.log("Done!")
})



// _
