'use strict';
import * as Kilometrikisa from 'kilometrikisa';
import * as tough from 'tough-cookie';

const handlers = {
  '/login': (username, password, callback) =>
    Kilometrikisa.login(username, password)
      .then((user) => callback(null, {
        statusCode: 200,
        body: JSON.stringify({ user: user }),
      }))
      .catch((err) => callback(err, null)),
  '/user': (username, password, callback) =>
    Kilometrikisa.login(username, password)
      .then((results) => Promise.all([
        Kilometrikisa.getUserResults(),
        Kilometrikisa.getContests()]))
      .then((data) => callback(null, {
        statusCode: 200,
        body: JSON.stringify({ results: data[0], contests: data[1] }),
      }))
      .catch((err) => callback(err, null)),
  '/team': (username, password, callback) =>
    Kilometrikisa.login(username, password)
      .then((user) => Kilometrikisa.fetchTeamResults())
      .then((results) => callback(null, {
        statusCode: 200,
        body: JSON.stringify({ results: results }),
      }))
      .catch((err) => callback(err, null)),
  '/updateLog': (username, password, callback) =>
    Kilometrikisa.login(username, password)
      .then((user) => Kilometrikisa.updateLog(event.queryStringParameters.kmDate, event.queryStringParameters.kmAmount))
      .then((results) => callback(null, {
        statusCode: 200,
        body: JSON.stringify({ results: results }),
      }))
      .catch((err) => callback(err, null)),
};

module.exports.kilometrikisa = (event, context, callback) => {
  const { username, password } = event.queryStringParameters;

  Kilometrikisa.setAxiosCookieJar(new tough.CookieJar());

  try {
    handlers[event.path](username, password, callback);
  } catch (e) {
    callback(new Error('[404] Not found'));
  }
};
