import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UserRepository";

interface IPayLoad {
    sub: string
}

export async function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        throw new Error("Token missing");
    }

    const [, token] = authHeader.split(" ")
    try {
        const { sub: user_id } = verify(token, "7b96e636e4bd247fc6dfe3371a194766") as IPayLoad
        const usersRepository = new UsersRepository()
        const user = usersRepository.findById(user_id)
        
        if (!user) {
            throw new Error("User does not exists");
        }

        next()
    } catch (error) {
        throw new Error("Invalid token");
    }

}