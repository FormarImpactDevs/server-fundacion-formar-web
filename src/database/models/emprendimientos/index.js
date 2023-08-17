import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize('sqlite::memory:');
const Emprendimientos = sequelize.define('Emprendimientos', {
    id: DataTypes.INTEGER,
  nombre: DataTypes.STRING,
  descripcion: DataTypes.STRING,
  foto_card: DataTypes.STRING,
  foto_emprendimiento: DataTypes.STRING,
  idUsuario: DataTypes.INTEGER,

});

module.exports = (sequelize, dataTypes) => {
    const alias = "Emprendimientos";

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
        descripcion: {
            type: dataTypes.STRING(200),
            allowNull: false,
        },
        foto_card: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        foto_emprendimiento: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        idUsuario: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    }
    const config = {
        tableName: "emprendimientos",
        createdAt: "created_at",
        updatedAt: "updated_at",
    }

    const EMPRENDIMIENTOS = sequelize.define(alias, cols, config);

    EMPRENDIMIENTOS.associate = (models) => {
        EMPRENDIMIENTOS.belongsTo(models.Categoria, {
            as: "categoria",
            foreignKey: "categoria_id",
        });

        EMPRENDIMIENTOS.hasMany(models.ImagenesProductos, {
            as: "images",
            foreignKey: "productos_id",
            onDelete:'cascade'
        });
        EMPRENDIMIENTOS.belongsTo(models.Emprendimientos, {
            as: "emprendimientos",
            foreignKey: "emprendimientos_id",
        });
    }

    return EMPRENDIMIENTOS;
}
