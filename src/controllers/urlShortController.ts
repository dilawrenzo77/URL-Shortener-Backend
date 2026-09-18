import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import { prisma } from "../config/db.js";

var BASE_URL = "www.short_url/"

export const URLShortener = async (req:Request, res:Response) => {
    const { url }   = req.body;
    const loggedUser = req.user;


    console.log(loggedUser, "fd3etyd3gftyd3edygeydg3edyg3eydg3eyug");

    if(!url){
        res.status(400).json({
            Message: "Please Input a URL to be Shortened"
        })
    }

    const shortCode = nanoid(7);


    if(loggedUser){
        const newUrlForLoggedUser = await prisma.url.create({
            data: {
                originalUrl: url,
                shortUrl: shortCode,
                clicks: 0,
                userId: loggedUser.id,
            }
        })

        return res.json({
            message: "this shortens the Original url for a Logged User",
            shortURL: `${BASE_URL}${shortCode}`,
            newUrlForLoggedUser
        })
    }else{
        const newUrl = await prisma.url.create({
            data: {
                originalUrl: url,
                shortUrl: shortCode,
                clicks: 0
            }
        })

        return res.json({
            message: "this shortens the Original url for all",
            shortURL: `${BASE_URL}${shortCode}`,
            newUrl
        })
    }

};


export const ShortURL = async (req: Request, res:Response) => {
    const { shortcode } = req.params;

    if(!shortcode){
        res.status(404).json({
            Message: "a shortcode needs to be sent"
        })
    }

    const entry = await prisma.url.findUnique({
        where: {
            shortUrl: shortcode as string
        }
    })
    
    if(!entry){
        res.status(404).json({
            Message: "This URL Does not exist or is Obsolete"
        })
    }

    return res.redirect(entry?.originalUrl as string)
}