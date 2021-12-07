import styled from 'styled-components/native';
import { colors } from '~/styles';

export const Container = styled.ScrollView`
`;

export const CardAddress = styled.View`
  padding: 10px;
  margin: 10px;
  border-width: 1px;
  border-color:#ccc;
`;

export const CardValue = styled.View`
  padding: 10px;
  margin: 10px;
  border-width: 1px;
  border-color:#ccc;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
  font-family:'Quicksand-Regular';
`;

export const Text = styled.Text`
  color: ${colors.dark};
  font-size: 11px;
  font-family:'Quicksand-Regular';
`;
