import styled from 'styled-components/native';

import { colors } from '~/styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 44px;
  background-color: ${colors.primary};
  align-items: center;
  justify-content: center;
  width: ${({ width }) => width || '70%'};
  align-self: center;
  border-radius: 2px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family:"Quicksand-Bold";
`;
