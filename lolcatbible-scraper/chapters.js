const fs = require("fs");
const R = require("ramda");
const rp = require('request-promise');
const promiseLimit = require('promise-limit');
const cheerio = require("cheerio")

const book_urls = require("./data/books.json");
const limit = promiseLimit(6);

const request = uri =>  rp(({ uri, transform(body) { return cheerio.load(body) } }));

function errFn(type) {
  return e => {
    console.error("ERROR", e.message);
    return {
      error: type,
      message: e.message
    }
  }
}

function parsePage(url) {
  return $ => {
    let title = $("#firstHeading").text();
    let links = $("#bodyContent > *:not(.infobox):not(.toc) li a")
      .toArray()
      .map(el => $(el))
      .map($el => `http://lolcatbible.com${$el.attr("href")}`)
      
    console.log("GOT: ", title)
    return {
      title,
      only_page: R.isEmpty(links),
      chapters: R.isEmpty(links) ? [url] : links
    }
  }
}

limit.map(book_urls, url => request(url)
  .then(R.tryCatch(parsePage(url), errFn("PARSE")))
  .catch(errFn("URL"))
)
.then(allChapters => {
  fs.writeFileSync("data/chapters.json", JSON.stringify(allChapters, null, 4));
  console.log("Done!")
})
