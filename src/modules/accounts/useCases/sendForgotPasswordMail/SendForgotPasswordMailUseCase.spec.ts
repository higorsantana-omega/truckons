import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;
let dateProvider: DayjsDateProvider;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });

  it("should be able to send a forgot password mail to user", async () => {
    const sendMail = spyOn(mailProvider, "sendEmail");
    await usersRepositoryInMemory.create({
      driver_license: "921898",
      email: "forgotpass@test.com",
      name: "Steven Anderson",
      password: "098",
    });
    await sendForgotPasswordMailUseCase.execute("forgotpass@test.com");
    expect(sendMail).toHaveBeenCalled();
  });

  it("should be able to send an email if user does not exists", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("okas@uj.soak")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("should be able to create an users token", async () => {
    const generateTokenMail = spyOn(usersTokensRepositoryInMemory, "create");
    
    usersRepositoryInMemory.create({
      driver_license: "721972",
      email: "forgotpass123@test.com",
      name: "Steven Anderson Silva",
      password: "098",
    });

    await sendForgotPasswordMailUseCase.execute("forgotpass123@test.com");

    expect(generateTokenMail).toBeCalled();
  });
});
