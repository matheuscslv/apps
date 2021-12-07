import styled from 'styled-components/native';
import { colors, metrics } from '~/styles';

export const Top = styled.View`
  background-color: #8b0000;
  align-items: center;
`;
export const TopText = styled.Text`
  font-size: 16px;
  padding: ${metrics.basePadding - 2}px;
  text-transform: uppercase;
  font-weight: bold;
  color: ${colors.white};
`;
