const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const SQS = new AWS.SQS();
const QUEUE_URL = 'https://sqs.us-east-1.amazonaws.com/983580680417/255-recognize-image';

const send = (message) => {
    return new Promise((resolve, reject) => {
        SQS.sendMessage({
            QueueUrl: QUEUE_URL,
            MessageBody: JSON.stringify(message)
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

module.exports = {
    send: send,
}