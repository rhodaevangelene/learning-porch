const User = require("./User");
const Books = require("./Books");

User.belongsTo(Books);
Books.hasMany(User);

User.hasMany(Books, {
    foreignKey: 'user_id'
});

module.exports = { User, Books };
