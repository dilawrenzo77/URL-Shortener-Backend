import type { NextFunction, Request, Response } from "express";
import type { User } from '../generated/prisma/client.js';
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
export declare const MustBeUser: (req: Request, res: Response, next: NextFunction) => Promise<void | Response<any, Record<string, any>>>;
