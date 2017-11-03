'use strict';
import * as Kilometrikisa from 'kilometrikisa';
import * as tough from 'tough-cookie';

module.exports.kilometrikisa = (event, context, callback) => {
  const { username, password } = event.queryStringParameters;

  console.log(event);
  console.log(context);

  Kilometrikisa.setAxiosCookieJar(new tough.CookieJar());

  switch (event.path) {
    case '/login':
      Kilometrikisa.login(username, password)
        .then((user) => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ user: user }),
        }))
        .catch((err) => callback(err, null));
      break;
    case '/user':
      Kilometrikisa.login(username, password)
        .then((results) => Promise.all([
          Kilometrikisa.getUserResults(),
          Kilometrikisa.getContests()]))
        .then((data) => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ results: data[0], contests: data[1] }),
        }))
        .catch((err) => callback(err, null));
      break;
    case '/team':
      Kilometrikisa.login(username, password)
        .then((user) => Kilometrikisa.fetchTeamResults())
        .then((results) => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ results: results }),
        }))
        .catch((err) => callback(err, null));
      break;
    case '/updateLog':
      Kilometrikisa.login(username, password)
        .then((user) => Kilometrikisa.updateLog(event.queryStringParameters.kmDate, event.queryStringParameters.kmAmount))
        .then((results) => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ results: results }),
        }))
        .catch((err) => callback(err, null));
      break;
    default:
      callback(new Error('[404] Not found'));
  }
};
