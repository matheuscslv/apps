import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const LogoHeader = styled.Image``;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  background-color: ${({ theme }) => theme.colors.primary};
  align-self: stretch;
  margin: 0 20%;
  padding: 40px 20px 20px;
  border-radius: 5px;

  justify-content: center;
  align-items: center;

  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;

  elevation: 5;
`;

export const ButtonText = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.white};
  margin-top: 30px;
  font-size: 16px;
`;

export const LogoBottom = styled.Image``;
