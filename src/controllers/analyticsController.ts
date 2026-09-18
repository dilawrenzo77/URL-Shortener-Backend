import type { Request, Response } from "express"
import { prisma } from "../config/db.js";

export const Analytics = async (req:Request, res:Response)=> {
    const { userId } = req.params as { userId: string };

    if(!userId){
        return res.status(400).json({
            message: "Credentials needed"
        })
    }

    const analytics = await prisma.user.findUnique({
        where: {
            id: userId
        },
        include: {
        url: true,
        qr: true,
        },
        omit: {
            password: true
        }
    })



    return res.status(200).json({
        Message: "User Analytics",
        analytics
    })
}