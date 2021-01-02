const {
  convertEntry,
  dateToTiddlyWikiDate,
  filePathToTags,
  sortEntriesByCreated,
} = require("./utils");

describe("filePathToTags", () => {
  it("creates expected tags", () => {
    const path = "../another-folder/notes/shopping/desks/standing-desks.md";
    const result = filePathToTags(path);
    expect(result).toBe("shopping desks");
  });
  it("does not create tags for files at the root level", () => {
    const path = "../another-folder/notes/random-meaningless-thing.md";
    const result = filePathToTags(path);
    expect(result).toBe("");
  });
});

describe("dateToTiddlyWikiDate", () => {
  it("transforms date as expected", () => {
    const date = "2020-06-06";
    const result = dateToTiddlyWikiDate(date);
    expect(result).toBe("20200606000000000");
  });
});

describe("sortEntriesByCreated", () => {
  const entry1 = {
    created: "20200101000000000",
  };

  const entry2 = {
    created: "20200101000000000",
  };

  const entry3 = {
    created: "20200102000000000",
  };

  it("handles ties", () => {
    expect(sortEntriesByCreated(entry1, entry2)).toBe(0);
  });

  it("sorts in descending order 1", () => {
    expect(sortEntriesByCreated(entry1, entry3)).toBe(-1);
  });

  it("sorts in descending order 2", () => {
    expect(sortEntriesByCreated(entry3, entry1)).toBe(1);
  });
});

describe("convert", () => {
  it("transforms a whole document", () => {
    const input = {
      path: "../another-folder/notes/plants/watering-2021-03-05.md",
      // other fields do not matter
      parsedEntry: {
        // these are created by the grey-matter npm module
        data: {
          date: "2021-03-05",
          title: "the title of the document",
        },
        content: "\ni am the body of the document\n",
      },
    };

    const result = convertEntry(input);
    expect(result).toEqual({
      title: "the title of the document",
      type: "text/x-markdown",
      created: "20210305000000000",
      modified: "20210305000000000",
      text: "i am the body of the document",
      tags: "plants",
    });
  });
});
