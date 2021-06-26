"use strict";
/**
 * nome - string
 * tipo - string
 * valor - number
 * plataformas - string
 * quantidade - number
 * id - number
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CreateGiftService = /** @class */ (function () {
    function CreateGiftService() {
    }
    CreateGiftService.prototype.execute = function (_a) {
        var name = _a.name, _b = _a.type, type = _b === void 0 ? 'Digital' : _b, value = _a.value, platforms = _a.platforms, amount = _a.amount;
        console.log(name, type);
    };
    return CreateGiftService;
}());
exports.default = new CreateGiftService;
