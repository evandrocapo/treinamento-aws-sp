const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const S3 = new AWS.S3();

const get = (bucket, key) => {
    return new Promise((resolve, reject) => {
        S3.getObject({
            Bucket: bucket,
            Key: key
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data.Body);
        });
    });
};

module.exports = {
    get: get,
}