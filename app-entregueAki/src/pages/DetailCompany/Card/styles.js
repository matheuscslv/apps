import styled from 'styled-components/native';
import { colors } from '~/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  background-color:#fff;
  padding: 10px;
  flex-direction:row;
  justify-content:space-between;
  border-width: 1px;
  border-color: #ccc;
  margin: 5px 10px 5px 10px;
  min-height: 120px;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
  text-transform:uppercase;
  font-family:'Quicksand-Regular';
`;

export const Value = styled.Text`
  color: #080;
  font-size: 11px;
  font-family:'Quicksand-Regular';
`;

export const Price = styled.Text`
  color: #080;
  font-size: 14px;
  font-family:'Quicksand-Bold';
`;

export const MinusIcon = styled(Icon)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const PlusIcon = styled(Icon)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;
