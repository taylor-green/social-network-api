const { connect, connection } = require('mongoose');


connect('mongodb://localhost/social-network-api');


module.exports = connection;