import fs from "fs"
import csvParse from "csv-parse"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"
import { categoriesRoutes } from "../../../../routes/categories.routes"

interface IImportCategory{
    name: string 
    type: string
    platforms: string
    description: string
}

class ImportCategoryUseCase{
    constructor(private categoriesRepository: ICategoriesRepository) {
    }
    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path)
            const categories: IImportCategory[] = []

            const parseFile = csvParse()
            stream.pipe(parseFile)

            parseFile.on("data", async (line) => {
                const [name, type, platforms, description] = line
                categories.push({
                    name,
                    type,
                    platforms,
                    description
                })
            })
            .on("end", () => {
            resolve(categories)
            })
            .on("Error", err => {
            reject(err)
            })
        })
    }

    async execute(file: Express.Multer.File): Promise<void>{
        const categories = await this.loadCategories(file)
        
        categories.map(async (category) => {
            const { name, type, platforms, description } = category
            const existCategory = this.categoriesRepository.findByName(name)
            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    type,
                    platforms,
                    description
                })
            }
        })
    }
}

export { ImportCategoryUseCase }