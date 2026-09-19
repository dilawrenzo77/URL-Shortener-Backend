// src/index.ts
import express from "express";

// src/routes/urlShort.Route.ts
import { Router } from "express";

// src/controllers/urlShortController.ts
import { nanoid } from "nanoid";

// src/generated/prisma/internal/class.ts
import * as runtime from "@prisma/client/runtime/client";
var config = {
  "previewFeatures": [],
  "clientVersion": "7.10.0",
  "engineVersion": "0edf323efd1d98336f3f0a68684b56f689b900d3",
  "activeProvider": "postgresql",
  "inlineSchema": '// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider     = "prisma-client"\n  output       = "../src/generated/prisma"\n  moduleFormat = "cjs"\n}\n\ndatasource db {\n  provider = "postgresql"\n}\n\nmodel User {\n  id       String @id @default(uuid())\n  name     String\n  email    String @unique\n  password String @unique\n  url      Url[]\n  qr       Qr[]\n\n  createdAt DateTime @default(now())\n}\n\nmodel Url {\n  id          String  @id @default(uuid())\n  originalUrl String\n  shortUrl    String  @unique\n  userId      String?\n  clicks      Int\n\n  createdAt DateTime @default(now())\n\n  user User? @relation(fields: [userId], references: [id])\n}\n\nmodel Qr {\n  id     String  @id @default(uuid())\n  url    String\n  userId String?\n  image  String\n\n  createdAt DateTime @default(now())\n\n  user User? @relation(fields: [userId], references: [id])\n}\n',
  "runtimeDataModel": {
    "models": {},
    "enums": {},
    "types": {}
  },
  "parameterizationSchema": {
    "strings": [],
    "graph": ""
  }
};
config.runtimeDataModel = JSON.parse('{"models":{"User":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"name","kind":"scalar","type":"String"},{"name":"email","kind":"scalar","type":"String"},{"name":"password","kind":"scalar","type":"String"},{"name":"url","kind":"object","type":"Url","relationName":"UrlToUser"},{"name":"qr","kind":"object","type":"Qr","relationName":"QrToUser"},{"name":"createdAt","kind":"scalar","type":"DateTime"}],"dbName":null,"schema":null},"Url":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"originalUrl","kind":"scalar","type":"String"},{"name":"shortUrl","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"clicks","kind":"scalar","type":"Int"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"UrlToUser"}],"dbName":null,"schema":null},"Qr":{"fields":[{"name":"id","kind":"scalar","type":"String"},{"name":"url","kind":"scalar","type":"String"},{"name":"userId","kind":"scalar","type":"String"},{"name":"image","kind":"scalar","type":"String"},{"name":"createdAt","kind":"scalar","type":"DateTime"},{"name":"user","kind":"object","type":"User","relationName":"QrToUser"}],"dbName":null,"schema":null}},"enums":{},"types":{}}');
config.parameterizationSchema = {
  strings: JSON.parse('["where","orderBy","cursor","user","url","qr","_count","User.findUnique","User.findUniqueOrThrow","User.findFirst","User.findFirstOrThrow","User.findMany","data","User.createOne","User.createMany","User.createManyAndReturn","User.updateOne","User.updateMany","User.updateManyAndReturn","create","update","User.upsertOne","User.deleteOne","User.deleteMany","having","_min","_max","User.groupBy","User.aggregate","Url.findUnique","Url.findUniqueOrThrow","Url.findFirst","Url.findFirstOrThrow","Url.findMany","Url.createOne","Url.createMany","Url.createManyAndReturn","Url.updateOne","Url.updateMany","Url.updateManyAndReturn","Url.upsertOne","Url.deleteOne","Url.deleteMany","_avg","_sum","Url.groupBy","Url.aggregate","Qr.findUnique","Qr.findUniqueOrThrow","Qr.findFirst","Qr.findFirstOrThrow","Qr.findMany","Qr.createOne","Qr.createMany","Qr.createManyAndReturn","Qr.updateOne","Qr.updateMany","Qr.updateManyAndReturn","Qr.upsertOne","Qr.deleteOne","Qr.deleteMany","Qr.groupBy","Qr.aggregate","AND","OR","NOT","id","userId","image","createdAt","equals","in","notIn","lt","lte","gt","gte","not","contains","startsWith","endsWith","originalUrl","shortUrl","clicks","name","email","password","every","some","none","is","isNot","connectOrCreate","upsert","createMany","set","disconnect","delete","connect","updateMany","deleteMany","increment","decrement","multiply","divide"]'),
  graph: "rwEcMAoEAABtACAFAABuACA_AABsADBAAAAHABBBAABsADBCAQAAAAFFQABqACFUAQBoACFVAQAAAAFWAQAAAAEBAAAAAQAgCgMAAGsAID8AAG8AMEAAAAMAEEEAAG8AMEIBAGgAIUMBAGkAIUVAAGoAIVEBAGgAIVIBAGgAIVMCAHAAIQIDAACjAQAgQwAAcQAgCgMAAGsAID8AAG8AMEAAAAMAEEEAAG8AMEIBAAAAAUMBAGkAIUVAAGoAIVEBAGgAIVIBAAAAAVMCAHAAIQMAAAADACABAAAEADACAAAFACAKBAAAbQAgBQAAbgAgPwAAbAAwQAAABwAQQQAAbAAwQgEAaAAhRUAAagAhVAEAaAAhVQEAaAAhVgEAaAAhAQAAAAcAIAkDAABrACAEAQBoACE_AABnADBAAAAJABBBAABnADBCAQBoACFDAQBpACFEAQBoACFFQABqACECAwAAowEAIEMAAHEAIAkDAABrACAEAQBoACE_AABnADBAAAAJABBBAABnADBCAQAAAAFDAQBpACFEAQBoACFFQABqACEDAAAACQAgAQAACgAwAgAACwAgAQAAAAcAIAEAAAADACABAAAACQAgAQAAAAEAIAIEAAChAQAgBQAAogEAIAMAAAAHACABAAARADACAAABACADAAAABwAgAQAAEQAwAgAAAQAgAwAAAAcAIAEAABEAMAIAAAEAIAcEAACfAQAgBQAAoAEAIEIBAAAAAUVAAAAAAVQBAAAAAVUBAAAAAVYBAAAAAQEMAAAVACAFQgEAAAABRUAAAAABVAEAAAABVQEAAAABVgEAAAABAQwAABcAMAEMAAAXADAHBAAAhQEAIAUAAIYBACBCAQB1ACFFQAB2ACFUAQB1ACFVAQB1ACFWAQB1ACECAAAAAQAgDAAAGgAgBUIBAHUAIUVAAHYAIVQBAHUAIVUBAHUAIVYBAHUAIQIAAAAHACAMAAAcACACAAAABwAgDAAAHAAgAwAAAAEAIBMAABUAIBQAABoAIAEAAAABACABAAAABwAgAwYAAIIBACAZAACEAQAgGgAAgwEAIAg_AABmADBAAAAjABBBAABmADBCAQBXACFFQABZACFUAQBXACFVAQBXACFWAQBXACEDAAAABwAgAQAAIgAwGAAAIwAgAwAAAAcAIAEAABEAMAIAAAEAIAEAAAAFACABAAAABQAgAwAAAAMAIAEAAAQAMAIAAAUAIAMAAAADACABAAAEADACAAAFACADAAAAAwAgAQAABAAwAgAABQAgBwMAAIEBACBCAQAAAAFDAQAAAAFFQAAAAAFRAQAAAAFSAQAAAAFTAgAAAAEBDAAAKwAgBkIBAAAAAUMBAAAAAUVAAAAAAVEBAAAAAVIBAAAAAVMCAAAAAQEMAAAtADABDAAALQAwAQAAAAcAIAcDAACAAQAgQgEAdQAhQwEAdwAhRUAAdgAhUQEAdQAhUgEAdQAhUwIAfwAhAgAAAAUAIAwAADEAIAZCAQB1ACFDAQB3ACFFQAB2ACFRAQB1ACFSAQB1ACFTAgB_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_AABmADBAAAAjABBBAABmADBCAQBXACFFQABZACFUAQBXACFVAQBXACFWAQBXACEJAwAAawAgBAEAaAAhPwAAZwAwQAAACQAQQQAAZwAwQgEAaAAhQwEAaQAhRAEAaAAhRUAAagAhC0YBAAAAAUcBAAAABEgBAAAABEkBAAAAAUoBAAAAAUsBAAAAAUwBAAAAAU0BAGEAIU4BAAAAAU8BAAAAAVABAAAAAQtGAQAAAAFHAQAAAAVIAQAAAAVJAQAAAAFKAQAAAAFLAQAAAAFMAQAAAAFNAQBfACFOAQAAAAFPAQAAAAFQAQAAAAEIRkAAAAABR0AAAAAESEAAAAAESUAAAAABSkAAAAABS0AAAAABTEAAAAABTUAAXAAhDAQAAG0AIAUAAG4AID8AAGwAMEAAAAcAEEEAAGwAMEIBAGgAIUVAAGoAIVQBAGgAIVUBAGgAIVYBAGgAIVoAAAcAIFsAAAcAIAoEAABtACAFAABuACA_AABsADBAAAAHABBBAABsADBCAQBoACFFQABqACFUAQBoACFVAQBoACFWAQBoACEDVwAAAwAgWAAAAwAgWQAAAwAgA1cAAAkAIFgAAAkAIFkAAAkAIAoDAABrACA_AABvADBAAAADABBBAABvADBCAQBoACFDAQBpACFFQABqACFRAQBoACFSAQBoACFTAgBwACEIRgIAAAABRwIAAAAESAIAAAAESQIAAAABSgIAAAABSwIAAAABTAIAAAABTQIAWwAhAAAAAAFfAQAAAAEBX0AAAAABAV8BAAAAAQcTAACrAQAgFAAArgEAIFwAAKwBACBdAACtAQAgYAAABwAgYQAABwAgYgAAAQAgAxMAAKsBACBcAACsAQAgYgAAAQAgAAAAAAAFXwIAAAABZQIAAAABZgIAAAABZwIAAAABaAIAAAABBxMAAKYBACAUAACpAQAgXAAApwEAIF0AAKgBACBgAAAHACBhAAAHACBiAAABACADEwAApgEAIFwAAKcBACBiAAABACAAAAALEwAAkwEAMBQAAJgBADBcAACUAQAwXQAAlQEAMF4AAJYBACBfAACXAQAwYAAAlwEAMGEAAJcBADBiAACXAQAwYwAAmQEAMGQAAJoBADALEwAAhwEAMBQAAIwBADBcAACIAQAwXQAAiQEAMF4AAIoBACBfAACLAQAwYAAAiwEAMGEAAIsBADBiAACLAQAwYwAAjQEAMGQAAI4BADAEBAEAAAABQgEAAAABRAEAAAABRUAAAAABAgAAAAsAIBMAAJIBACADAAAACwAgEwAAkgEAIBQAAJEBACABDAAApQEAMAkDAABrACAEAQBoACE_AABnADBAAAAJABBBAABnADBCAQAAAAFDAQBpACFEAQBoACFFQABqACECAAAACwAgDAAAkQEAIAIAAACPAQAgDAAAkAEAIAgEAQBoACE_AACOAQAwQAAAjwEAEEEAAI4BADBCAQBoACFDAQBpACFEAQBoACFFQABqACEIBAEAaAAhPwAAjgEAMEAAAI8BABBBAACOAQAwQgEAaAAhQwEAaQAhRAEAaAAhRUAAagAhBAQBAHUAIUIBAHUAIUQBAHUAIUVAAHYAIQQEAQB1ACFCAQB1ACFEAQB1ACFFQAB2ACEEBAEAAAABQgEAAAABRAEAAAABRUAAAAABBUIBAAAAAUVAAAAAAVEBAAAAAVIBAAAAAVMCAAAAAQIAAAAFACATAACeAQAgAwAAAAUAIBMAAJ4BACAUAACdAQAgAQwAAKQBADAKAwAAawAgPwAAbwAwQAAAAwAQQQAAbwAwQgEAAAABQwEAaQAhRUAAagAhUQEAaAAhUgEAAAABUwIAcAAhAgAAAAUAIAwAAJ0BACACAAAAmwEAIAwAAJwBACAJPwAAmgEAMEAAAJsBABBBAACaAQAwQgEAaAAhQwEAaQAhRUAAagAhUQEAaAAhUgEAaAAhUwIAcAAhCT8AAJoBADBAAACbAQAQQQAAmgEAMEIBAGgAIUMBAGkAIUVAAGoAIVEBAGgAIVIBAGgAIVMCAHAAIQVCAQB1ACFFQAB2ACFRAQB1ACFSAQB1ACFTAgB_ACEFQgEAdQAhRUAAdgAhUQEAdQAhUgEAdQAhUwIAfwAhBUIBAAAAAUVAAAAAAVEBAAAAAVIBAAAAAVMCAAAAAQQTAACTAQAwXAAAlAEAMF4AAJYBACBiAACXAQAwBBMAAIcBADBcAACIAQAwXgAAigEAIGIAAIsBADAAAAIEAAChAQAgBQAAogEAIAVCAQAAAAFFQAAAAAFRAQAAAAFSAQAAAAFTAgAAAAEEBAEAAAABQgEAAAABRAEAAAABRUAAAAABBgUAAKABACBCAQAAAAFFQAAAAAFUAQAAAAFVAQAAAAFWAQAAAAECAAAAAQAgEwAApgEAIAMAAAAHACATAACmAQAgFAAAqgEAIAgAAAAHACAFAACGAQAgDAAAqgEAIEIBAHUAIUVAAHYAIVQBAHUAIVUBAHUAIVYBAHUAIQYFAACGAQAgQgEAdQAhRUAAdgAhVAEAdQAhVQEAdQAhVgEAdQAhBgQAAJ8BACBCAQAAAAFFQAAAAAFUAQAAAAFVAQAAAAFWAQAAAAECAAAAAQAgEwAAqwEAIAMAAAAHACATAACrAQAgFAAArwEAIAgAAAAHACAEAACFAQAgDAAArwEAIEIBAHUAIUVAAHYAIVQBAHUAIVUBAHUAIVYBAHUAIQYEAACFAQAgQgEAdQAhRUAAdgAhVAEAdQAhVQEAdQAhVgEAdQAhAwQGAgUMAwYABAEDCAEBAw0BAgQOAAUPAAAAAAMGAAkZAAoaAAsAAAADBgAJGQAKGgALAQMwAQEDNgEFBgAQGQATGgAUKwARLAASAAAAAAAFBgAQGQATGgAUKwARLAASAQNIAQEDTgEDBgAZGQAaGgAbAAAAAwYAGRkAGhoAGwcCAQgQAQkSAQoTAQsUAQ0WAQ4YBQ8ZBhAbAREdBRIeBxUfARYgARchBRskCBwlDB0mAh4nAh8oAiApAiEqAiIsAiMuBSQvDSUyAiY0BSc1Dig3Aik4Aio5BS08Dy49FS8-AzA_AzFAAzJBAzNCAzREAzVGBTZHFjdKAzhMBTlNFzpPAztQAzxRBT1UGD5VHA"
};
async function decodeBase64AsWasm(wasmBase64) {
  const { Buffer: Buffer2 } = await import("buffer");
  const wasmArray = Buffer2.from(wasmBase64, "base64");
  return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
  getRuntime: async () => await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js"),
  getQueryCompilerWasmModule: async () => {
    const { wasm } = await import("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js");
    return await decodeBase64AsWasm(wasm);
  },
  importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
  return runtime.getPrismaClient(config);
}

// src/generated/prisma/internal/prismaNamespace.ts
import * as runtime2 from "@prisma/client/runtime/client";
var getExtensionContext = runtime2.Extensions.getExtensionContext;
var NullTypes2 = {
  DbNull: runtime2.NullTypes.DbNull,
  JsonNull: runtime2.NullTypes.JsonNull,
  AnyNull: runtime2.NullTypes.AnyNull
};
var TransactionIsolationLevel = runtime2.makeStrictEnum({
  ReadUncommitted: "ReadUncommitted",
  ReadCommitted: "ReadCommitted",
  RepeatableRead: "RepeatableRead",
  Serializable: "Serializable"
});
var defineExtension = runtime2.Extensions.defineExtension;

// src/generated/prisma/client.ts
var PrismaClient = getPrismaClientClass();

// src/config/db.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";
var pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
var adapter = new PrismaPg(pool);
var prisma = new PrismaClient({
  adapter,
  log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"]
});
var connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("DATABASE connected via prisma");
  } catch (error) {
    console.log(`Error connecting to our DATAbase: ${error}`);
    process.exit(1);
  }
};
var disconnectDB = async () => {
  await prisma.$disconnect();
  await pool.end();
};

// src/controllers/urlShortController.ts
var BASE_URL = "www.short_url/";
var URLShortener = async (req, res) => {
  const { url } = req.body;
  const loggedUser = req.user;
  console.log(loggedUser, "fd3etyd3gftyd3edygeydg3edyg3eydg3eyug");
  if (!url) {
    res.status(400).json({
      Message: "Please Input a URL to be Shortened"
    });
  }
  const shortCode = nanoid(7);
  if (loggedUser) {
    const newUrlForLoggedUser = await prisma.url.create({
      data: {
        originalUrl: url,
        shortUrl: shortCode,
        clicks: 0,
        userId: loggedUser.id
      }
    });
    return res.json({
      message: "this shortens the Original url for a Logged User",
      shortURL: `${BASE_URL}${shortCode}`,
      newUrlForLoggedUser
    });
  } else {
    const newUrl = await prisma.url.create({
      data: {
        originalUrl: url,
        shortUrl: shortCode,
        clicks: 0
      }
    });
    return res.json({
      message: "this shortens the Original url for all",
      shortURL: `${BASE_URL}${shortCode}`,
      newUrl
    });
  }
};
var ShortURL = async (req, res) => {
  const { shortcode } = req.params;
  if (!shortcode) {
    res.status(404).json({
      Message: "a shortcode needs to be sent"
    });
  }
  const entry = await prisma.url.findUnique({
    where: {
      shortUrl: shortcode
    }
  });
  if (!entry) {
    res.status(404).json({
      Message: "This URL Does not exist or is Obsolete"
    });
  }
  return res.redirect(entry?.originalUrl);
};

// src/middleware/authMiddleware.ts
import jwt from "jsonwebtoken";
var MustBeUser = async (req, res, next) => {
  let token;
  const jwtSecret = process.env.JWT_SECRET;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies?.userJWT) {
    token = req.cookies?.userJWT;
  }
  if (!token) {
    return next();
  }
  try {
    const decoded = jwt.verify(token, jwtSecret);
    const user = await prisma.user.findUnique({
      where: {
        id: decoded.id
      }
    });
    if (!user) {
      return res.status(401).json({ message: "User no longer exists" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("MustBeUser error:", error);
    return res.status(401).json({ message: "Not authorized" });
  }
};

// src/routes/urlShort.Route.ts
var router = Router();
router.post("/urlShortener", MustBeUser, URLShortener);
router.get("/:shortcode", ShortURL);
var urlShort_Route_default = router;

// src/routes/auth.Route.ts
import { Router as Router2 } from "express";

// src/controllers/authController.ts
import bcrypt from "bcrypt";

// src/utils/generateToken.ts
import jwt2 from "jsonwebtoken";
import { config as config2 } from "dotenv";
config2();
var GenerateToken = (user, res) => {
  const payload = { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };
  const jwtSecret = process.env.JWT_SECRET || "jwtSecret";
  const jwtExpiresIn = process.env.JWT_EXPIRE_IN;
  const token = jwt2.sign(
    payload,
    jwtSecret,
    {
      expiresIn: jwtExpiresIn || "24h"
    }
  );
  res.cookie("userJWT", token, {
    httpOnly: true,
    secure: true,
    // ← hardcode it, not based on NODE_ENV
    sameSite: "none",
    path: "/",
    maxAge: 1e3 * 60 * 60 * 24 * 7
  });
  return token;
};

// src/controllers/authController.ts
var Register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "A required field is missing! please confirm tour register details"
    });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });
    return res.status(201).json({
      message: "New User Created",
      name: user.name,
      email: user.email
    });
  } catch (error) {
    res.status(500).json({
      Message: "Error from the server"
    });
  }
};
var Login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      Message: "Your Login credentials are Incomplete"
    });
  }
  const userExists = await prisma.user.findUnique({
    where: { email }
  });
  if (!userExists) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const isPasswordValid = await bcrypt.compare(password, userExists.password);
  if (!isPasswordValid) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
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
    });
  } catch (error) {
    console.error("Login failed:", error);
  }
};
var Logout = (req, res) => {
  res.clearCookie("userJWT", { path: "/" });
  return res.json({ ok: true });
};

// src/routes/auth.Route.ts
var router2 = Router2();
router2.post("/register", Register);
router2.post("/login", Login);
router2.get("/logout", MustBeUser, Logout);
var auth_Route_default = router2;

// src/routes/qrCode.Route.ts
import { Router as Router3 } from "express";

// src/controllers/qrcodeController.ts
import bwipjs from "bwip-js";
var QrcodeController = async (req, res) => {
  const { data } = req.body;
  if (!data) {
    return res.status(400).json({ message: "data is required" });
  }
  try {
    const png = await bwipjs.toBuffer({
      bcid: "qrcode",
      text: String(data),
      scale: 3
    });
    const buffer = Buffer.isBuffer(png) ? png : Buffer.from(png);
    return res.status(200).json({
      message: "QRCODE successfully created",
      image: `data:image/png;base64,${buffer.toString("base64")}`
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error generating QRCODE" });
  }
};
var SaveQrcodeController = async (req, res) => {
  const { url, userId, image } = req.body;
  if (!url || !userId || !image) {
    return res.status(400).json({
      Messsage: "Missing Credentials"
    });
  }
  const userExists = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  try {
    if (userId && userExists) {
      const savedQr = await prisma.qr.create({
        data: {
          url,
          userId,
          image
        }
      });
      return res.status(201).json({
        message: "Qr Saved",
        savedQr
      });
    }
  } catch (error) {
  }
};

// src/routes/qrCode.Route.ts
var router3 = Router3();
router3.post("/generateQRCcode", QrcodeController);
router3.post("/saveQrCode", SaveQrcodeController);
var qrCode_Route_default = router3;

// src/routes/analytics.Route.ts
import { Router as Router4 } from "express";

// src/controllers/analyticsController.ts
var Analytics = async (req, res) => {
  const { userId } = req.params;
  if (!userId) {
    return res.status(400).json({
      message: "Credentials needed"
    });
  }
  const analytics = await prisma.user.findUnique({
    where: {
      id: userId
    },
    include: {
      url: true,
      qr: true
    },
    omit: {
      password: true
    }
  });
  return res.status(200).json({
    Message: "User Analytics",
    analytics
  });
};

// src/routes/analytics.Route.ts
var router4 = Router4();
router4.get("/userAnalytics/:userId", Analytics);
var analytics_Route_default = router4;

// src/index.ts
import { config as config3 } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
config3();
connectDB();
var app = express();
var port = process.env.PORT;
var frontendUrl = process.env.FRONTEND_URL;
app.use(express.json());
app.use(cors(
  {
    origin: frontendUrl,
    credentials: true
  }
));
app.use(cookieParser());
app.use("/auth", auth_Route_default);
app.use("/url", urlShort_Route_default);
app.use("/qr", qrCode_Route_default);
app.use("/", analytics_Route_default);
var server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log("\u2705 TypeScript is working!");
});
process.on("unhandledRejection", (err) => {
  console.error("unhandled rejection", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
process.on("uncaughtException", async (err) => {
  console.error("uncaughtException", err);
  await disconnectDB();
  process.exit(1);
});
process.on("SIGTERM", (err) => {
  console.error("SIGTERM recieved, shutting down gracefully", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});
