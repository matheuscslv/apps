import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: space-between;
`;

export const Companies = styled.View.attrs({
  delay: 200,
  animation: 'fadeIn',
})`
  margin-top: -30px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

export const Companie = styled.View`
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({})`
  width: ${({ theme }) => theme.screen.width}px;
  height: ${({ theme }) => theme.screen.height - 140}px;
  align-items: center;
  justify-content: center;
`;

export const LogoMSB = styled.Image.attrs({})`
  width: 150px;
  height: 150px;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.Text`
  margin-top: 15px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Title = styled.Text`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.regular};
  text-transform: uppercase;
`;

export const Divider = styled.View`
  background-color: ${({ theme }) => theme.colors.border};
  align-items: center;
  justify-content: center;
  padding: 10px 0;
`;
