import styled, { css } from 'styled-components/native';

import { NunitoBold, colors } from '~/styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background: ${colors.secundary};
  border-radius: 4px;
  padding: 0 60px;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: auto;
  margin: 10px auto;
  margin-top: 20px;
  height: 48px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1.0)};
`;

export const ButtonText = styled(NunitoBold)`
  color: #fff;
  font-size: 14px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
`;
