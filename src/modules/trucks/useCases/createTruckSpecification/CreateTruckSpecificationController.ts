import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTruckSpecificationUseCase } from "./CreateTruckSpecificationUseCase";

class CreateTruckSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specifications_id } = req.body;

    const createTruckSpecificationUseCase = container.resolve(
      CreateTruckSpecificationUseCase
    );

    const trucks = await createTruckSpecificationUseCase.execute({
      truck_id: id,
      specifications_id,
    });

    return res.json(trucks);
  }
}

export { CreateTruckSpecificationController }
