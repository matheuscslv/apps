import Dash from 'react-native-dash';

import styled from 'styled-components/native';

import { colors, NunitoSemiBold, Nunito, NunitoBold } from '~/styles';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
  },
})``;

export const ContentView = styled.View`
  border-radius: 4px;
  background: #fff;
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

  background: ${({ status }) => {
    switch (status.toUpperCase()) {
      case 'AGUARDANDO PAGAMENTO':
        return colors.danger;
      case 'PAGAMENTO CONFIRMADO':
        return colors.success;
      case 'EM PROCESSAMENTO':
        return colors.secundary;
      case 'AGUARDANDO RETIRADA':
        return colors.regular;
      case 'SAIU PARA ENTREGA':
        return colors.success;
      case 'FINALIZADO':
        return colors.success;
      case 'PAGAMENTO NÃO AUTORIZADO':
        return colors.danger;
      default:
        return colors.danger;
    }
  }};
`;

export const StatusName = styled(NunitoBold)`
  letter-spacing: 1px;
  color: #fff;
`;

export const Header = styled.View`
  align-items: center;
  margin: 20px auto;
`;

export const HeaderTitle = styled(NunitoSemiBold)`
  font-size: 20px;
  line-height: 30px;
`;

export const Content = styled.View`
  margin: 0 15px;
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
  flex:1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 20px 5px;
  flex: 1;
`;

export const Title = styled(Nunito)`
  font-size: 15px;
  width: 50%;
`;

export const Value = styled(NunitoBold)`
  font-size: 15px;
  color: #333;
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
  background-color: ${colors.primary};
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const Address = styled(NunitoSemiBold)`
  margin-bottom: 15px;
  text-align: center;
`;

export const StepIndicator = styled.View`
  padding: ${props => props.current ? 10 : 10}px;
  border-radius: 20px;
  background-color: ${props => props.current ? props.finalizado ? '#080' : '#fff' : '#080'};
  border-width: 1px;
  border-color: #080;
  margin: 10px;
`;
