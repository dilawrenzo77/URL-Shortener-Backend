import express from "express";
import URLRouter from "./routes/urlShort.Route.js";
import AuthRouter from "./routes/auth.Route.js";
import QrRouter from "./routes/qrCode.Route.js"
import AnalyticsRouter from "./routes/analytics.Route.js"
import {config} from "dotenv";
import cors from "cors"
import { connectDB, disconnectDB } from "./config/db.js";
import cookieParser from "cookie-parser";


config();
connectDB();


const app = express();
const port = process.env.PORT;
const frontendUrl = process.env.FRONTEND_URL;


app.use(express.json());
app.use(cors(
    {origin: frontendUrl as string,
        credentials: true
    }
))
app.use(cookieParser());
app.use("/auth", AuthRouter);
app.use("/url", URLRouter);
app.use("/qr", QrRouter);
app.use("/", AnalyticsRouter)


 const server =  app.listen(port, (): void => {
    console.log(`Server running at http://localhost:${port}`);
    console.log("✅ TypeScript is working!");
});

//handle unhandled promise rejection
process.on("unhandledRejection", (err) =>{
    console.error("unhandled rejection",err);
    server.close(async () =>{
        await disconnectDB();
        process.exit(1);
    })
})

//handle uncaught exceptions
process.on("uncaughtException", async (err) =>{
    console.error("uncaughtException",err);
    await disconnectDB();
    process.exit(1);
})


//graceful shutdown
process.on("SIGTERM", (err) =>{
    console.error("SIGTERM recieved, shutting down gracefully",err);
    server.close(async () =>{
        await disconnectDB();
        process.exit(1);
    })
});