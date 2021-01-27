import express from "express";
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
  console.log("Run Barry, run!!");
  console.log("Servidor rodando na porta 1919 do seu localhost!");
});
