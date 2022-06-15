const path = require('path');

const projectRoot = path.resolve(__dirname, '../../../');
const distPath = path.resolve(__dirname, '../../dist');

const cssPaths = {
    build: 'css',
    main: ['./www/sources/css/main.scss'],
    error: ['./www/sources/css/pages/error.scss'],
    auth:['./www/sources/css/pages/auth/login.scss']
};

const scriptPaths = {
    build: 'js',
    home: ['./www/sources/js/pages/home/index.js'],
    language: ['./www/sources/js/common/languages/ViewResources.js'],
    recheckin: ['./www/sources/js/pages/auth/recheckin.js']
};

module.exports = {
    projectRoot: projectRoot,
    distPath: distPath,
    cssPaths: cssPaths,
    scriptPaths: scriptPaths
};