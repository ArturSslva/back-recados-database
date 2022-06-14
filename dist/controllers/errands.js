"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Errands_1 = require("../database/entities/Errands");
class ErrandsController {
    async index(request, response) {
        return response.json(await Errands_1.Errands.find());
    }
    async show(request, response) {
        const { id } = request.params;
        return response.json(await Errands_1.Errands.findOne(id));
    }
    async store(request, response) {
        const { content } = request.body;
        const errand = await new Errands_1.Errands(content).save();
        return response.json(errand);
    }
    async update(request, response) {
        const { id } = request.params;
        const { content } = request.body;
        const errand = await Errands_1.Errands.findOne(id);
        if (errand) {
            errand.content = content;
            errand.save();
        }
        return response.json(errand);
    }
    async delete(request, response) {
        const { id } = request.params;
        await Errands_1.Errands.delete(id);
        return response.sendStatus(204);
    }
}
exports.default = ErrandsController;
;
