import express from "express";
import path from "path";
import cors from "cors";

import "express-async-errors";

import "./database/connection";

import routes from "./routes";
import errorHandler from "./errors/handler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(1919, () => {
  console.log("The server is running!");
});
