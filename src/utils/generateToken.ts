import jwt from "jsonwebtoken";
import { config } from "dotenv";
import type { Response } from "express";

config();
export const GenerateToken = (user: { id: string; name: string; email: string, createdAt: Date }, res:Response) => {

    const payload = {id: user.id, name: user.name,  email: user.email, createdAt: user.createdAt };
    const jwtSecret = process.env.JWT_SECRET || "jwtSecret";
    const jwtExpiresIn = process.env.JWT_EXPIRE_IN;


    const token = jwt.sign(
    payload,
    jwtSecret,
    {
        expiresIn: jwtExpiresIn || '24h',
    } as jwt.SignOptions
    );

    res.cookie("userJWT",token,{
		httpOnly: true,
		secure: true,          // ← hardcode it, not based on NODE_ENV
		sameSite: "none",
        path: "/",
		maxAge: (1000 * 60 * 60 * 24) * 7
	})
    

    return token;
}