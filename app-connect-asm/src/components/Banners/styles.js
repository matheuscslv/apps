import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window");

export const Image = styled.Image`
  width: ${width - 30};
  height: ${height / 3};
  border-radius: 20px;
  margin: 10px;
`;
