'use strict';
const greyscaleService = require('./greyscale-service');

module.exports.execute = async event => {
  await greyscaleService.filter(event);
  return {
    message: "Filter aplicado.",
    event
  };
};
