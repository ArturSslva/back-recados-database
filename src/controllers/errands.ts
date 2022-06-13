import { Request, Response } from 'express';
import { Errands } from '../database/entities/Errands';

export default class ErrandsController {
    async index(request: Request, response: Response) {
        return response.json(await Errands.find());
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;
        
        return response.json(await Errands.findOne(id));
    }

    async store(request: Request, response: Response) {
        const { content } = request.body;
        const errand = await new Errands(content).save();

        return response.json(errand);
    }

    async update(request: Request, response: Response) {
        const { id } = request.params;
        const { content } = request.params;
        const errand = await Errands.findOne(id);

        if(errand){
            errand.content = content;
            errand.save();
        }

        return response.json(errand);
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params;
        await Errands.delete(id);

        return response.sendStatus(204);
    }
};