const Jimp = require('jimp');
const s3Service = require('./s3-service');

const thumbnail = async event => {

    const s3Message = JSON.parse(event.Records[0].Sns.Message);
    const bucket = s3Message.Records[0].s3.bucket.name;
    const key = s3Message.Records[0].s3.object.key;

    const objectS3 = await s3Service.get(bucket, key);
    const jimpImage = await Jimp.read(objectS3);
    const buffer = await jimpImage.resize(100, Jimp.AUTO).getBufferAsync(Jimp.MIME_JPEG); 

    const s3PutResult = await s3Service.put(key, buffer);
};

module.exports = {
    thumbnail: thumbnail
}