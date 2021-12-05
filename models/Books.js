const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection.js');

class Books extends Model {}

Books.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        book_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        author_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        book_link: {
            type: DataTypes.STRING,
            allowNull: true
        },
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        // read: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        // },
        // user_id: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'user',
        //         key: 'id'
        //     }
        // }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'Books'
    }
);

module.exports = Books;