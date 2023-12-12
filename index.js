const CLI = require("./lib/cli");
const db = require("./config/connection");

db.connect(function (err) {
  if (err) throw err;

  CLI();
});
