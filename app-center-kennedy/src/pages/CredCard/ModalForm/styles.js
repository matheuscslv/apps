import styled from 'styled-components/native';
import {colors} from '~/styles';
import {TextInputMask} from 'react-native-masked-text';

export const ContainerModal = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.1);
`;

export const ViewModal = styled.View`
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #f6f6f6;
  padding: 10px 20px;
  width: 100%;
`;

export const TitleModal = styled.Text`
  color: #555;
  font-size: 18px;
  margin: 10px 0;
`;

export const Buttons = styled.View`
  justify-content: space-around;
  flex-direction: row;

  padding-top: 20px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 54px;
  width: 40%;
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

export const InputContainer = styled.View`
  border-bottom-color: ${({error}) => (error ? '#f00' : '#999')};
  border-bottom-width: 1px;
  margin-top: 5px;
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

export const InputContainer2 = styled.View`
  margin-top: 5px;
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;

export const Error = styled.Text`
  font-size: 10px;
  color: #f00;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: #444;
`;

export const Input = styled.TextInput`
  height: 44px;
  padding-left: 5px;
`;

export const InputMask = styled(TextInputMask)`
  height: 44px;
  padding-left: 5px;
`;
