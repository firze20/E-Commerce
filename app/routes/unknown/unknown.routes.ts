import { Request, Response } from "express";

export const unknownEndpoint = (req: Request, res: Response) => {
    res.status(404).send({
        message: "Unknown route!",
});}
