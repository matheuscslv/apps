import styled from 'styled-components/native';
import {colors} from '~/styles';

export const ContainerModal = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0 20px;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const ViewModal = styled.KeyboardAvoidingView`
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

export const InputContainer = styled.KeyboardAvoidingView`
  margin-top: 5px;
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;
export const InputFrete = styled.TextInput.attrs({
  placeholderTextColor: '#999',
})`
  color: #444;
  padding: 0 5px;
  width: ${({wdth}) => (wdth ? wdth : '100')}%;
  height: 44px;
  font-size: 14px;
  border-bottom-color: ${({error}) => (error ? '#f00' : '#eee')};
  border-bottom-width: 1px;
`;

export const Error = styled.Text`
  font-size: 10px;
  color: #f00;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${colors.primary};
`;
