import { ICreateTruckDTO } from "@modules/trucks/dtos/ICreateTruckDTO";
import { ITrucksRepository } from "@modules/trucks/repositories/ITrucksRepository";
import { getRepository, Repository } from "typeorm";
import { Truck } from "../entities/Truck";

class TrucksRepository implements ITrucksRepository {
  private repository: Repository<Truck>;

  constructor() {
    this.repository = getRepository(Truck);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    name,
    license_plate,
    specifications,
    id,
  }: ICreateTruckDTO): Promise<Truck> {
    const truck = this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id,
      specifications,
      id,
    });

    await this.repository.save(truck);

    return truck;
  }

  async findByLicensePlate(license_plate: string): Promise<Truck> {
    const truck = await this.repository.findOne({
      license_plate,
    });

    return truck;
  }

  async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Truck[]> {
    const trucksQuery = await this.repository
      .createQueryBuilder("t")
      .where("available = :available", { available: true });

    if (brand) {
      trucksQuery.andWhere("t.brand = :brand", { brand });
    }

    if (category_id) {
      trucksQuery.andWhere("t.category_id = :category_id", { category_id });
    }

    if (name) {
      trucksQuery.andWhere("t.name = :name", { name });
    }

    return await trucksQuery.getMany();
  }

  async findById(id: string): Promise<Truck> {
    return await this.repository.findOne(id)
  }
}

export { TrucksRepository };
