import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  title: 'light',
  colors: {
    primary: '#A91C72',
    secundary: '#E72B5E',
    success: '#52DE97',
    danger: '#F67474',

    background: '#F9F9F9',

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
    regular: 'NotoSans',
    bold: 'NotoSans-Bold',
  },

  screen: {
    width: width < height ? width : height,
    height: width < height ? height : width,
  },
};
