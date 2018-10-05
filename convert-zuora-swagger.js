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
  
  // Prepare the spec
  delete spec.definitions;
  spec.info.title = `Zuora REST API (${specVersion})`;
  spec.info.description = "See https://www.zuora.com/developer/api-reference/ for the latest REST API documentation.";
  
  console.log("Converting Swagger spec to a Postman collection...");
  var postman = swagger2Postman.convert(spec);
  
  // Save the Postman collection
  var postmanFilename = `zuora-postman-${specVersion}.json`;
  var postmanJSON = JSON.stringify(postman.collection, null, 2);
  fs.writeFileSync(postmanFilename, postmanJSON, "utf8");
  console.log(`Saved Postman collection as ${postmanFilename}`);
  
});
