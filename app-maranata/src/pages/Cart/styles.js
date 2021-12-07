import { Platform } from 'react-native';

import styled, { css } from 'styled-components';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const ContentPayment = styled.View`
  background-color: ${({ theme }) => theme.colors.white};
  padding-top: 5px;

  elevation: 20;

  shadow-color: #000;
  shadow-offset: 0 10px;
  shadow-opacity: 0.51;
  shadow-radius: 13.16px;
`;

export const Item = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
`;

export const Total = styled.Text`
  padding: 0 30px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.darker};
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const Amount = styled(Total)`
  color: ${({ theme }) => theme.colors.darker};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const SelectPayment = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 5px 0;
`;

export const Replace = styled(Total)`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Payment = styled.View``;

export const TypePayment = styled(Total)`
  color: ${({ theme }) => theme.colors.subtitle};
  font-size: 14px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  height: 54px;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const IsEmptyContainer = styled.View`
  height: ${({ theme }) => theme.screen.height - 160}px;
  justify-content: center;
  align-items: center;
`;

export const IsEmptyImage = styled.Image`
  height: 100px;
  width: 100px;
`;

export const IsEmptyText = styled.Text`
  font-size: 20px;
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.bold};
`;
