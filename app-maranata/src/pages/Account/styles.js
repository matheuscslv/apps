import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: Platform.OS === 'ios',
  behavior: 'heigth',
})`
  background: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
`;

export const Header = styled.View`
  height: 160px;
  justify-content: center;
`;

export const Welcome = styled.Text`
  font-size: 28px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semibold};
`;

export const Info = styled.Text`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 24px;
  margin: 5px 0;
`;

export const Content = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === 'ios',
})`
  padding: 5px 15px;
  margin: 20px 0;
`;
