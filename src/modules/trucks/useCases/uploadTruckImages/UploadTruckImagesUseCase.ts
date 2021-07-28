import { ITruckImagesRepository } from "@modules/trucks/repositories/ITrucksImageRepository";
import { inject, injectable } from "tsyringe";

interface IRequest {
  truck_id: string;
  images_name: string[];
}

@injectable()
class UploadTruckImagesUseCase {
  constructor(
    @inject("TrucksImagesRepository")
    private trucksImageRepository: ITruckImagesRepository
  ) {}
  async execute({ truck_id, images_name }: IRequest): Promise<void> {
    images_name.map(async (image) => {
      await this.trucksImageRepository.create(truck_id, image);
    });
  }
}

export { UploadTruckImagesUseCase };
