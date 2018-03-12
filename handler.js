'use strict';
import 'babel-polyfill';
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
  '/contests': (username, password, callback) =>
    Kilometrikisa.login(username, password)
      .then(() => Kilometrikisa.getContests())
      .then((contests) => callback(null, {
        statusCode: 200,
        body: JSON.stringify({ contests: contests }),
      }))
      .catch((err) => callback(err, null)),
  '/results': (username, password, callback, params) =>
    Kilometrikisa.login(username, password)
      .then((results) => Kilometrikisa.getUserResults(
          params.contestId,
          params.year))
      .then((results) => callback(null, {
        statusCode: 200,
        body: JSON.stringify({ results: results }),
      }))
      .catch((err) => callback(err, null)),
  '/team': (username, password, callback, params) =>
    Kilometrikisa.login(username, password)
      .then((user) => Kilometrikisa.fetchTeamResults({ link: params.teamUrl }))
      .then((results) => callback(null, {
        statusCode: 200,
        body: JSON.stringify({ results: results }),
      }))
      .catch((err) => callback(err, null)),
  '/updateLog': (username, password, callback, params) =>
    Kilometrikisa.login(username, password)
      .then((user) =>
        Kilometrikisa.updateLog(
              params.contestId,
              params.kmDate,
              params.kmAmount))
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
    console.log(event);
    handlers[event.path](username, password, callback, event.queryStringParameters);
  } catch (e) {
    callback(new Error('[404] Not found'));
  }
};
