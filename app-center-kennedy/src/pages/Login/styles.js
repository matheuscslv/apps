import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {colors} from '~/styles';

export const Container = styled.SafeAreaView`
  justify-content: center;
  flex: 1;
`;

export const Title = styled.Text`
  color: #333;
  font-weight: bold;
  margin: 20px 10px;
  text-align: center;
`;

export const Content = styled.View`
  flex-direction: row;
  justify-content: space-around;
  padding: 0 20px;
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

export const TitleSmall = styled.Text`
  margin-top: 10px;
  font-size: 12px;
  text-align: center;
`;

export const Button2 = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  background: ${colors.primary};
  margin: 0 20px;
  border-radius: 2px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;
