'use strict';
const thumbnailService = require('./thumbnail-service');

module.exports.execute = async event => {
  await thumbnailService.thumbnail(event);
  return {
    message: "Thumbnail criado.",
    event
  };
};

