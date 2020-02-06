'use strict';
const recognizeService = require('./recognize-service');

module.exports.execute = async event => {
  await recognizeService.recognize(event);
  return {
    message: "Tag extraidas com Sucesso.",
    event
  };
};
