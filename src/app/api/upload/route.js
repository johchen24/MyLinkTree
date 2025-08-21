import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';

export async function POST(req) {
    const formData = await req.formData();
    if (formData.get('file')){
        const file = formData.get('file');

        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
            },
        });

        const randomId = uniqid();
        const extension = file.name.split('.').pop();
        const newFileName = `${randomId}.${extension}`;
        const bucketName = process.env.BUCKET_NAME;

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }

        await s3Client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFileName,
            ACL: 'public-read',
            Body: Buffer.concat(chunks),
            ContentType: file.type,
        }));

        const url = `https://${bucketName}.s3.amazonaws.com/${newFileName}`;
        return Response.json(url);
    }
}