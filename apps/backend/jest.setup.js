require('reflect-metadata');
const { testDataSource } = require('./fixture');

void (() => testDataSource.$connect())();
