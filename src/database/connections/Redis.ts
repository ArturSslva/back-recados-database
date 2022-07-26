import IORedis from "ioredis";

export default class Redis {
    private static instance: IORedis.Redis;

    private constructor() {}

    static getInstance() {
        if (!Redis.instance) {
            const redis = new Redis();
            Redis.instance = redis.openConnection();
        }
        return Redis.instance;
    }

    private openConnection() {
        try {
                       
            return new IORedis(process.env.REDIS_URL, , {
                tls: {
                  rejectUnauthorized: false
                }
            });
            // return new IORedis(process.env.REDIS_URL);
        } catch(error) {
            throw (`Erro ao se conectar ao Redis: ${error}`);
        }
    }
}