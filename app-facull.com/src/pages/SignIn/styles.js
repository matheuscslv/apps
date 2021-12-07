import { StyleSheet } from 'react-native';

import styled from 'styled-components/native';

import { colors, PlatformType } from '~/styles';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: 'height',
})`
  background: ${colors.background};
  flex: 1;
  justify-content: center;
  padding-bottom: 70px;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 135px;
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
  color: #fb8000;
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
  border-color: ${colors.primary};
`;

export const SignUpText = styled.Text`
  font-weight: bold;
  color: ${colors.primary};
`;

export const OrText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: ${colors.subTitleColor};
  margin: 20px 0;
`;
