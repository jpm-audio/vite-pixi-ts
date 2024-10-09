import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/'],
  },
  //{
  //  rules: {
  //    'no-non-null-assertion': 'off',
  //    'no-unused-imports-ts': 'warn',
  //    'no-unused-vars': 'warn',
  //    'no-undef': 'warn',
  //  },
  //},
];
