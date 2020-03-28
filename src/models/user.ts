
import database from '../config/db';
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

// // Database connection instance
const databaseInstance = new database().database;

// We need to declare an interface for our model that is basically what our class would be
export interface UserInterface extends Model {
  readonly id: number;
  name: string;
  lastname: string;
  age: number;
}

// Need to declare the static model so `findOne` etc. use correct types.
type MyModelStatic = typeof Model & (new(values?: object, options?: BuildOptions) => UserInterface);

// TS can't derive a proper class definition from a `.define` call, therefor we need to cast here.
export const User = databaseInstance.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
}) as MyModelStatic;