import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Title = styled.Text`
  padding: 10px 20px;
  font-size: 15px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.bold};
  line-height: 25px;
`;

export const Subtitle = styled.Text`
  padding: 0 20px;
  font-size: 12px;
  color: ${({ theme }) => theme.colors.subtitle};
  font-family: ${({ theme }) => theme.fonts.regular};
  line-height: 25px;
`;
