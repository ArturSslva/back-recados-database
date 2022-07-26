import { Request, Response } from 'express';
import { CacheRepositoryInterface } from '../contracts/repositories/cache';
import { ErrandsServiceInterface } from '../contracts/services/errands';

export default class ErrandsController {
    constructor(private service: ErrandsServiceInterface, private cacheRepository: CacheRepositoryInterface){}

    index = async (request: Request, response: Response) => {
        try {
            const cache = await this.cacheRepository.find('errands:all');

            if (cache) {
                return response.json(cache);
            }

            const errands = await this.service.find();
            const json = errands.map(errand => {
                return {
                    id: errand.id,
                    content: errand.content
                }
            });

            await this.cacheRepository.save('errands:all', json);

            return response.json(json);
        } catch (error) {
            throw (error);
        }
    }

    show = async (request: Request, response: Response) => {
        const { id } = request.params;
        
        try {
            const cache = await this.cacheRepository.find(`errands:${id}`);

            if (cache) {
                return response.json(cache);
            }

            const errand = await this.service.findOne(parseInt(id));
            const json = {
                content: errand?.content
            }

            await this.cacheRepository.save(`errands: ${id}`, json);

            return response.json(json);
        } catch (error) {
            throw (`Erro: ${error}`);
        }
    }

    store = async (request: Request, response: Response) => {
        const { content } = request.body;
        
        try {
            const errand = await this.service.create({
                content: content
            });

            await this.cacheRepository.delete('errands:all');

            return response.json(errand);
        } catch(error) {
            throw (`Error: ${error}`);
        }
    }

    update = async (request: Request, response: Response) => {
        const { id } = request.params;
        const { content } = request.body;
       
        try {
            const errand = await this.service.update({
                id: parseInt(id),
                content: content
            });

            await this.cacheRepository.save(`errands:${id}`, errand);

            await this.cacheRepository.delete(`errands:all`);

            return response.json(errand);
        } catch(error) {
            throw (`Erro: ${error}`);
        }
    }

    delete = async(request: Request, response: Response) => {
        const { id } = request.params;
        
        try {
            await this.service.delete(parseInt(id));

            await this.cacheRepository.delete(`errands:${id}`);
            await this.cacheRepository.delete(`errands:all`);

            return response.sendStatus(204);
        } catch (error) {
            throw (`Erro ${error}`);
        }
    }
};