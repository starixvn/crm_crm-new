module.exports = {
    setupFilesAfterEnv: ['<rootDir>/www/sources/js/setupTests/setupEnzyme.js'],
    moduleFileExtensions: ['js', 'jsx'],
    moduleNameMapper: {
        '^@jsroot(.*)$': '<rootDir>/www/sources/js$1',
        '\\.(css|scss)$': 'identity-obj-proxy'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/www/sources/js/**/*.{js,jsx}'
    ],
    coveragePathIgnorePatterns: [
        '<rootDir>/node_modules/'
    ] 
};