import * as AWS from 'aws-sdk';
import csvParser from 'csv-parser';

export class ImportService {
    private readonly s3 = new AWS.S3({ region: 'eu-west-1' })
    public async getFilesList(fileName: string) {
        const params = { Bucket: process.env.BUCKET_NAME, Key: `uploaded/${fileName}` };

        return await this.s3.getSignedUrlPromise('getObject', params);
    }

    public getS3Object(record): void {
        const bucket = record.s3.bucket.name;
        const key = decodeURIComponent(record.s3.object.key.replace(/\+/g, ' '));
        const params = {
            Bucket: bucket,
            Key: key,
        };
        const s3Stream = this.s3.getObject(params).createReadStream();

        const parserOptions = {
            columns: true,
            auto_parse: true,
            escape: '\\',
            trim: true,
        };
        const parser = csvParser(parserOptions);

        parser
            .on('end', (data) => {
                console.log(data);
            })
            .on('end', async () => {
                const copyParams = {
                    Bucket: bucket,
                    CopySource: `${bucket}/${key}`,
                    Key: `${bucket}/parsed`,
                };
                const deleteParams = {
                    Bucket: bucket,
                    Key: key
                }
                await this.s3.copyObject(copyParams).promise();
                await this.s3.deleteObject(deleteParams).promise();
            });

        s3Stream.pipe(parser);
    }
}