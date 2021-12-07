import styled, { css } from 'styled-components/native';
import { TextInputMask } from 'react-native-masked-text';
import { colors, metrics } from '~/styles';

export const Form = styled.View`
  padding: 15px 0;
`;

export const InputLabel = styled.Text`
  font-size: 12px;
  color: #33383e;
  font-weight: bold;
  margin-bottom: 2px;
`;

export const Input = styled.TextInput.attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
})`
  border-width: 1px;
  border-color: ${colors.regular};
  border-radius: ${metrics.baseRadius}px;
  height: 32px;
  padding: 5px 8px;
  margin: 0 0 ${({ error }) => (error ? '0px' : '10px')};
`;

export const InputComplaint = styled.TextInput.attrs({
  multiline: true,
  maxLength: 255,
  numberOfLines: 5,
  textAlignVertical: 'top',
  autoCapitalize: 'none',
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
})`
  border-width: 1px;
  border-color: ${colors.regular};
  border-radius: ${metrics.baseRadius}px;
  height: 130px;
  padding: 4px 8px;
  margin: 0 0 ${({ error }) => (error ? '0px' : '10px')};
`;

export const BoxButton = styled.View`
  margin-top: 2px;
  align-items: center;
  justify-content: center;
`;

export const ButtonSend = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  background-color: #8b0000;
  border-radius: 4px;
  height: 34px;
  width: 50%;
  opacity: ${props => (props.disabled ? '0.5' : '1.0')};
`;
export const ButtonText = styled.Text`
  color: #fff;
  font-size: 15px;
`;

export const Error = styled.Text`
  font-size: 11px;
  color: #f00;
  margin: 2px 0px 4px;
`;

export const TellInput = styled(TextInputMask).attrs({
  autoCapitalize: 'none',
  autoCorrect: false,
  underlineColorAndroid: 'transparent',
})`
  border-width: 1px;
  border-color: ${colors.regular};
  border-radius: ${metrics.baseRadius}px;
  height: 32px;
  padding: 5px 8px;
  margin: 0 0 ${({ error }) => (error ? '0px' : '10px')};
`;
