'use strict';
const s3Service = require('./s3-service')
const dynamoDBService = require('./dynamodb-service')

module.exports.execute = async event => {

  const result = await s3Service.upload(event.body)
  await dynamoDBService.put(result)

  return {
    statusCode: 201,
    body: JSON.stringify(result),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
