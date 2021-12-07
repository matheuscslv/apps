import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  baseMargin: 10,
  basePadding: 10,
  baseRadius: 2,
  screenWhidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
};
