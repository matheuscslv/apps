import styled from 'styled-components/native';
import * as Animatable from 'react-native-animatable';
import CheckBox from 'react-native-check-box';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled(Animatable.View).attrs({
  animation: 'fadeIn',
})`
  background-color: #fff;
  flex: 1;
  justify-content: center;
`;

export const Checkbox = styled(CheckBox)`
  margin-top: 10px;
`;

export const BoxBottom = styled.View`
  margin-top: 15px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-horizontal: 15px;
`;

export const BoxBottom2 = styled.View`
  margin-top: 65px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  margin-horizontal: 15px;
`;

export const Form = styled.View`
  margin-vertical: 15px;
  margin-horizontal: 15px;
`;

export const Login = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #8B0000;
  border-radius: 50px;
  height: 60px;
  width: 60px;
  opacity: ${props => (props.disabled ? '0.5' : '1.0')};
`;

export const Button = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 45px;
  color: #8B0000;
  margin-bottom: 35px;
`;

export const Error = styled.Text`
  margin-top: 5px;
  font-size: 12px;
  color: #f00;
`;

export const TextButton = styled.Text`
  font-size: 24px;
  color: #8B0000;
`;

export const Span = styled.Text`
  font-size: 14px;
  color: #8B0000;
`;

export const InputEmail = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.error ? '#f00' : '#aaa')};
  height: 50px;
`;

export const InputPassword = styled.TextInput`
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.error ? '#f00' : '#aaa')};
  height: 50px;
`;

export const Logo = styled.Image`
  width: 250px;
  height: 100px;
`;

export const Header = styled.View`
  align-items: center;
  justify-content: center;
`;

export const BackButton = styled.TouchableOpacity.attrs({
  hitSlop: {
    top: 10, left: 10, right: 10, bottom: 10,
  },
})`
position: absolute;
left: 20px;
top: ${getStatusBarHeight() + 30}px;
border: 1px solid #8b0000;
border-radius: 50px;
padding: 4px
`;
