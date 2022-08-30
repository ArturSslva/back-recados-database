import { Router } from 'express';
import { HttpROuter } from '../contracts/httpRouter';
import ErrandsController from '../controllers/errands';
import { CacheRepository } from '../database/repositories/cache';
import { ErrandService } from '../service/errands';

export default class ErrandsRoutes implements HttpROuter {
    init() {
        const routes = Router();
        const service = new ErrandService();
        const cacheRepository = new CacheRepository();
        const controller= new ErrandsController(service, cacheRepository);

        routes.get('/errands', controller.index);

        routes.post('/errands', controller.store);

        routes.put('/errands:id', controller.update);

        routes.delete('/errands:id', controller.delete);

        return routes;
    }
}