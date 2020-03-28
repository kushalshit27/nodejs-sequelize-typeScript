import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

export default class Database {

    db: string;
    user: string;
    password: string;
    host: string;
    port: number;
    maxPool: number;
    minPool: number;
    database: Sequelize;
    dialect: string;

    constructor() {

        this.db = process.env.DB_NAME || 'db_name';
        this.user = process.env.DB_USER || 'db_user';
        this.password = process.env.DB_PASS || '';
        this.host = process.env.DB_HOST || 'db_host';
        this.port = Number(process.env.DB_PORT) || 1433;
        this.maxPool = Number(process.env.MAX_POOL) || 10;
        this.minPool = Number(process.env.MIN_POOL) || 1;
        this.dialect = process.env.DB_DIALECT || 'sqlite';

        this.database = new Sequelize(this.db, this.user, this.password, {
            host: this.host,
            dialect: 'sqlite',
            storage: 'database.sqlite'
        })

        /* Production
        this.database = new Sequelize(this.db, this.user, this.password, {
            host: this.host,
            dialect: 'mysql',
            dialectOptions: {
                encrypt: true
            },
            port: this.port,
            logging: false,
            pool: {
                max: this.maxPool,
                min: this.minPool,
                acquire: 30000,
                idle: 10000
            }
        })
        */

        this.database.authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });

        this.database.sync({
            // Using 'force' will drop any table defined in the models and create them again.
            // force: true
        })
    }
}