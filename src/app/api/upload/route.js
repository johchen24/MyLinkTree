import { S3Client } from '@aws-sdk/client-s3';
import uniqid from 'uniqid';

export async function POST(req) {
    const formData = await req.formData();
    if (formData.get('file')){
        const file = formData.get('file');

        const s3Client = new S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });

        const randomId = uniqid();
        const extension = file.name.split('.').pop();
        const newFileName = `${randomId}.${extension}`;

        console.log(newFileName);
        return Response.json(true);
    }
}