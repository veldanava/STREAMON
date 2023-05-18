import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import routes from "./src/routes/index.js";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1", routes)

const port = process.env.PORT || 5000;

const server = http.createServer(app);

console.log(`

█▄▄ ▄▀█ █▀▀ █▄▀ █▀▀ █▄░█ █▀▄  █▀ █ █▀▄ █▀▀
█▄█ █▀█ █▄▄ █░█ ██▄ █░▀█ █▄▀  ▄█ █ █▄▀ ██▄
--> kiana: github.com/veldanava
`);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("tuturuu server connected...")
    server.listen(port, () => {
        console.log(`server listening on ${port}`);
    });
}).catch((err) => {
    console.log({ err })
    process.exit(1);
});