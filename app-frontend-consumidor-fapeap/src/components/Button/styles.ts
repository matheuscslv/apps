import { RectButton } from 'react-native-gesture-handler';

import styled from 'styled-components/native';

interface IButtonTextProps {
  color?: string;
}

export const Container = styled(RectButton)`
  border-radius: ${({ theme }) => theme.metrics.border}px;
  height: 44px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  padding: 0 20px;
`;

export const ButtonText = styled.Text<IButtonTextProps>`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.Ubuntu.normal};
  color: ${({ theme, color }) => color || theme.colors.white};
`;
