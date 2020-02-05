const AWS = require('aws-sdk');

AWS.config.update({
    region: 'us-east-1'
});

const DynamoDB = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = '255-images';

const put = item => {
    return new Promise((resolve, reject) => {
        DynamoDB.put({
            TableName: TABLE_NAME,
            Item: {
                id: item.key,
                bucket: item.bucket
            }
        }, (err, data) => {
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
};

module.exports = {
    put: put
}