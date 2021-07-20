import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTruckUseCase } from "./CreateTruckUseCase";

class CreateTruckController {
  async handle(req: Request, res: Response): Promise<Response>{
    const {
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
     } = req.body

    const createTruckUseCase = container.resolve(CreateTruckUseCase)
    const truck = await createTruckUseCase.execute({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    })

    return res.status(201).json(truck)
  }
}

export { CreateTruckController }