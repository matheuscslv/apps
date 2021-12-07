import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: #fff;
  justify-content: center;
  align-items: center;
`;

export const InfoUser = styled.View`
  margin-left: 19%;
  margin-top: 30%;
`;
export const Card = styled.View`
  /*
align-items: center;
justify-content:center;
  border-radius: 2px;
  margin: 10px; */
`;

export const DataUser = styled.Text`
  font-size: ${({ size }) => size || 16};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: #111;
`;

export const CardImage = styled.ImageBackground`
  background-color: #fff;
  flex: 1;
  justify-content: center;
  width: ${height - 90}px;
  height: ${width - 100}px;
`;
