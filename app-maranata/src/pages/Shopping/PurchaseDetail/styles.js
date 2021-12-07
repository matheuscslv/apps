import Dash from 'react-native-dash';

import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

export const ContentView = styled.View`
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.white};
  margin: 20px;
  elevation: 5;
  shadow-color: #000;
  shadow-offset: 0 2px;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const ContentStatus = styled.View`
  padding: 10px;
  flex-direction: column;
  align-items: center;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;

  background: ${({ status, theme }) => {
    switch (status.toUpperCase()) {
      case 'AGUARDANDO PAGAMENTO':
        return theme.colors.danger;
      case 'PAGAMENTO CONFIRMADO':
        return theme.colors.success;
      case 'EM PROCESSAMENTO':
        return theme.colors.secundary;
      case 'AGUARDANDO RETIRADA':
        return theme.colors.regular;
      case 'SAIU PARA ENTREGA':
        return theme.colors.success;
      case 'FINALIZADO':
        return theme.colors.success;
      case 'PAGAMENTO NÃO AUTORIZADO':
        return theme.colors.danger;
      default:
        return theme.colors.regular;
    }
  }};
`;

export const StatusName = styled.Text`
  letter-spacing: 1px;
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Header = styled.View`
  align-items: center;
  margin: 20px auto;
`;

export const HeaderTitle = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semibold};
  font-size: 20px;
  line-height: 30px;
`;

export const Content = styled.View`
  margin: 0 25px;
`;

export const ContainerTransaction = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  border-radius: 1px;
  margin: 20px 0;
`;

export const Item = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 5px;
  flex: 1;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: 15px;
  width: 50%;
`;

export const Value = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const ContainerInfo = styled.View`
  margin: 20px 0;
`;

export const DashedBorder = styled(Dash).attrs({
  dashColor: '#ccc',
})`
  height: 1px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  margin: 20px 0;
  align-items: center;
  border-radius: 2px;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: bold;
`;

export const Address = styled.Text`
  margin: 15px;
  text-align: center;
  color: ${({ theme }) => theme.colors.title};
  font-family: ${({ theme }) => theme.fonts.semibold};
`;
