import cors from 'cors';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { HttpROuter } from './contracts/httpRouter';

import Database from './database/connections/Database';
import Redis from './database/connections/Redis';

export default class Application {
    readonly #express: express.Application;

    constructor() {
        this.#express = express();
    }

    get server() {
        return this.#express;
    }

    async init() {
        this.config();
        this.middlewares();
        this.routers();
        await this.database();
    };

    // istanbul
    start(port: number) {
        this.#express.listen(process.env.PORT || port, () => {
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

    private routers() {
        const routersPath = path.resolve(__dirname, 'routers');

        fs.readdirSync(routersPath).forEach(filename => {
            import(path.resolve(routersPath, filename)).then(file => {
                const instance = new file.default() as HttpROuter;

                this.#express.use(instance.init());
            });
        });

        // const errandsRouter = new ErrandsRoutes().init();
        // this.#express.use(errandsRouter);
    };
    
    private async database() {
        await Database.getInstance();
        Redis.getInstance();
    }

};