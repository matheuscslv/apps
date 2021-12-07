import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '~/styles';

export const Container = styled.View`
  background-color: #fff;
  elevation: 5;
  border-radius: 4px;
  margin: 7px;
  padding: 20px;
`;

export const TitleCard = styled.Text`
  color: #444;
  font-size: 15px;
  margin-bottom: 20px;
`;

export const ViewImage = styled.View`
  flex-direction: row;
  align-items: center;
  width: 35%;
  justify-content: space-around;
`;

export const IndexText = styled.Text`
  color: ${colors.primary};
  font-size: 25px;
  text-align: center;
`;

export const ImageProduct = styled.Image`
  height: 70px;
  width: 70px;
`;

export const Card = styled.TouchableOpacity`
  flex-direction: row;
  margin: 15px 0;
  justify-content: space-between;
`;

export const TitleProduct = styled.Text`
  color: #444;
  font-size: 15px;
  font-weight: bold;
`;

export const Content = styled.View`
  justify-content: space-between;
  width: 60%;
`;

export const ContentPrice = styled.View`
  justify-content: space-between;
  flex-direction: row;
  align-items: flex-end;
`;

export const Price1 = styled.Text`
  color: #111;
  font-size: 14px;
  font-weight: bold;
`;
export const Price2 = styled.Text`
  color: #111;
  font-size: 11px;
  margin-top: 4px;
`;
export const PriceSmall = styled.Text`
  color: #111;
  font-size: 10px;
`;
export const Favorite = styled(Icon).attrs({
  name: 'plus',
  color: colors.primary,
})``;
