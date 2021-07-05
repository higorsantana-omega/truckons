import { Category } from "../entities/Category";
import { ICategoriesRepository, ICreateCategory } from "./ICategoriesRepository";


class PostgresCategoriesRepository implements ICategoriesRepository{
    findByName(name: string): Category {
        console.log(name)
        return null
    }
    list(): Category[] {
        return null
    }
    create({ name, description }: ICreateCategory): void {
        console.log(name, description)
    }
}

export { PostgresCategoriesRepository }
