import { AppError } from "../../../errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayLoad {
  sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError("Token missing", 401);
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: user_id } = verify(token, auth.secret_token) as IPayLoad
    
    req.user = {
      id: user_id
    }

    next()
  } catch (error) {
    throw new AppError("Invalid token", 401);
  }

}