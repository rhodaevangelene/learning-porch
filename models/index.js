const User = require("./User");
const Books = require("./Books");
const Library = require("./Library");

User.belongsToMany(Books, {
    through: 'library'
});

Books.belongsToMany(User, {
    through: 'library'
})

module.exports = { User, Books, Library };