# Overview

This repository demonstrates how to adapt [swagger2-postman2](https://github.com/postmanlabs/swagger2-postman2) to generate a Postman collection for the [Zuora REST API](https://www.zuora.com/developer/api-reference/).

The converter in this repository is provided for reference purposes only. It is not supported by Zuora.

Visit [Zuora Community](https://community.zuora.com/t5/Developers/Postman-collection-for-the-Zuora-REST-API/gpm-p/25600) to learn more about using Postman to test the Zuora REST API.

# Usage

1. Clone this repository:

  ```
  git clone https://github.com/davidwzuora/swagger2-postman2.git; cd swagger2-postman2
  ```

2. Install the converter using [npm](https://www.npmjs.com/):

  ```
  npm install
  ```

3. Run the converter:

  ```
  node convert-zuora-swagger.js
  ```

  The converter generates a Postman collection for the Zuora REST API. The collection is in a file called *zuora-postman-\<date>.json*, where *\<date>* corresponds to the latest version of the Zuora Swagger specification.

4. To import the collection in Postman, navigate to **File > Import**, then choose the JSON file that the converter generated.

# Adaptations

This repository includes the following adaptations to [swagger2-postman2](https://github.com/postmanlabs/swagger2-postman2):

* The converter automatically downloads the latest version of the Zuora Swagger specification.

* The Postman collection leverages Postman support for bearer token authentication. The requests in the collection do not contain `Authorization` headers. Instead, Postman automatically sets the `Authorization` header when you send a request.

  To use this feature, first use the "Generate an OAuth token" request. Send your Client ID and Client Secret in the body. A test script then extracts your bearer token from the response and sets an environment variable called `bearer_token`. Postman inserts the value of `bearer_token` into the `Authorization` header when you send other requests.

* The Postman collection contains a variable called `zuora_host`. Each request in the collection has `zuora_host` in the URL. The default value of `zuora_host` is `rest.apisandbox.zuora.com`. You can override the default value by setting an environment variable called `zuora_host`.

* JSON request bodies in the Postman collection default to the request samples in the [Zuora API Reference](https://www.zuora.com/developer/api-reference/).

* Parameters in the Postman collection are only enabled if they are required. This applies to query parameters, request headers, and form parameters.

* If a parameter in the Postman collection must be set to a specific value, the parameter defaults to the correct value. (For instance, the `grant_type` form parameter in "Generate an OAuth token" must be set to `client_credentials`.)

* The converter does not produce duplicate `Content-Type` headers in the Postman collection.
