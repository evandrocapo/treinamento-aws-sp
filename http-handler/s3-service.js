const AWS = require('aws-sdk')
const UUID = require('uuid/v4')

AWS.config.update({
    region: 'us-east-1'
})

const S3 = new AWS.S3()
const BUCKET_NAME = '255-idemia-biblioteca'

const upload = body => {
    const key = UUID()

    return new Promise((resolve, reject) => {

        S3.putObject({
            Bucket: BUCKET_NAME,
            Key: `${key}.jpg`,
            Body: Buffer.from(body.replace(/ˆdata:image\/\w+;base64,/, ""),"base64"),
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        }, (err) => {
            if(err){
                reject(err)
            }
            resolve({
                Bucket: BUCKET_NAME,
                key: `${key}.jpg`
            })
        })

    })

}

module.exports = {
    upload: upload
}