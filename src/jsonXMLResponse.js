const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondXML = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'text/xml',
  });

  let responseXML = '<response>';
  if (object.id) {
    responseXML = `${responseXML} <id>${object.id}</id>`;
  }
  responseXML = `${responseXML} <message>${object.message}</message>`;
  responseXML = `${responseXML} </response>`;

  response.write(responseXML);
  response.end();
};

const success = (request, response) => {
  const responseJSON = {
    message: 'This is a successful response',
    id: 'success',
  };
  respondJSON(request, response, 200, responseJSON);
};

const badRequest = (request, response, params) => {
  const responseJSON = {
    message: 'This request has the required parameters',
    id: 'badRequest',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing valid query parameter set to true';
    responseJSON.id = 'badRequest';
    return respondJSON(request, response, 400, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const unauthorized = (request, response, params) => {
  const responseJSON = {
    message: 'You have successfully viewed the content',
    id: 'unauthorized',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing loggedIn query parameter set to true';
    responseJSON.id = 'unauthorized';
    return respondJSON(request, response, 401, responseJSON);
  }
  return respondJSON(request, response, 200, responseJSON);
};

const forbidden = (request, response) => {
  const responseJSON = {
    message: 'You do not have access to this content',
    id: 'forbidden',
  };
  respondJSON(request, response, 403, responseJSON);
};

const internal = (request, response) => {
  const responseJSON = {
    message: 'Internal Server Error. Something went wrong',
    id: 'internalError',
  };
  respondJSON(request, response, 500, responseJSON);
};

const notImplemented = (request, response) => {
  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };
  respondJSON(request, response, 501, responseJSON);
};

const notFound = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found',
    id: 'notFound',
  };
  respondJSON(request, response, 404, responseJSON);
};

const successXML = (request, response, status) => respondXML(request, response, status, {
  message: 'This is a successful response',
});


const badRequestXML = (request, response, status, params) => {
  const responseJSON = {
    id: 1,
    message: 1,
  };
  if (!params.valid || params.valid !== 'true') {
    // set our error message
    responseJSON.message = 'Missing valid query parameter set to true';
    // give the error a consistent id
    responseJSON.id = 'badRequest';
    // return our xml with a 400 bad request code
    return respondXML(request, response, status, responseJSON);
  }

  // if the parameter is here, send xml with a success status code
  return respondJSON(request, response, 200, responseJSON);
};


const unauthorizedXML = (request, response, status, params) => {
  const responseJSON = {
    id: 1,
    message: 1,
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    // set our error message
    responseJSON.message = 'Missing loggedIn query parameter set to yes';
    // give the error a consistent id
    responseJSON.id = 'unauthorized';
    // return our xml with a 400 bad request code
    return respondXML(request, response, status, responseJSON);
  }

  // if the parameter is here, send xml with a success status code
  return respondXML(request, response, 200, responseJSON);
};


const forbiddenXML = (request, response, status) => respondXML(request, response, status, {
  id: 'forbidden',
  message: 'You do not have access to this content',
});


const internalXML = (request, response, status) => respondXML(request, response, status, {
  id: 'internalError',
  message: 'Internal Server Error. Something went wrong',
});


const notImplementedXML = (request, response, status) => respondXML(request, response, status, {
  id: 'notImplemented',
  message: 'A get request for this page has not been implemented yet. Check again later for updated content',
});


const notFoundXML = (request, response, status) => respondXML(request, response, status, {
  id: 'notFound',
  message: 'The page you were looking for was not found',
});


module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
  successXML,
  badRequestXML,
  unauthorizedXML,
  forbiddenXML,
  internalXML,
  notImplementedXML,
  notFoundXML,

};
