import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationRepository";


class SpecificationsRepository implements ISpecificationsRepository{
    create({ name, description }: ICreateSpecificationDTO): void {
        throw new Error("Method not implemented.");
    }
}

export { SpecificationsRepository }