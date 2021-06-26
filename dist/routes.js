"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGiftCard = void 0;
var CreateGiftService_1 = __importDefault(require("./CreateGiftService"));
function createGiftCard(req, res) {
    CreateGiftService_1.default.execute({
        name: "PSN",
        amount: 5,
        type: "Digital",
        value: 39,
        platforms: "PS4"
    });
    return res.send();
}
exports.createGiftCard = createGiftCard;
