import styled, { css } from 'styled-components/native';

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
  right: 30px;
  bottom: 10px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: rgba(255, 0, 0, 0.9);
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const TooltipText = styled.Text`
  font-weight: bold;
  font-size: 10px;
  color: #fff;
`;
