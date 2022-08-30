import { Request, Response } from 'express';
import {
    httpCreatedCode,
    httpInternalErrorCode,
    httpSuccessCode
} from '../constants/httpCodes';
import { defaultErrorMessage } from '../constants/messages';
import { CacheRepositoryInterface } from '../contracts/repositories/cache';
import { ErrandsServiceInterface } from '../contracts/services/errands';
import { HttpError } from '../errors/httpError';

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
            throw new HttpError(defaultErrorMessage, httpInternalErrorCode);
        }
    }

    store = async (request: Request, response: Response) => {
        const { content } = request.body;
        
        try {
            const errand = await this.service.create({
                content: content
            });

            await this.cacheRepository.delete('errands:all');

            return response.status(httpCreatedCode), errand;
        } catch(error) {
            throw new HttpError(defaultErrorMessage, httpInternalErrorCode);
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

            return response.status(httpSuccessCode).json(errand);
        } catch(error) {
            throw new HttpError(defaultErrorMessage, httpInternalErrorCode);
        }
    }

    delete = async(request: Request, response: Response) => {
        const { id } = request.params;
        
        try {
            await this.service.delete(parseInt(id));

            await this.cacheRepository.delete(`errands:${id}`);
            await this.cacheRepository.delete(`errands:all`);

            return response.status(204);
        } catch (error) {
            throw new HttpError(defaultErrorMessage, httpInternalErrorCode);
        }
    }
};