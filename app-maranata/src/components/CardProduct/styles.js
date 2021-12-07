import Image from 'react-native-image-progress';
import { CustomCachedImage } from 'react-native-img-cache';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styled from 'styled-components/native';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-top: 10px;
  padding: 15px;
  width: ${({ theme }) => theme.screen.width / 2 - 30}px;
  border-width: ${(props) => (props.border ? 1 : 0)};
  border-color: ${(props) => (props.border ? '#eee' : 'transparent')};
  border-radius: 4px;
`;

export const ImageProduct = styled(CustomCachedImage).attrs({
  component: Image,
  indicator: ProgressBar,
})`
  align-self: center;
  height: 80px;
  width: 80px;
`;
export const TitleProduct = styled.Text`
  margin-top: 10px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 14px;
  text-transform: capitalize;
`;

export const DescriptionProduct = styled.Text`
  margin: 10px 0;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  letter-spacing: 0.4px;
  font-size: 10px;
`;

export const Footer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Action = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const ContentPrice = styled.View``;

export const Price1 = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 13px;
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 12px;
`;

export const Price2 = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 10px;
  margin-top: 4px;
`;
export const PriceSmall = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 9px;
`;
export const Favorite = styled(Icon).attrs({
  name: 'cart',
})`
  color: ${({ theme }) => theme.colors.primary};
`;
