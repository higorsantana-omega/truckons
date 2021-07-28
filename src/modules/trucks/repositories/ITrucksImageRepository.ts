import { TruckImage } from "../infra/typeorm/entities/TruckImage";

interface ITruckImagesRepository {
  create(truck_id: string, image_name: string): Promise<TruckImage>;
}

export { ITruckImagesRepository };
