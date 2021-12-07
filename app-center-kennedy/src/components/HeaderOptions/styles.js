import styled from 'styled-components/native';
import {colors} from '~/styles';

export const Container = styled.View`
  flex-direction: row;
  background-color: #f3f0f0;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  border-width: 1px;
  border-color: #e5e3e3;
  elevation: 4;
  shadow-color: #000;
  shadow-opacity: 0.05;
  shadow-radius: 2;
  shadow-offset: 0 2px;
`;

export const Option = styled.TouchableOpacity`
  width: 50%;
  justify-content: center;
  align-items: center;
`;

export const OptionName = styled.Text`
  font-size: 16px;
  color: #333;
`;

export const Separator = styled.View`
  border-width: 1px;
  border-color: #e5e3e3;
  width: 1px;
  height: 40px;
  background-color: #e5e3e3;
`;

export const ContentModal = styled.Modal``;
