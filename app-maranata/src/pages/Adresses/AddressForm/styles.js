import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: Platform.OS === 'ios',
  behavior: 'padding',
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
  font-family: ${({ theme }) => theme.fonts.semibold};
  line-height: 24px;
  margin: 5px 0;
`;

export const ContainerTwoInput = styled.View`
  flex-direction: row;
  align-items: center;
  height: 44px;
  justify-content: space-between;
  margin: 12px 0;
`;

export const ContentIput = styled.View``;
