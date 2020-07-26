const cron = require("node-cron");
const { runCron } = require("./scrapper");

cron.schedule("* * * * *", () => {
  console.log(`Running the Cron time: ${new Date().getHours()}`);
  runCron();
});
