import { Category } from "../models/Category"


interface ICreateCategory {
    name: string
    type: string
    platforms: string
    description: string
}

class CategoriesRepository {
    private categories: Category[]

    
    constructor() {
        this.categories = []
    }

    create({ name, type, platforms, description } : ICreateCategory): void {
        const category = new Category()

    Object.assign(category, {
        name,
        type,
        platforms,
        description,
        created_at: new Date()
    })

        this.categories.push(category)
    }
}

export { CategoriesRepository }
