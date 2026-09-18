import type { Request, Response } from "express";
import bwipjs from "bwip-js";
import { prisma } from "../config/db.js";

interface Body {
  url: string
  userId: string
  image: string
}

export const QrcodeController = async (req: Request, res: Response) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ message: 'data is required' });
  }

  try {
    const png = await bwipjs.toBuffer({
      bcid: 'qrcode',
      text: String(data),
      scale: 3,
    });

    const buffer = Buffer.isBuffer(png) ? png : Buffer.from(png);

    return res.status(200).json({
      message: 'QRCODE successfully created',
      image: `data:image/png;base64,${buffer.toString('base64')}`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Error generating QRCODE' });
  }
};


export const SaveQrcodeController = async (req: Request, res: Response) => {
  const { url, userId, image} = req.body;

  if(!url || !userId || !image){
    return res.status(400).json({
      Messsage: "Missing Credentials"
    })
  }

  const userExists = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  try {
    if(userId && userExists){
      const savedQr = await prisma.qr.create({
        data: {
          url: url,
          userId: userId,
          image: image
        }
      })

      return res.status(201).json({
        message: "Qr Saved",
        savedQr
      })
    }
  } catch (error) {
    
  }
};