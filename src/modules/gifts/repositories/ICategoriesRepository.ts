import { Category } from "../models/Category";

interface ICreateCategory {
    name: string
    type: string
    platforms: string
    description: string
}

interface ICategoriesRepository {
    findByName(name: string): Category
    list(): Category[]
    create({ name, type, platforms, description }: ICreateCategory)
}

export { ICategoriesRepository, ICreateCategory}
