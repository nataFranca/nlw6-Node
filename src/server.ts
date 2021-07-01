import "reflect-metadata";
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import cors from "cors";
import { router } from "./routes";

import "./database"

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  //Esse if trata os erros lançados nos services, baseado nas regras definidas para a app
  if(err instanceof Error) {
    return response.status(400).json({
      error: err.message
    })
  }

  //Qualquer outra erro que aconteça cai aqui
  return response.status(500).json({
    status: "error",
    message: "Internal Server Error"
  })
})

app.listen(3000, () => console.log("Server is running"));