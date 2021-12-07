import { Platform } from 'react-native';

import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios' ? 'padding' : undefined,
  enabled: true,
})`
  background: ${({ theme }) => theme.colors.white};
  border-radius: 5px;
`;

export const Header = styled.View`
  background: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  justify-content: center;
  align-items: center;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 14px;
`;

export const Form = styled.View`
  padding: 30px 10px;
`;

export const Input = styled.TextInput`
  height: 42px;
  background: #e9e9e9;
  border-radius: 5px;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.title};
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.regular};
  align-self: stretch;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  height: 42px;
  background: ${({ theme }) => theme.colors.success};
  border-radius: 5px;
  padding: 0 10px;
  color: ${({ theme }) => theme.colors.title};
  margin-top: 20px;

  justify-content: center;
  align-items: center;

  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
  elevation: 5;
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
`;
