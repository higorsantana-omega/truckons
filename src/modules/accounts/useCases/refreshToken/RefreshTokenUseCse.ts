import auth from "@config/auth"
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokenRepository"
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider"
import { AppError } from "@shared/errors/AppError"
import { sign, verify } from "jsonwebtoken"
import { inject } from "tsyringe"

interface IPlayload {
  sub: string;
  email: string;
}

class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokenRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) { }

  async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPlayload
    const user_id = sub
    const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

    if (!userToken) {
      throw new AppError("Refresh Token does not exists!")
    }

    await this.usersTokensRepository.deleteById(userToken.id)

    const refresh_token = sign(email, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token
    })

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days
    )

    await this.usersTokensRepository.create({
      expires_date,
      refresh_token,
      user_id
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }