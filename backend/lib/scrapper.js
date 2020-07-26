import axios from "axios";
import cheerio from "cheerio";
import db from "./db";
async function getHTML(url) {
  const { data: html } = await axios.get(url);
  return html;
}

export async function getWorldTotal(html) {}

export async function getWorldInformation() {
  const html = await getHTML("https://news.google.com/covid19/map");
  const $ = cheerio.load(html);
  const c = $(".qs41qe .UvMayb");
  const r = $(".gZvxhb .UvMayb");
  const d = $(".ckqIZ .UvMayb");

  const data = { confirmed: c.text(), recovered: r.text(), deaths: d.text() };
  return data;
}

export async function getTotalConfirmed(country) {
  const html = await getHTML(`https://news.google.com/covid19/map?${country}`);
  const $ = cheerio.load(html);
  const div = $(".qs41qe .UvMayb");
  return div.html();
}

export async function getTotalRecovered(country) {
  const html = await getHTML(`https://news.google.com/covid19/map?${country}`);
  const $ = cheerio.load(html);
  const div = $(".gZvxhb .UvMayb");
  return div.html();
}

export async function getTotalDeaths(country) {
  const html = await getHTML(`https://news.google.com/covid19/map?${country}`);
  const $ = cheerio.load(html);
  const div = $(".ckqIZ .UvMayb");
  return div.html();
}

export async function getCountryData(country) {
  const html = await getHTML(`https://news.google.com/covid19/map`);

  const $ = cheerio.load(html);
  const element = $(
    "tr.sgXwHf:nth-child(133) > th:nth-child(1) > div:nth-child(1) > div:nth-child(2)"
  );
  console.log(element);
  // const div = $("tr.wdLSAe");
  // div.each((index, element) => {
  //   console.log($(element).text);

  //   //   let name = $($(element).find("th")[0]).text();
  //   //   let confirmed = $($(element).find("td")[0]).text();
  //   //   let recovered = $($(element).find("td")[3]).text();
  //   //   let deaths = $($(element).find("td")[4]).text();

  //   //   db.get("searched")
  //   //     .push({
  //   //       name,
  //   //       confirmed,
  //   //       recovered,
  //   //       deaths,
  //   //     })
  //   //     .write();
  // });
}

export async function runCron() {
  const [c, r, d] = await Promise.all([
    getTotalConfirmed(),
    getTotalRecovered(),
    getTotalDeaths(),
  ]);

  db.get("worldwide").pop().write();

  db.get("worldwide")
    .push({
      date: Date.now(),
      confirmed: c,
      recovered: r,
      deaths: d,
    })
    .write();
  console.log("Done!");
}
