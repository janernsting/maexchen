module.exports = {
    verbose: false,
    roots: [
        "<rootDir>/src"
    ],
    testMatch: [
        "<rootDir>/src/**/*.{spec,test,tests}.{ts,tsx}"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$"
    ],
    modulePaths: [
        "<rootDir>/src"
    ],
    moduleFileExtensions: [
        "js",
        "ts"
    ],
    coverageDirectory: "<rootDir>/out/coverage"
};
