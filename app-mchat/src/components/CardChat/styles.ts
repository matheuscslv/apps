import { ViewProps } from 'react-native';

import TooltipView from '@components/Tooltip';
import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  background: ${({ theme }) => theme.colors.white};
  padding: 15px;

  border-bottom-color: ${({ theme }) => theme.colors.lighter};
  border-bottom-width: 1px;
`;

export const ContentContact = styled.View`
  flex: 1;
  padding-right: 10px;
`;

export const Contact = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.title};
`;

export const Message = styled.Text`
  margin-top: 7px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.regular};
`;

export const ContentInfo = styled.View`
  width: 20%;
  flex-direction: column;
  align-items: flex-end;
`;

export const Hour = styled.Text`
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.subtitle};
`;

export const Tooltip = styled(TooltipView)<ViewProps>`
  margin-top: auto;
`;
