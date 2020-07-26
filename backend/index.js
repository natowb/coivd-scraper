import express from "express";
import db from "./lib/db";
import "./lib/cron";
import {
  getTotalConfirmed,
  getTotalRecovered,
  getTotalDeaths,
  getWorldInformation,
} from "./lib/scrapper";

//db setup

const app = express();

app.get("/scrape", async (req, res, next) => {
  console.log("Scrapping");
  const [c, r, d] = await Promise.all([
    getTotalConfirmed(),
    getTotalRecovered(),
    getTotalDeaths(),
  ]);
  res.json({ c, r, d });
});

app.get("/data/:country", async (req, res, next) => {
  //get data

  console.log(req.params.country);
  // const test = await getTotalConfirmed(req.params.country);
  // console.log(test);

  const data = await getWorldInformation();
  console.log(data.confirmed);

  // console.log(req.params);
  const worldwide = db.value();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(worldwide);
  //respond json
});
app.get("/data/", async (req, res, next) => {
  //get data

  console.log("Scrapping");
  const worldwide = db.value();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json(worldwide);
  //respond json
});

app.listen(2093, () => {
  console.log(
    `example app running on port http://localhost:2093 started at ${new Date().getHours()}`
  );
});
