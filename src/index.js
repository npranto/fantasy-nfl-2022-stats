require("dotenv").config();
// console.log(process.env);

const puppeteer = require("puppeteer");
const path = require("path");
const { getQueryUrl, writeToFile } = require("./utils");

(async () => {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 1200,
    deviceScaleFactor: 1,
  });

  // retrieve QB stats (week 1 only)
  await page.goto(getQueryUrl({ position: "qb", weekNumber: 1 }), {
    waitUntil: "networkidle2",
  });
  const qbData = await page.evaluate(() => {
    const playerRows = [
      ...document.querySelectorAll("[role=main] table tbody tr"),
    ];
    const qbsInfo = playerRows.map((row) => {
      const playerName = row?.querySelector("a.player-name")?.innerText;
      const teamAbbr = row
        ?.querySelector(".player-label")
        ?.innerText?.split("(")[1]
        ?.split(")")[0];
      return { playerName, teamAbbr };
    });
    return qbsInfo;
  });
  await writeToFile(qbData, path.join(__dirname, "..", "data", "qbs.json"));

  // retrieve RB stats (week 1 only)
  await page.goto(getQueryUrl({ position: "rb", weekNumber: 1 }), {
    waitUntil: "networkidle2",
  });
  const rbData = await page.evaluate(() => {
    const playerRows = [
      ...document.querySelectorAll("[role=main] table tbody tr"),
    ];
    const rbsInfo = playerRows.map((row) => {
      const playerName = row?.querySelector("a.player-name")?.innerText;
      const teamAbbr = row
        ?.querySelector(".player-label")
        ?.innerText?.split("(")[1]
        ?.split(")")[0];
      return { playerName, teamAbbr };
    });
    return rbsInfo;
  });
  await writeToFile(rbData, path.join(__dirname, "..", "data", "rbs.json"));

  // console.log(JSON.stringify({ qbData, rbData }, null, 2));

  await browser.close();
})();
