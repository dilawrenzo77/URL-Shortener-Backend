import type { Response } from "express";
export declare const GenerateToken: (user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
}, res: Response) => string;
