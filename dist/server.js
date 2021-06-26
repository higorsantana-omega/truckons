"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var routes_1 = require("./routes");
var app = express_1.default();
app.get("/", function (req, res) {
    return res.json({ message: "Hello" });
});
app.get("/s", routes_1.createGiftCard);
app.listen(3098);
