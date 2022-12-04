import { Request, Response } from "express";

export const fileUploadHandler = (req: Request, res: Response) => {
    const location: string | undefined = req.file?.location;
    res.status(200).json({
        location
    });
}