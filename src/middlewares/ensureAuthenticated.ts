import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {

  //Receber o token
  const authToken = request.headers.authorization

  //Validar se o token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }

  const [ ,token] = authToken.split(" ");
  
  try {
    //Validar se o token é válido
    const { sub } = verify(token, "b30b20097cecaf49b625937a8e308645") as IPayload;
    
    //Recuperar informações do usuário
    request.user_id = sub;

    return next();  
  } catch(err) {
    return response.status(401).end();
  }
  
  
}