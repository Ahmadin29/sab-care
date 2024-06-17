module.exports = {
  root: true,
  extends: ['@react-native-community','expo'],
  rules: {
    'no-console': 'error',
    'max-len': ['error', {code: 100, ignoreUrls: true}],
    'arrow-body-style': 'warn',
    'no-return-assign': 'off',
    'class-methods-use-this': 'off',
    'global-require': 'off',
    'jsx-a11y/href-no-hash': 'off',
    'prefer-destructuring': 0,
    'no-use-before-define': 0,
    'prettier/prettier': 'error',
    'lines-between-class-members': 0,
    'no-restricted-globals': 0,
    'import/no-cycle': 0,
    'prefer-promise-reject-errors': 0,
    'import/named': 0,
    camelcase: 1,
    'no-multiple-empty-lines': [
      'warn',
      {
        max: 1,
      },
    ],
    'no-else-return': 1,
    'react/display-name': 'off',
    'react/require-default-props': 'off',
    'react/jsx-filename-extension': [
      'warn',
      {
        extensions: ['.js', '.jsx'],
      },
    ],
    'react/forbid-prop-types': 'off',
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 0,
    'react-native/no-inline-styles': 2,
    'react-native/no-color-literals': 2,
    'react/prefer-stateless-function': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-curly-brace-presence': 0,
    'react/prop-types': 0,
    'react/no-access-state-in-setstate': 1,
    'react/default-props-match-prop-types': 0,
    'react/sort-comp': 0,
    'react/no-unused-state': 1,
    'react/no-unused-prop-types': 1,
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'import/prefer-default-export': 0,
    'react-hooks/exhaustive-deps': 1,
  },
};
