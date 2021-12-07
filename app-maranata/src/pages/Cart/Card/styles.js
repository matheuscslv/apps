import Image from 'react-native-image-progress';
import { CustomCachedImage } from 'react-native-img-cache';
import ProgressBar from 'react-native-progress/Bar';
import Icon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

export const Container = styled.View`
  background: ${({ theme }) => theme.colors.background};
  flex-direction: row;
  padding: 20px;
  height: 140px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
  border-bottom-width: 1.5px;
`;

export const ImageFood = styled(CustomCachedImage).attrs({
  component: Image,
  indicator: ProgressBar,
})`
  height: 100%;
  width: 80px;
  border-radius: 4px;
`;

export const Info = styled.View`
  margin-left: 15px;
  flex: 1;
`;

export const TitleFood = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.bold};
  letter-spacing: 0.6px;
`;

export const CategoryFood = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-top: 3px;
  text-transform: capitalize;
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
`;

export const Amount = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Action = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  justify-content: center;
  align-items: center;
  height: 20px;
  width: 20px;
  border-radius: 13px;
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.colors.light : theme.colors.primary};
`;

export const ActionIcon = styled(Icon).attrs({
  size: 10,
})`
  padding: 0;
  margin: 0;
  text-align: center;
  color: ${({ theme }) => theme.colors.white};
`;

export const NumberItem = styled.Text`
  margin: 0 20px;
  color: ${({ theme }) => theme.colors.black};
  font-family: ${({ theme }) => theme.fonts.semibold};
  text-align: center;
`;

export const Price = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.semibold};
`;
