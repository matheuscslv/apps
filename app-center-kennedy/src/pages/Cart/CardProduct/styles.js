import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const CardProductCart = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background: #fff;
  padding: 20px 10px 10px;
  border-radius: 3px;
  elevation: 5;
  margin-top: 10px;
`;

export const Content = styled.View`
  flex-direction: row;
`;

export const Image = styled.Image`
  height: 110px;
  width: 110px;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #555;
  width: 60%;
  margin-bottom: 10px;
`;

export const Detail = styled.View`
  flex-direction: row;
  align-items: center;
  height: 26px;
  width: 56%;
`;

export const Icone = styled(Icon)``;

export const DetailText = styled.Text`
  font-size: 13px;
  margin-left: 5px;
  color: #222;
`;

export const Bold = styled.Text`
  font-weight: bold;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

export const AmountContainer = styled.View``;

export const AmountText = styled.Text`
  font-size: 14px;
  color: #888;
  margin: 10px 0;
`;

export const Amount = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  width: 55%;
  border-color: #999;
  border-width: 1px;
  border-radius: 3px;
`;

export const ButtonAmount = styled.TouchableOpacity``;

export const Counter = styled.Text`
  text-align: center;
  font-size: 18px;
`;

export const Price = styled.Text`
  margin-top: 15px;
  color: #555;
  font-size: 16px;
  font-weight: bold;
`;
export const Session = styled.TouchableOpacity.attrs({
  activeOpacity: 0.3,
})`
  padding-left: 5px;
  border-top-width: 1px;
  border-top-color: #cccc;
  padding: 10px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Label = styled.Text`
  font-size: 14px;
  text-transform: uppercase;
  color: #444;
`;

export const Span = styled.Text`
  font-size: 14px;
  color: #666;
`;
