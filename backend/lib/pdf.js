const crawler = require("crawler-request");

crawler(
  "https://www.who.int/docs/default-source/wha-70-and-phe/20200721-covid-19-sitrep-183.pdf"
).then(function (response) {
  // handle response
  console.log(response.text.lenght);
});
