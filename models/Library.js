const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Library extends Model {}

Library.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        book_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'books',
                key: 'id'
            }
        },
        read: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Library'
    }
);

module.exports = Library;