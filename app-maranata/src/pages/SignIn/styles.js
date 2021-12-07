import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: Platform.OS === 'ios',
  behavior: 'height',
})`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
  justify-content: center;
  padding-bottom: 70px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 75px;
  width: 100%;
`;

export const Header = styled.View`
  align-items: center;
`;

export const Content = styled.View`
  padding: 5px 40px;
  margin: 0 0 20px 0;
`;

export const ForgotPasswordButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-self: flex-end;
  margin-top: 30px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Actions = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

export const SignUpButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 44px;
  justify-content: center;
  border-radius: 2px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  width: 60%;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const SignUpText = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const OrText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtitle};
  margin: 20px 0;
`;
