import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
`;

export const Logo = styled.Image.attrs({})`
  width: ${({ theme }) => theme.screen.width}px;
  height: ${({ theme }) =>
    Platform.OS === 'ios'
      ? theme.screen.height - 180
      : theme.screen.height - 150}px;
  align-items: center;
  justify-content: center;
`;
