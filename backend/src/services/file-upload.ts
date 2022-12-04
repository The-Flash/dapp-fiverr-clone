import { S3Client } from "@aws-sdk/client-s3";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new S3Client({});

export const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME as string,
        metadata: function(req, file, cb) {
            cb(null, file);
        },
        key: function(req, file, cb) {
            cb(null, `${Date.now().toString()}-${file.originalname}`);
        }
    }),
});