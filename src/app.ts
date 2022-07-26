import cors from 'cors';
import express from 'express';

import Database from './database/connections/Database';
import Redis from './database/connections/Redis';
import ErrandsRoutes from './routers/errands';

export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    async init() {
        this.config();
        this.middlewares();
        this.routers();
        await this.database();
    };

    start(port: number) {
        this.#express.listen(process.env.PORT || 8080, () => {
            console.log('API RODANDO');
        });
    };

    private config() {
        this.#express.use(express.json());
        this.#express.use(express.urlencoded({ extended: false }));
        this.#express.use(cors());
    };

    middlewares() {

    };

    routers() {
        const errandsRouter = new ErrandsRoutes().init();
        this.#express.use(errandsRouter);
    };
    
    private async database() {
        await Database.getInstance();
        Redis.getInstance();
    }

};