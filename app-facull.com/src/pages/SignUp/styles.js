import { StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import styled from 'styled-components/native';

import { colors, PlatformType, Nunito } from '~/styles';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: 'heigth',
})`
  background: ${colors.background};
  justify-content: center;
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  height: 44px;
`;

export const HeaderText = styled(Nunito)`
  margin-top: 20px;
  color: ${colors.primary};
  font-size: 20px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

export const Content = styled.View`
  padding: 5px 40px;
  margin: 0 0 20px 0;
`;

export const ContainerTwoInput = styled.View`
  flex-direction: row;
  align-items: center;
  height: 44px;
  flex: 1px;
  justify-content: space-between;
  margin: 12px 0;
`;

export const Actions = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 25px;
`;

export const SignUpButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 44px;
  background-color: ${colors.primary};
  align-items: center;
  justify-content: center;
  width: 70%;
  align-self: center;
  border-radius: 2px;
  opacity: ${({ disabled }) => (disabled ? 0.4 : 1)};
`;

export const SignUpText = styled.Text`
  font-weight: bold;
  color: #fff;
`;

export const SignInButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  height: 44px;
  justify-content: center;
  border-radius: 2px;
  border-width: 1px;
  align-items: center;
  justify-content: center;
  width: 70%;
  border-color: ${colors.primary};
`;

export const SignInText = styled.Text`
  font-weight: bold;
  color: ${colors.primary};
`;

export const OrText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: ${colors.subTitleColor};
  margin: 15px 0;
`;
