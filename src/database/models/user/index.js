import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
  nombre: DataTypes.STRING,
  email: DataTypes.DATE,
  password:DataTypes.STRING,

});

module.exports = (sequelize, dataTypes) => {
    const alias = "User";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        email: {
            type: dataTypes.STRING(60),
            allowNull: false,
        },
        pass: {
            type: dataTypes.STRING(70),
            allowNull: false,
        }
    }

    const config = {
        tableName: "usuarios",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    return sequelize.define(alias,cols,{...config})

}