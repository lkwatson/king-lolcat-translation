# The King Lolcat Translation Project 

Currently in progress. The network is being trained.

## Inspiration

We originally started with the idea of taking an author's works, and translating any arbitrary message into an author's tone and voice. 

## What it does

What it does now is translate between normal English, King James English, and Lolcat speak using OpenNMT

## How we built it

We used [OpenNMT](http://opennmt.net/), feeding each corpus of the NIV Bible, the King James Bible, and the Lolcat Bible to train the network.

## Challenges we ran into

The original idea of using an author's works wasn't compatible with the form of translation that OpenNMT is based on. We needed a sentence-to-sentence comparison between the "languages" for the network to be properly trained, hence why we chose the Bible as a corpus.

## Accomplishments that we're proud of

Parsing the sheer amount of data, and cleaning it such that it was usable by OpenNMT.

## What we learned

How to more efficiently parse large text files. How to train OpenNMT.

## What's next for King Lolcat Translator 

Translating books in Project Gutenberg into Lolcat speak, and create a library of translated books.
