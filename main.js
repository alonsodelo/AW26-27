import express from "express";
import path from "path";
import api from "./routes/api.js";

const PORT = 3000;
const HOST = "localhost";

const service = express();
const publicPath = path.join(import.meta.dirname, "public");

service.use(express.json());

service.use("/api", api);

service.use(express.static(publicPath, { extensions: ["html"] }));

service.listen(PORT, HOST, (error) => {
    if (error) console.error(error);
    else console.log(`Listening on http://${HOST}:${PORT}`);
});
