const AWS = require('aws-sdk');
const fs = require('fs');
require('dotenv').config();


// Configuração do AWS S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// const file = req.files.file;
// const uploadPath = path.join(__dirname, 'uploads', file.name);

const uploadImageOnS3 = async (file) => {
    const fileContent = fs.readFileSync(file.path);

    const params = {
        Bucket: process.env.BUCKET_NAME,
        acl: 'public-read',
        Key: file.filename,
        Body: fileContent,
        ContentType: file.mimetype,
    };

    try {
        const data = await s3.upload(params).promise();
        await fs.unlinkSync(file.path);
        return data.Location;
    } catch (error) {
        await fs.unlinkSync(file.path);
        return null;
    }
};

const deleteImageOnS3 = async (filename) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
    };

    try {
        await s3.deleteObject(params).promise();
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    uploadImageOnS3,
    deleteImageOnS3,
};