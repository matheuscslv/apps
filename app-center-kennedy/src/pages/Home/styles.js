import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '~/styles';

export const Container = styled.SafeAreaView`
  background: #ffff;
  flex: 1;
`;

export const ContentSearch = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  background: #fff;
  flex: 1;
  margin: 0 20px;
  height: 34px;
  border-radius: 20px;
`;

export const TitleSearch = styled.Text`
  margin-left: 15px;
`;

export const InputSearch = styled.TextInput`
  padding: 0 15px;
`;

export const IconSearch = styled(Icon).attrs({
  name: 'magnify',
  color: '#999',
})`
  margin-right: 15px;
`;

export const ViewEmpresa = styled.View`
  margin-top: 10px;
  padding: 10px;
`;

export const Banner = styled.Image`
  height: 150px;
  margin: 5px 0;
  width: 100%;
`;

export const ContainerAll = styled.View`
  background-color: #fff;
  elevation: 5;
  border-radius: 4px;
  margin: 7px;
  padding: 10px 0;
`;

export const TitleCard = styled.Text`
  color: #444;
  font-size: 15px;
  margin: 7px;
  padding-left: 20px;
`;

export const CardNotification = styled.KeyboardAvoidingView`
  padding: 10px;
  background: #fff;
  margin: 7px;
  border-radius: 4px;
  elevation: 5;
`;

export const Title = styled.Text`
  color: #444;
  font-size: 15px;
  margin-bottom: 20px;
  font-weight: bold;
`;

export const Input = styled.TextInput`
  padding: 5px 10px;
  height: 44px;
  width: 65%;
  font-size: 14px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  align-self: center;
  justify-content: center;
  align-items: center;
  height: 44px;
  width: 30%;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border-width: 1px;
  padding: 0 15px;
  border-color: ${colors.primary};
  background: ${props =>
    props.background ? props.background : colors.primary};
  opacity: ${props => (props.disabled ? '0.6' : '1.0')};
`;

export const ButtonText = styled.Text`
  color: ${({color}) => (color ? colors.primary : '#FFF')};
  font-weight: bold;
  text-transform: uppercase;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  border-width: 1px;
  border-color: ${colors.primary};
  align-items: center;
  justify-content: space-between;
  height: 44px;
  border-radius: 4px;
`;
