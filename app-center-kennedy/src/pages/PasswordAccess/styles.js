import styled from 'styled-components/native';
import {colors} from '~/styles';
import {TextInputMask} from 'react-native-masked-text';

export const Container = styled.View`
  padding: 20px;
`;

export const Card = styled.View`
  margin: 20px;
`;

export const InputContainer = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.primary};
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  color: ${colors.primary};
  font-size: 15px;
  font-weight: bold;
`;

export const Error = styled.Text`
  color: #8b0000;
  font-size: 12px;
  font-weight: normal;
`;

export const Input = styled.TextInput`
  height: 44px;
  padding-left: 5px;
`;

export const InputMask = styled(TextInputMask)`
  height: 44px;
  padding-left: 5px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  margin-top: 20px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 54px;
  border-width: 1px;
  border-color: ${colors.primary};
  background: ${props =>
    props.background ? props.background : colors.primary};
  opacity: ${props => (props.disabled ? '0.6' : '1.0')};
`;

export const ButtonText = styled.Text`
  color: ${({color}) => (color ? colors.primary : '#FFF')};
  font-weight: bold;
`;
