import { Router } from 'express';
import ErrandsController from '../controllers/errands';
import { CacheRepository } from '../database/repositories/cache';
import { ErrandService } from '../service/errands';

export default class ErrandsRoutes {
    init(): Router {
        const routes = Router();
        const service = new ErrandService();
        const cacheRepository = new CacheRepository();
        const controller= new ErrandsController(service, cacheRepository);

        routes.get('/errands', controller.index);

        routes.get('/errands:id', controller.show);

        routes.post('/errands', controller.store);

        routes.put('/errands:id', controller.update);

        routes.delete('/errands:id', controller.delete);

        return routes;
    }
}