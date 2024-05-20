// db.js
const knex = require('knex');
const knexConfig = require('./knexfile');

const postgres = knex(knexConfig);

module.exports = postgres;
