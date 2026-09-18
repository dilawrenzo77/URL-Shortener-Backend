import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { prisma } from "../config/db.js";
import type { User } from '../generated/prisma/client.js';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const MustBeUser = async (req:Request, res:Response, next:NextFunction) => {
    let token;
    const jwtSecret = process.env.JWT_SECRET!;

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];
    }else if (req.cookies?.userJWT as string){
		token = req.cookies?.userJWT as string
	}

    if (!token) {
        // return res.status(401).json({ message: "Not authorized, no token" });
        return next();
    }

    try {
        const decoded = jwt.verify(token, jwtSecret) as JwtPayload;

        const user = await prisma.user.findUnique({
            where: {
                id: decoded.id
            }
        })

        if (!user) {
            return res.status(401).json({ message: "User no longer exists" });
        }

        req.user = user;
        next();
    }  catch (error) {
    console.error("MustBeUser error:", error);
    return res.status(401).json({ message: "Not authorized" });
}
}