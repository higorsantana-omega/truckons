import { Request, Response } from "express";
import CreateGiftService from "./CreateGiftService";

export function createGiftCard(req: Request, res: Response) {
    CreateGiftService.execute({
        name: "PSN",
        amount: 5,
        type: "Digital",
        value: 39,
        platforms: "PS4"
    })

    return res.send()
}