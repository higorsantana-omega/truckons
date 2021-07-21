import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UserRepository";
import { NextFunction, Request, Response } from "express";

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user

  const usersRepository = new UsersRepository()
  const user = await usersRepository.findById(id)

  if (!user.isAdmin) {
    throw new Error("User isn't admin");
  }

  return next()
}