import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableTrucksUseCase } from "./ListAvailableTrucksUseCase";

class ListAvailableTrucksController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { brand, name, category_id } = req.query;

    const listAvailableTrucksUseCase = container.resolve(
      ListAvailableTrucksUseCase
    );

    const trucks = await listAvailableTrucksUseCase.execute({
      brand: brand as string,
      name: name as string,
      category_id: category_id as string,
    });

    return res.json(trucks);
  }
}

export { ListAvailableTrucksController };
