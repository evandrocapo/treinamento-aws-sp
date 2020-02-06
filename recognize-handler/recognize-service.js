const AWS = require('aws-sdk');
const sqsService = require('./sqs-service');

AWS.config.update({
    region: 'us-east-1'
});

const Rekognition = new AWS.Rekognition();

const recognize = async event => {

    const s3Message = JSON.parse(event.Records[0].Sns.Message);
    const bucket = s3Message.Records[0].s3.bucket.name;
    const key = s3Message.Records[0].s3.object.key;

    const result = await new Promise((resolve, reject) => {
        Rekognition.detectLabels({
            Image: {
                S3Object: {
                    Bucket: bucket,
                    Name: key,
                }
            },
            MinConfidence: 80,
            MaxLabels: 5
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.Labels.map(it => it.Name));
        });
    });

    const sqsMessage = {
        eventType: 'IMAGE_TAGGING_EVENT',
        bucket: bucket,
        key: key,
        labels: result
    };
    await sqsService.send(sqsMessage);
};

module.exports = {
    recognize: recognize
}