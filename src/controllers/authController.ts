import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import { prisma } from "../config/db.js";
import { GenerateToken } from "../utils/generateToken.js";


export const Register = async (req:Request, res:Response) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password){
        return res.status(400).json({
            message: "A required field is missing! please confirm tour register details"
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    try {
        const user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashedPassword
            }
        });

        return res.status(201).json({
            message: "New User Created",
            name: user.name,
            email: user.email
        })

    } catch (error) {
        res.status(500).json({
            Message: "Error from the server"
        })
    }

    
};


export const Login = async (req:Request, res:Response) => {
    const { email, password } = req.body;

    if(!email || !password){
        res.status(400).json({
            Message: "Your Login credentials are Incomplete"
        })
    }

    const userExists = await prisma.user.findUnique({
        where: {email: email}
    });

    if (!userExists) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
    }

    //Generate Token
    const token = GenerateToken({ id: userExists.id, name: userExists.name, email: userExists.email, createdAt: userExists.createdAt }, res);


    try {
        res.status(201).json({
            Ok: true,
            Message: "User Logged In",
            user: {
                id: userExists?.id,
                name: userExists?.name,
                email: userExists?.email,
                createdAt: userExists?.createdAt
            },
            Token: token
        })
    } catch (error: any) {
        console.error("Login failed:", error);
        alert(error.response?.data?.Message || error.response?.data?.error || "Login failed");
    }
};


export const Logout = (req:Request, res: Response) => {
  res.clearCookie("userJWT", { path: "/" });
  return res.json({ ok: true });
}; 