module.exports = {
    clearMocks: true, // для сброса моков при старте каждого нового теста
    collectCoverageFrom: ['src/**/*.js'], // для каких файлов выполнять тесты (для всех js в папке src)
    coverageDirectory: 'coverage', // директория с отчетом покрытия тестами
    moduleFileExtensions: ['js'], // расширения файлов, которые будут тестироваться
    testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'], // где хранятся тесты
    testPathIgnorePatterns: ['\\\\node_modules\\\\'], // где тесты искать не нужно
    transformIgnorePatterns: ['<rootDir>/node_modules/'],
    transform: {
        '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
            'jest-transform-stub',
        '^.+\\.(js|jsx)?$': 'babel-jest'
    },
    // verbose: false,
};