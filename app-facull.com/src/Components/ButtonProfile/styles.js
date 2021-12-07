import styled, { css } from 'styled-components/native';

import { colors } from '~/styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 30px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 45px;
  background: ${({ background }) => background};
  margin-bottom: 30px;
  elevation: 5;
  z-index: 5;
  /* ${({ isFocused }) =>
    isFocused &&
    css`
      background: #6ec6af;
    `}*/ /* add shadow ios */
`;

export const Icon = styled.ImageBackground`
  height: 30px;
  width: 30px;
`;

export const Tooltip = styled.View`
  position: absolute;
  right: 13px;
  top: 10px;
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: rgba(255, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const TooltipText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #fff;
`;
