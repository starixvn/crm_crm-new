const projectRoot = require('../config/path').projectRoot;

const alias = {
    '@jsroot': projectRoot + '/www/sources/js',
    '@cssroot': projectRoot + '/www/sources/css',
    '@projectRoot': projectRoot
};

module.exports = alias;