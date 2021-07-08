import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

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
        const { sub: user_id } = verify(token, "7b96e636e4bd247fc6dfe3371a194766") as IPayLoad
        const usersRepository = new UsersRepository()
        const user = usersRepository.findById(user_id)

        if (!user) {
            throw new AppError("User does not exists", 401);
        }

        next()
    } catch (error) {
        throw new AppError("Invalid token", 401);
    }

}