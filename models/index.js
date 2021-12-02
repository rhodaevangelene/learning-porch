const User = require("./User");
const Books = require("./Books");
const Library = require("./Library");

User.hasMany(Books, {
    foreignKey: 'user_id'
});

Books.hasMany(User, {
    foreignKey: 'books_id'
})

module.exports = { User, Books, Library };