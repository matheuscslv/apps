import styled from 'styled-components/native';

export const Container = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 14px;
  padding: 40px;
  text-align: center;
  color: ${({ theme }) => theme.colors.darker};
  line-height: 28px;
`;
