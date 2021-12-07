import styled from 'styled-components/native';
import { colors } from '~/styles';

export const Container = styled.View`
  background-color:${colors.background};
  flex:1;
  padding: 10px;
  justify-content:space-between;
`;

export const Text = styled.Text`
  color:${props => props.color};
  font-family:${props => props.font};
  text-transform: ${props => props.transform};
`;

export const Card = styled.TouchableOpacity`
  background: ${colors.white};
  padding: 10px;
  border-width: 1px;
  border-color:#ccc;
  margin-bottom: 10px;
  align-items:center;
`;

export const ButtonNew = styled.TouchableOpacity`
  padding: 10px;
  border-width: 1px;
  border-color:#080;
  margin-bottom: 10px;
  align-items:center;
`;
