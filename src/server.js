const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponse.js');
const jsonXMLHandler = require('./jsonXMLResponse.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const handleGet = (request, response, parsedUrl, contentType, queryParam) => {
  // route to correct method based on url
  switch (parsedUrl.pathname) {
    case '/style.css':
      htmlHandler.getCSS(request, response);
      break;

    case '/':
      htmlHandler.getIndex(request, response);
      break;

    case '/success':
      if (contentType === 'application/json') {
        jsonXMLHandler.success(request, response, 200);
      } else {
        jsonXMLHandler.successXML(request, response, 200);
      }
      break;

    case '/badRequest':
      if (contentType === 'application/json') {
        jsonXMLHandler.badRequest(request, response, 400, queryParam);
      } else {
        jsonXMLHandler.badRequestXML(request, response, 400, queryParam);
      }

      break;

    case '/unauthorized':

      if (contentType === 'application/json') {
        jsonXMLHandler.unauthorized(request, response, 401, queryParam);
      } else {
        jsonXMLHandler.unauthorizedXML(request, response, 401, queryParam);
      }

      break;

    case '/forbidden':
      if (contentType === 'application/json') {
        jsonXMLHandler.forbidden(request, response, 403);
      } else {
        jsonXMLHandler.forbiddenXML(request, response, 403);
      }

      break;

    case '/internal':

      if (contentType === 'application/json') {
        jsonXMLHandler.internal(request, response, 500);
      } else {
        jsonXMLHandler.internalXML(request, response, 500);
      }
      break;

    case '/notImplemented':

      if (contentType === 'application/json') {
        jsonXMLHandler.notImplemented(request, response, 501);
      } else {
        jsonXMLHandler.notImplementedXML(request, response, 501);
      }
      break;

    default:
      if (contentType === 'text/xml') {
        jsonXMLHandler.notFoundXML(request, response, 404);
      } else {
        jsonXMLHandler.notFound(request, response, 404);
      }
      break;
  }
};

const onRequest = (request, response) => {
  // parse the url using the url module
  // This will let us grab any section of the URL by name
  const parsedUrl = url.parse(request.url);

  // grab the 'accept' header for content type
  const dataType = request.headers.accept;

  // gets the query information from the parsed URL
  const params = query.parse(parsedUrl.query);

  // handles the get request with the prefered data type
  handleGet(request, response, parsedUrl, dataType, params);
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
