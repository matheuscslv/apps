import styled from 'styled-components/native';
import { colors, metrics } from '~/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const Card = styled.View`
  margin: 12px;
  border-radius: ${metrics.baseRadius}px;
  background-color: #fff;
  padding: ${metrics.basePadding}px;
  border-width: 1px;
  border-color: ${colors.border};
`;

export const Info = styled.Text`
  font-size: 12px;
  color: #999;
  margin: 0 8px;
`;
