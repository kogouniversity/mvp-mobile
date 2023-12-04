module.exports = {
    extends: [
        'eslint:recommended',
        'universe',
        'universe/native',
        'universe/web',
        'universe/shared/typescript-analysis',
        'airbnb',
        'airbnb/hooks',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'plugin:testing-library/react',
        'plugin:storybook/recommended',
    ],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.d.ts'],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
    plugins: ['react', 'jest', 'react-hooks', '@typescript-eslint'],
    rules: {
        'linebreak-style': 'off',
        'func-names': 0,
        'no-useless-constructor': 0,
        'import/prefer-default-export': 0,
        'jest/no-identical-title': 0,
        'import/extensions': 0,
        'react/react-in-jsx-scope': 0,
        'react/jsx-props-no-spreading': 0,
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.tsx'],
            },
        ],
        'import/no-extraneous-dependencies': [
            'error',
            { devDependencies: true },
        ],
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        // enforce explicit Typescript typing
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/explicit-module-boundary-types': 'error',
    },
    env: {
        node: true,
    },
};
