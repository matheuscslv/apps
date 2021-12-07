import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';
import {colors} from '~/styles';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  justify-content: center;
`;

export const Center = styled.View`
  justify-content: center;
  align-items: center;
`;

export const Image = styled.Image`
  height: 150px;
  width: 150px;
  justify-content: center;
  align-items: center;
`;

export const EmailInput = styled(TextInputMask).attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
})`
  background-color: #f9f9f9;
  border-radius: 5px;
  height: 40px;
  width: 100%;
  color: #000;
  text-align: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 15px;
  padding-bottom: 0;
  padding-top: 0;
  font-family: 'Quicksand-Regular';
`;

export const PasswordInput = styled.TextInput`
  background-color: #eee;
  border-radius: 25px;
  height: 40px;
  width: 100%;
  color: ${colors.regular};
  text-align: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 15px;
  padding-bottom: 0;
  padding-top: 0;
  font-family: 'Quicksand-Regular';
`;

export const Buttons = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const EnterButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  border-radius: 25px;
  height: 40px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const RecoveryButton = styled.Text`
  font-size: 16;
  justify-content: center;
  align-items: center;
  font-family: 'Quicksand-Regular';
`;

export const TextButton = styled.Text`
  color: #fff;
  font-size: 20;
  font-family: 'Quicksand-Bold';
`;
