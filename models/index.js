const User = require("./User");
const Books = require("./Books");
const Library = require("./Library");

User.belongsToMany(Books, {
    through: Library
});

Books.belongsToMany(User, {
    through: Library
})

module.exports = { User, Books, Library };