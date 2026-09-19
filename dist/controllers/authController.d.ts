import type { Request, Response } from "express";
export declare const Register: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const Login: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const Logout: (req: Request, res: Response) => Response<any, Record<string, any>>;
