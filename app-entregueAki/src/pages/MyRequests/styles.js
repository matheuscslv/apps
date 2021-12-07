import styled from 'styled-components/native';
import { colors } from '~/styles';
import Icon from 'react-native-vector-icons/AntDesign';

export const IconeCheck = styled(Icon)`
`;

export const Container = styled.View`
  flex:1;
  padding: 10px;
  background: ${colors.background};
`;

export const Text = styled.Text`
  color:${props => props.color};
  font-family:${props => props.font};
`;

export const Card = styled.TouchableOpacity`
  background: ${colors.white};
  padding: 10px;
  border-width: 1px;
  border-color:#ccc;
  margin-bottom: 10px;
  align-items:center;
`;
