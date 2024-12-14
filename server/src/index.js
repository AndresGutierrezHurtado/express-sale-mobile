import express from "express";
import * as models from "./models/index.js";

const app = express();

app.use(express.json({ limit: "50mb" }));

app.listen(process.env.VITE_API_PORT, () => console.log("server running"));
