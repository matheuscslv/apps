import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  title: 'light',
  colors: {
    primary: '#1e236d',
    secundary: '#1e239d',
    success: '#5ed7b4',
    danger: '#8b0000',

    border: '#ebebeb',
    background: '#f7f7f7',

    title: '#444',
    subtitle: '#666',

    transparent: 'transparent',
    darkTransparent: 'rgba(0, 0, 0, 0.6)',
    whiteTransparent: 'rgba(255, 255, 255, 0.3)',

    white: '#fff',
    lighter: '#eee',
    light: '#ddd',
    regular: '#999',
    dark: '#666',
    darker: '#333',
    black: '#222',
  },

  fonts: {
    light: 'Quicksand-Light',
    regular: 'Quicksand-Regular',
    medium: 'Quicksand-Medium',
    bold: 'Quicksand-Bold',
    semibold: 'Quicksand-SemiBold',
  },

  screen: {
    width: width < height ? width : height,
    height: width < height ? height : width,
  },
};
