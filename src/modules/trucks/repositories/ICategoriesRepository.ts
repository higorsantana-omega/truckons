import { Category } from "../models/Category";

interface ICreateCategory {
    name: string
    description: string
}

interface ICategoriesRepository {
    findByName(name: string): Category
    list(): Category[]
    create({ name, description }: ICreateCategory)
}

export { ICategoriesRepository, ICreateCategory}
