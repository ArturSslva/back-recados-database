"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const errands_1 = __importDefault(require("../controllers/errands"));
class ErrandsRoutes {
    init() {
        const routes = (0, express_1.Router)();
        const controller = new errands_1.default();
        routes.get('/errands', controller.index);
        routes.get('/errands:id', controller.show);
        routes.post('/errands', controller.store);
        routes.put('/errands:id', controller.update);
        routes.delete('/errands:id', controller.delete);
        return routes;
    }
}
exports.default = ErrandsRoutes;
