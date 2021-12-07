import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';
import {colors} from '~/styles';

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${colors.white};
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

export const CpfInput = styled(TextInputMask).attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
})`
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

export const EnterButton = styled.TouchableOpacity`
  background-color: ${colors.primary};
  border-radius: 25px;
  height: 40px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const TextButton = styled.Text`
  font-family: 'Quicksand-Bold';
  color: #fff;
  font-size: 20;
`;
