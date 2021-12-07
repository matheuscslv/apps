import Icon from 'react-native-vector-icons/AntDesign';

import styled from 'styled-components/native';

import { colors, NunitoSemiBold, Nunito } from '~/styles';

export const Container = styled.View`
  background: ${colors.background};
  flex: 1;
`;

export const Item = styled.View`
  padding: 20px;
  background: #ffff;
  margin-bottom: 5px;
`;

export const HeaderCard = styled.View`
  justify-content: center;
  align-items: center;
`;

export const IconeCheck = styled(Icon).attrs(props => ({
  name:
    props.status === 'Pagamento Falhou' && props.status !== 'Cancelado'
      ? 'closecircleo'
      : 'checkcircleo',
}))``;

export const Title = styled(NunitoSemiBold)`
  line-height: 25px;
`;

export const SubTitle = styled(Nunito)`
  line-height: 25px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  padding-top: 15px;
  height: 34px;
  border-top-width: 0.5px;
  border-top-color: #ccc;
`;

export const ButtonText = styled.Text`
  color: ${colors.primary};
  text-align: center;
`;
