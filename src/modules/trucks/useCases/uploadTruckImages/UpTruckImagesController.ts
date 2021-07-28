import { Request, Response } from "express";
import { container } from "tsyringe";
import { UploadTruckImagesUseCase } from "./UploadTruckImagesUseCase";

interface IFiles {
  filename: string;
}

class UploadTruckImagesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFiles[];

    const uploadTruckImageUseCase = container.resolve(UploadTruckImagesUseCase);

    const images_name = images.map((file) => file.filename);

    await uploadTruckImageUseCase.execute({
      truck_id: id,
      images_name,
    });

    return res.status(201).send();
  }
}

export { UploadTruckImagesController };
