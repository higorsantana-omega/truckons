/**
 * nome - string
 * tipo - string
 * valor - number
 * plataformas - string
 * quantidade - number
 * id - number
 */

interface Gift {
    name: string
    type?: string
    value: number
    platforms: string
    amount: number
}

class CreateGiftService {
    execute({ name, type = 'Digital', value, platforms, amount } : Gift) {
        console.log(name, type)
    }
}

export default new CreateGiftService