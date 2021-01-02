const fs = require("fs").promises;
const glob = require("glob");
const matter = require("gray-matter");

const { convertEntry, sortEntriesByCreated } = require("./utils");

async function main() {
  const files = glob
    .sync("../notes/content/**/*.md")
    .filter((path) => !path.includes("properties"));

  const entries = await Promise.all(
    files.map((path) =>
      fs.readFile(path, { encoding: "utf8" }).then((content) => ({
        path,
        content,
      }))
    )
  );

  const parsedEntries = entries
    .map((entry) => {
      try {
        return {
          ...entry,
          parsedEntry: matter(entry.content),
        };
      } catch (error) {
        console.error("error parsing file:", entry, error);
        return { ...entry, parsedEntry: null };
      }
    })
    .filter((entry) => entry.parsedEntry);

  const convertedEntries = parsedEntries
    .map(convertEntry)
    .sort(sortEntriesByCreated);

  await fs.writeFile(
    "./converted-entries.json",
    JSON.stringify(convertedEntries, null, 2)
  );
}

main();
