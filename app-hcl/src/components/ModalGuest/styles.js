import FAIcon from 'react-native-vector-icons/FontAwesome';

import styled from 'styled-components/native';

import { Nunito, PlatformType } from '~/styles';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
`;

export const Content = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: PlatformType === 'ios' ? 'padding' : 'height',
})`
  margin: 0 40px;
  background: #fff;
  border-radius: 4px;
`;

export const Header = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;

  border-bottom-color: #222;
  border-bottom-width: 1px;
`;

export const HeaderTitle = styled(Nunito)`
  text-transform: uppercase;
  font-size: 16px;
`;

export const IconClose = styled(FAIcon).attrs({
  name: 'remove',
})`
  color: #222;
  font-size: 25px;
`;

export const FormContent = styled.View`
  padding: 10px 20px;
`;
