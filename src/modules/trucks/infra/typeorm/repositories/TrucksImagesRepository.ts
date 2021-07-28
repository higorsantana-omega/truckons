import { ITruckImagesRepository } from "@modules/trucks/repositories/ITrucksImageRepository";
import { getRepository, Repository } from "typeorm";
import { TruckImage } from "../entities/TruckImage";

class TrucksImageRepository implements ITruckImagesRepository{
  private repository: Repository<TruckImage>;
  
  constructor() {
    this.repository = getRepository(TruckImage)
  }

  async create(truck_id: string, image_name: string): Promise<TruckImage> {
    const truckImage = this.repository.create({
      truck_id,
      image_name,
    })

    await this.repository.save(truckImage)

    return truckImage
  }
  
}

export { TrucksImageRepository }