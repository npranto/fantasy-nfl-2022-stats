const fs = require("fs");
const { resolve } = require("path");

const getQueryUrl = ({ position = "qb", weekNumber }) => {
  return `${process.env.FANTASY_STATS_BASE_URL}/${position}.php?week${weekNumber}&range=week`;
};

const writeToFile = (content, path) => {
  return new Promise((resolve) => {
    if (!content || typeof content !== "string" || typeof path !== "string") {
      resolve({
        error: "Unable to write content to file",
      });
    }
    const data = JSON.stringify(content, null, 2);
    fs.writeFile(path, data, (err) => {
      if (err) {
        resolve({
          error: err?.message,
        });
      }
      resolve(true);
    });
  });
};

module.exports = {
  getQueryUrl,
  writeToFile,
};
