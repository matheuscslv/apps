import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {metrics, colors} from '~/styles';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.3,
})`
  margin-top: 10px;
  padding: 15px;
  width: ${metrics.screenWhidth / 2 - 30}px;
  border-width: ${props => (props.border ? 1 : 0)};
  border-color: ${props => (props.border ? '#eee' : 'transparent')};
  border-radius: 4px;
`;

export const ImageProduct = styled.Image`
  align-self: center;
  height: 80px;
  width: 80px;
`;
export const TitleProduct = styled.Text`
  margin-top: 10px;
  color: #444;
  font-size: 14px;
  font-weight: bold;
`;
export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 5px;
  align-items: center;
`;
export const ContentPrice = styled.View``;

export const Price1 = styled.Text`
  color: #111;
  font-size: 13px;
  font-weight: bold;
`;
export const Price2 = styled.Text`
  color: #111;
  font-size: 10px;
  margin-top: 4px;
`;
export const PriceSmall = styled.Text`
  color: #111;
  font-size: 9px;
`;
export const Favorite = styled(Icon).attrs({
  name: 'plus',
  color: colors.primary,
})``;
