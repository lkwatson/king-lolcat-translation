
`mkdir tmp`
`cd OpenNMT`
-------

```
for f in ../data-parsing/prepped/*.txt ; do th ./tools/tokenize.lua < $f > $f.tok ; done
```

```
th preprocess.lua \
-train_src ../data-parsing/prepped/double_english.txt.tok \
-train_tgt ../data-parsing/prepped/double_lolcat.txt.tok \
-valid_src ../data-parsing/prepped/eng.txt.tok \
-valid_tgt ../data-parsing/prepped/lolcat.txt.tok \
-save_data ../tmp/eng_lolcat_prep
```

```
th train.lua \
-data ../tmp/eng_lolcat_prep-train.t7 \
-save_model ../tmp/omglolcatmodel \
-gpuid 1


```
