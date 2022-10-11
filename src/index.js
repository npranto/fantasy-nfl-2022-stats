require("dotenv").config();
// console.log(process.env);

const puppeteer = require("puppeteer");
const getQueryUrl = require("./utils");

(async () => {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1200,
    height: 1200,
    deviceScaleFactor: 1,
  });
  await page.goto(getQueryUrl({ position: "qb", weekNumber: 1 }), {
    waitUntil: "networkidle2",
  });
  // await page.screenshot({path: 'example.png'});

  const fantasyData = await page.evaluate(() => {
    const playerRows = [
      ...document.querySelectorAll("[role=main] table tbody tr"),
    ];

    const playersInfo = playerRows.map((row) => {
      const playerName = row?.querySelector("a.player-name")?.innerText;
      const teamAbbr = row
        ?.querySelector(".player-label")
        ?.innerText?.split("(")[1]
        ?.split(")")[0];
      return { playerName, teamAbbr };
    });

    return {
      playersInfo,
    };
  });

  console.log(JSON.stringify({ fantasyData }, null, 2));

  // await browser.close();
})();
