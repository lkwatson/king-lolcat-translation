const fs = require("fs");
const R = require("ramda");
const rp = require('request-promise');
const promiseLimit = require('promise-limit');
const cheerio = require("cheerio")


/*  Download all the pages  */
const chapters = require("./data/chapters.json");
const makeUrls = (input, max=Infinity) => R.pipe(
  R.slice(0, max),
  R.chain(R.pipe(
    R.prop("chapters"),
    R.slice(0, max)
  ))
)(input)

const urls = makeUrls(chapters);


const limit = promiseLimit(6);
const request = uri => rp(({ uri, transform(body) { return cheerio.load(body) } }));
const errFn = errType => e => {
  console.error("ERROR", e.message);
  return { errType, message: e.message }
}


function parsePage(url) {
  return $ => {
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
}


limit.map(urls, url => request(url)
  .then(R.tryCatch(parsePage(url), errFn("PARSE")))
  .catch(errFn("URL"))
)
.then(allChapters => {
  fs.writeFileSync("data/pages.json", JSON.stringify(allChapters, null, 4));
  console.log("Done!")
})



// _
