import styled from 'styled-components/native';

export const Container = styled.View``;

export const Card = styled.TouchableOpacity`
  margin-right: 15px;
  justify-content: center;
  align-items: center;
`;

export const CardImage = styled.View`
  height: 70px;
  width: 70px;
  border-radius: 90px;
  elevation: 10;
`;

export const CardText = styled.Text`
  margin-top: 8px;
  font-size: 14px;
  color: #555;
`;
