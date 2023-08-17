import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const imagenesProductos = sequelize.define('imagenesProductos', {
  id: DataTypes.INTEGER,
  imagen: DataTypes.STRING,
  productos_id: DataTypes.INTEGER,
});

module.exports = (sequelize, dataTypes) => {
    const alias = "imagenesProductos";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        imagen: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        productos_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }

    const config = {
        tableName: "imagenes_productos",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const IMAGENESPRODUCTOS = sequelize.define(alias, cols, config);

    IMAGENESPRODUCTOS.associate = (models) => {

        IMAGENESPRODUCTOS.belongsTo(models.Productos, {
            as: "images",
            foreignKey: "productos_id"
        });
    }

    return IMAGENESPRODUCTOS;
}