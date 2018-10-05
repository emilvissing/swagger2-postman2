const fs = require("fs");
const refParser = require("json-schema-ref-parser");
const swagger2Postman = require("./index.js");


var specURL = "https://www.zuora.com/wp-content/themes/zuora/yaml/swagger.yaml";

console.log(`Downloading Swagger spec...`);
refParser.dereference(specURL, {}, (err, spec) => {
  
  if (err) {
    console.error("ERROR: Cannot dereference Swagger spec");
    return;
  }
  
  var specVersion = spec.info.version;
  console.log(`Swagger spec version is ${specVersion}`);
  
  console.log("Converting Swagger spec to a Postman collection...");
  delete spec.definitions;
  var postman = swagger2Postman.convert(spec);
  
  var postmanFilename = `zuora-postman-${specVersion}.json`;
  var postmanJSON = JSON.stringify(postman.collection, null, 2);
  fs.writeFileSync(postmanFilename, postmanJSON, "utf8");
  console.log(`Saved Postman collection as ${postmanFilename}`);
  
});
