require('dotenv').config();

module.exports = {
    // type: process.env.DATABASE_TYPE,
    type: "postgres",
    url: "postgres://mvqilnnntbnglv:e7dd52bc9b479e262710559f2495003ed8a9b2405e7de911ea77b89351bb384c@ec2-34-236-94-53.compute-1.amazonaws.com:5432/d57r8s0o2fv80g",
    // url: process.env.DATABASE_URL,
    logging: false,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    },
    migrations: [
        'src/database/migrations/**/*'
    ],
    entities: [
        'src/database/entities/**/*'
    ],
    cli: {
        entitiesDir: 'src/database/entities',
        migrationsDir: 'src/database/migrations'
    }
};