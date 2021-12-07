import Image from 'react-native-image-progress';
import { CustomCachedImage } from 'react-native-img-cache';
import ProgressBar from 'react-native-progress/Bar';
import FaIcon from 'react-native-vector-icons/FontAwesome';
import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Content = styled.View`
  padding: 20px;
`;

export const ImageProduct = styled(CustomCachedImage).attrs({
  component: Image,
  indicator: ProgressBar,
})`
  width: 100%;
  height: 190px;
`;

export const Name = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: 24px;
`;

export const Category = styled.Text`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const Description = styled.Text`
  margin: 15px 0;
  color: ${({ theme }) => theme.colors.darker};
  font-family: ${({ theme }) => theme.fonts.regular};
  text-align: justify;
`;

export const TitleFooter = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0;
`;

export const Action = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})``;

export const Icon = styled(FaIcon)`
  color: ${({ disabled, theme }) =>
    disabled ? theme.colors.light : theme.colors.primary};
`;

export const Amount = styled.Text`
  color: ${({ theme }) => theme.colors.darker};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 14px;
  margin: 0 15px;
`;

export const NoStock = styled.Text`
  color: ${({ theme }) => theme.colors.danger};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 10px;
`;
