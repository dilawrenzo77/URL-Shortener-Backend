import type { Request, Response } from "express";
export declare const URLShortener: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const ShortURL: (req: Request, res: Response) => Promise<void>;
