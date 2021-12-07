import styled from 'styled-components/native';

interface Iprops {
  color: string;
}

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`;

export const Header = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  min-height: 150px;
  width: 100%;
  background: #fff;
  padding: 0 20px;
`;

export const Image = styled.Image`
  width: 150px;
  height: 150px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const TextQuantity = styled.Text`
  color: ${(props) => props.theme.colors.primary};
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
`;

export const Subtitle = styled.Text`
  font-size: 10px;
  font-family: ${(props) => props.theme.fonts.Ubuntu.normal};
  color: ${(props) => props.theme.colors.subtitle};
`;

export const Content = styled.View`
  padding: 20px;
`;

export const CardInformation = styled.View`
  padding: 20px;
  border-width: 1px;
  border-color: #999;
  border-radius: 10px;
`;

export const Left = styled.View``;

export const Right = styled.View``;

export const Button = styled.TouchableOpacity`
  width: 50%;
  height: 35px;
  padding: 10px;
  background: ${(props) => props.theme.colors.primary};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
  font-size: 11px;
`;

export const BasketDeliveryCard = styled.TouchableOpacity<Iprops>`
  flex: 1;
  padding: 5px;
  border-width: 2px;
  border-color: ${(props) => props.color};
  margin: 0 0 20px 10px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: 10px;
`;

export const TextCard = styled.Text<Iprops>`
  color: ${(props) => props.color};
  font-family: ${(props) => props.theme.fonts.Ubuntu.bold};
`;
