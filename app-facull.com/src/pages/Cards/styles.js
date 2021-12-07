import Icon from 'react-native-vector-icons/Feather';

import styled from 'styled-components/native';

import { colors } from '~/styles';

export const Container = styled.View`
  flex: 1;
`;

export const FAIcon = styled(Icon)``;

export const IconCard = styled.Image`
  height: 50px;
  width: 50px;
`;

export const Icons = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Option = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border-bottom-width: 1.5px;
  border-bottom-color: #f7f7f7;
  padding: 20px;
  align-items: center;
  height: 90px;
`;

export const Title = styled.Text`
  color: #333;
  font-size: 14px;
  margin-left: 10px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  style: {
    shadowOffset: { width: 0, height: 1 },
  },
})`
  background: #f58534;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  elevation: 5;
  position: absolute;
  bottom: 30px;
  right: 30px;
  padding: 0;
  margin: 0;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;
