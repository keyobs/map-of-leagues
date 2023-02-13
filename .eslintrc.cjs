module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/jsx-runtime',
        'prettier'
    ],
    'overrides': [
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 'latest',
        'sourceType': 'module'
    },
    'plugins': [
        'react',
        '@typescript-eslint'
    ],
    'rules': {
        'indent': [ 'error', 4 ],
        'camelcase': 'error',
        "no-multi-assign": "error",
        "eqeqeq": [ "warn", "smart" ],
        "no-var": "warn",
        "prefer-const": "warn",
        "no-duplicate-imports": "warn",
        'linebreak-style': [ 'warn','unix' ],
        'quotes': [ 'warn','single' ],
        'semi': [ 'warn','always' ],
        'react/prop-types': 'off',
    }
};
