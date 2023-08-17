import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');

const Category = sequelize.define('Category', {
    id: DataTypes.INTEGER,
  nombre: DataTypes.STRING,
}); 

module.exports = (sequelize, dataTypes) => {
    const alias = "Category";

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
    }

    const config = {
        tableName: "categorias",
        timestamps: false,
    }

    const EMPRENDIMIENTOS = sequelize.define(alias, cols, config);

    EMPRENDIMIENTOS.associate = (models) => {
        EMPRENDIMIENTOS.belongsTo(models.Product, {
            as: "Productos",
            foreignKey: "categoria_id",
        });
        
  return EMPRENDIMIENTOS
}
}