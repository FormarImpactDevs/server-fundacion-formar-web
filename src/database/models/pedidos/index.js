import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const Pedidos = sequelize.define('Pedidos', {
    id: DataTypes.INTEGER,
  forma_retiro: DataTypes.STRING,
  estado_del_pedido: DataTypes.STRING,
  link: DataTypes.STRING,
  clientData: DataTypes.TEXT,
  punto_retiro_id: DataTypes.INTEGER,
  numero_orden: DataTypes.STRING,
  tipo_de_entrega: DataTypes.STRING,

});

module.exports = (sequelize, dataTypes) => {
    const alias = "Pedidos";

    const cols = {
        id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        forma_retiro: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        estado_del_pedido: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        link: {
            type: dataTypes.STRING(255),
            allowNull: false,
        },
        clientData: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
        punto_retiro_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        numero_orden: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        tipo_de_entrega: {
            type: dataTypes.STRING(45),
            allowNull: false,
        }
    }

    const config = {
        tableName: "pedidos",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const PEDIDOS = sequelize.define(alias, cols, config);

    PEDIDOS.associate = (models) => {

        PEDIDOS.hasMany(models.Productos, {
            as: "Product",
            foreignKey: "productos_id",
        });
        PEDIDOS.belongsTo(models.Emprendimientos, {
            as: "emprendimientos",
            foreignKey: "emprendimientos_id",
        });
    }

    return PEDIDOS;
}