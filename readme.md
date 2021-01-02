# Markdown + Frontmatter to Tiddly Wiki converter

## What is this for?

If you've got a bunch files like this:

```md
---
title: 2018 Travel Plans
date: 2018-03-22
---

## Where to go?

somewhere else!

#### Why?

- because it is fun
- because you can
```

arranged in a folder structure like this:

```
notes
|_ content
  |_ travel
    |_ 2018-travel-plans.md
  |_  shopping
    |_ pants-you-want.md
    |_ desks
        |_  standing-desks.md
```

this tool will help you convert the entries into a JSON file that can be imported into [TiddlyWiki](https://tiddlywiki.com/)

## How do I use it?

1. clone this repo into a sibbling folder of the files you want to convert and 
2. run `yarn` in the terminal to download dependencies
3. if you files are sitting in at the relative path `.../notes/content` (which they probably aren't) edit `index.js` to include the path to your files to convert
   
    ```js
    const mdPath = "../notes/content/**/*.md";
    ```

4. update `utils.js`  `filePathToTags` function to generate tags if you want (with help from the tests in `utils.test.js` if you are into that kind of thing)

5. run this script with nodejs
   
    ```js
    node index.js
    ```

    if successful, the output will be in `converted-entries.json` in this folder

6. if the output looks good, import it in to TiddlyWiki and enjoy your migrated content