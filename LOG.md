

### 2-14-17
_JW_

At the end of the hackathon we found some issues with our concat texts, so I've been poking through to fix everything up.

The biggest find so far is the lolcat dump is missing a lot of books. Looks like this is from using the API to get the pages. I'm not sure how much is missing, but I'm totally gonna have to re-scrape. Probably this time I'll get the chapters from the list in browser (there's 66 of them), then just do a basic crawling job of getting all the page urls from those pages. 

The en_bbe dataset has 66 books, same as the chapter list on lolcat bible. However, looks like the `eng` dataset has an additional 17 books. But they all seem to match besides that, including using the chapter names as keys. I'll re-run when I scrape the new lolcat dump.
