import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const Product = sequelize.define('Product', {
  nombre: DataTypes.STRING,
  precio: DataTypes.INTEGER,
  descripcion: DataTypes.TEXT,
  descuento: DataTypes.INTEGER,
  stock: DataTypes.INTEGER,
  emprendimiento_id: DataTypes.INTEGER,
  categoria_id: DataTypes.INTEGER
});

module.exports = (sequelize, dataTypes) => {
    const alias = "Product";

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
        precio: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        descuento: {
            type: dataTypes.INTEGER(11),
        },
        descripcion: {
            type: dataTypes.STRING(800),
        },
        categoria_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }

    const config = {
        tableName: "products",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const PRODUCT = sequelize.define(alias, cols, config);

    PRODUCT.associate = (models) => {
        PRODUCT.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "categoria_id",
        });

        PRODUCT.hasMany(models.ImagenesProductos, {
            as: "images",
            foreignKey: "productos_id",
            onDelete:'cascade'
        });
        PRODUCT.belongsTo(models.Emprendimientos, {
            as: "emprendimientos",
            foreignKey: "emprendimientos_id",
        });
    }

    return PRODUCT;
}