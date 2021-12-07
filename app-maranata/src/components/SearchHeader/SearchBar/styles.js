import { Animated } from 'react-native';

import styled from 'styled-components/native';

export const HeaderContent = styled(Animated.View)`
  flex-direction: row;
  align-items: center;

  padding: 0 10px;
  height: 64px;
  background-color: #fff;

  shadow-radius: 3.84px;
  shadow-opacity: 0.25;
  shadow-offset: 0 2px;
  shadow-color: #000;
  elevation: 5;
  margin-bottom: 5px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#666',
})`
  flex: 1;
  text-align: left;
  color: #333;
  font-size: 16px;
  padding: 0 10px;
`;
