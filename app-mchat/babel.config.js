module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
        alias: {
          '@hooks': './src/hooks',
          '@pages': './src/pages',
          '@components': './src/components',
          '@services': './src/services',
          '@assets': './src/assets',
          '@libs': './src/libs',
          '@dtos': './src/dtos',
          '@reduces': './src/store/reduces',
        },
      },
    ],
    'jest-hoist',
  ],
};
