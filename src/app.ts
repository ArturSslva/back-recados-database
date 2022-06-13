import express from 'express';
import cors from 'cors';

import ErrandsRoutes from './routers/errands';
import Database from './database/connections/Database';

export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    async init() {
        await this.database();
        this.config();
        this.middlewares();
        this.routers();
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
    }

};