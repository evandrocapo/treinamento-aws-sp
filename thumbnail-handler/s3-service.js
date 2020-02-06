const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const S3 = new AWS.S3();
const THUMBNAIL_BUCKET_NAME = '255-idemia-biblioteca-thumbnail';

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

const put = (key, buffer) => {
    return new Promise((resolve, reject) => {
        S3.putObject({
            Bucket: THUMBNAIL_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }, (err) => {
            if (err) {
                reject(err);
            }
            resolve({
                bucket: THUMBNAIL_BUCKET_NAME,
                key: key
            });
        });
    });
};

module.exports = {
    get: get,
    put: put
}