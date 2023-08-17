import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const puntoDeRetiro = sequelize.define('puntoDeRetiro', {
    id: DataTypes.INTEGER,
  nombre: DataTypes.STRING,
  descripcion: DataTypes.TEXT,
  telefono: DataTypes.INTEGER
});

module.exports = (sequelize, dataTypes) => {
    const alias = "puntoDeRetiro";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        nombre: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        descripcion: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        telefono: {
            type: dataTypes.INTEGER(),
            allowNull: false,
        }
    }
    const config = {
        tableName: "puntoDeRetiro",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const PUNTODERETIRO = sequelize.define(alias, cols, config);

    PUNTODERETIRO.associate = (models) => {
        PUNTODERETIRO.belongsTo(models.Pedidos, {
            as: "Pedidos",
            foreignKey: "pedidos_id",
        });
    }

    return PUNTODERETIRO;
}