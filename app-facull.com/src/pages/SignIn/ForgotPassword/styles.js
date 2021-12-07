import styled from 'styled-components/native';

import { NunitoBold, colors, PlatformType } from '~/styles';

export const ContainerModal = styled.View`
  background: rgba(0, 0, 0, 0.4);
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: 'height',
})`
  background: #fff;
  border-radius: 2px;
  width: 80%;
`;

export const Content = styled.KeyboardAvoidingView`
  padding: 20px;
`;

export const Header = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})`
  flex-direction: row;
  background: ${colors.primary};
  height: 60px;
  align-items: center;
  padding: 20px 20px;
  justify-content: space-between;
`;

export const HeaderTitle = styled(NunitoBold)`
  font-size: 18px;

  color: #fff;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-width: 0.5px;
  border-color: ${colors.primary};
  border-radius: 2px;
  height: 44px;
  margin: 30px 0;
`;

export const InputNumber = styled.TextInput`
  flex: 1;
  padding: 0;
  text-align: center;
  height: 44px;
  padding: 0 10px;
  color: #000;
`;

export const ImageCard = styled.Image`
  height: 35px;
  width: 40px;
`;

export const Span = styled.Text`
  font-size: 12px;
  color: #666;
  text-align: center;
`;
