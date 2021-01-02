/**
 *
 * @param {string} path - eg notes/learning/javascript/objects.md
 */
const filePathToTags = (path) =>
  path
    .split("/")
    .filter((item, index, all) => index > 2 && index < all.length - 1)
    .filter((item) => item !== "notes")
    .map((tag) => tag.replace(" ", "-"))
    .join(" ");

/**
 *
 * @param {string} date - eg 2019-02-03 (YYYY-MM-DD)
 */
const dateToTiddlyWikiDate = (date) =>
  new Date(date).toISOString().replace(/\D/g, "");

function convertEntry(markdownEntry) {
  let date;

  try {
    date = dateToTiddlyWikiDate(markdownEntry.parsedEntry.data.date);
  } catch (error) {
    console.log(
      `error convert date: ${markdownEntry.parsedEntry.data.date} in entry`,
      markdownEntry
    );
    throw error;
  }

  const tiddlyEntry = {
    title: markdownEntry.parsedEntry.data.title,
    created: date,
    modified: date,
    text: markdownEntry.parsedEntry.content.trim(),
    tags: filePathToTags(markdownEntry.path),
    type: "text/x-markdown",
  };

  return tiddlyEntry;
}

const sortEntriesByCreated = (a, b) => {
  if (a.created > b.created) {
    return 1;
  } else if (b.created > a.created) {
    return -1;
  } else {
    return 0;
  }
};

module.exports = {
  convertEntry,
  dateToTiddlyWikiDate,
  filePathToTags,
  sortEntriesByCreated,
};
