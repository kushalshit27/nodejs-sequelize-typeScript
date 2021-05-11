import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import Logger from './logger';

export default class Database {

    private db: string;
    private user: string;
    private password: string;
    private host: string;
    private port: number;
    private maxPool: number;
    private minPool: number;
    private database: Sequelize;
    private dbDialect: string;

    constructor() {

        this.db = process.env.DB_NAME || 'db_name';
        this.user = process.env.DB_USER || 'db_user';
        this.password = process.env.DB_PASS || '';
        this.host = process.env.DB_HOST || 'db_host';
        this.port = Number(process.env.DB_PORT) || 1433;
        this.maxPool = Number(process.env.MAX_POOL) || 10;
        this.minPool = Number(process.env.MIN_POOL) || 1;
        this.dbDialect = process.env.DB_DIALECT || 'sqlite';

        this.database = new Sequelize(this.db, this.user, this.password, {
            dialect: 'sqlite',
            host: this.host,
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
                Logger.info('Connection has been established successfully.');
            })
            .catch(err => {
                Logger.error('Unable to connect to the database:', err);
            });

        this.database.sync({
            // Using 'force' will drop any table defined in the models and create them again.
            // force: true
        })
    }
}