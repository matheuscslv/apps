import styled from 'styled-components/native';

export const Content = styled.View`
  background: ${({ theme }) => theme.colors.white};
  height: 100px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  padding: 10px 20px;
`;

export const Loading = styled.ActivityIndicator`
  color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.subtitle};
  padding-top: 20px;
  font-size: 14px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;
