require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    url: process.env.URL,
    secret: process.env.SECRET
};
