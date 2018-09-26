const fs = require("fs");
const swagger2Postman = require("./index.js");

var spec = fs.readFileSync("zuora-spec01.json", "utf8");
var postman = swagger2Postman.convert(spec);

fs.writeFileSync("zuora-postman01.json", JSON.stringify(postman.collection, null, 2), "utf8");
