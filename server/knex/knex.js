const knexFile = require("./knexFile");

//importing config file and exporting knex instance with config
const config = knexFile['development'];
module.exports = require('knex')(config);