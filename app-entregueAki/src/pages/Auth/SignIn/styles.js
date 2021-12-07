import { StyleSheet } from 'react-native';

import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, PlatformType } from '~/styles';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: 'height',
})`
  background: ${colors.background};
  flex: 1;
  justify-content: center;
  padding:20px 0;
`;

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  margin-top:20px;
  height: 100px;
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
  font-family:"Quicksand-Regular";
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
  color: ${colors.primary};
  font-family:"Quicksand-Bold";
`;

export const OrText = styled.Text`
  text-align: center;
  font-size: 12px;
  color: ${colors.subTitleColor};
  margin: 20px 0;
  font-family:"Quicksand-Regular";
`;




export const ContentAuth = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 0 20px;
  margin-top: 10px;
`;

export const Button1 = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  align-items: center;
  flex-direction: row;
  border-radius: 2px;
  background: ${props => props.bk};
  width: 45%;
  height: 44px;
  padding: 10px;
  margin:10px;
`;

export const IconButton = styled(Icon).attrs({
  color: '#fff',
  size: 22,
})`
  margin-left: 10px;
`;

export const TextButton = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: bold;
`;
