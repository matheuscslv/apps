import styled from 'styled-components/native';
import { colors } from '~/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const ContainerHead = styled.View`
  background-color:${colors.background};
  padding: 10px;
`;

export const Center = styled.View`
  justify-content: center;
  align-items:center;
`;

export const Image = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-size: 16px;
  text-transform:uppercase;
  font-family:'Quicksand-Bold';
  margin:5px 0;
`;

export const Status = styled.Text`
  color: ${props => props.color};
  font-size: 13px;
  font-family:'Quicksand-Regular';
`;


export const ContentSearch = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  flex-direction: row;
  align-items: center;
  background: #fff;
  flex: 1;
`;

export const TitleSearch = styled.Text`
  color:${colors.primary};
  font-size:18px;
  font-family:"Quicksand-Regular";
`;

export const IconSearch = styled(Icon).attrs({
  name: 'magnify',
  color: colors.primary,
})`
  margin-right: 15px;
`;
