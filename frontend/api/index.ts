import axios from "axios";
import { diggAPI } from "./setup";

interface IUploadFileResponse {
    location: string;
}

export const uploadFile = async (file: Blob, filename?: string): Promise<IUploadFileResponse | null> => {
    const formData = new FormData();

    formData.append("file", file, filename);

    try {
        const response = await diggAPI.post("/upload-file", formData, {
            headers: {
                "content-type": "multipart/form-data"
            }
        });
        return response.data;
    } catch(e) {
        console.log(e);
        return null;
    }
}