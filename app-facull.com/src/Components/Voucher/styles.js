import { TextInputMask } from 'react-native-masked-text';

import styled from 'styled-components/native';

import { NunitoBold, colors, PlatformType } from '~/styles';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: 'height',
})`
  margin-top: 70px;
  background: #fff;
  flex: 1;
`;

export const Content = styled.View`
  margin-top: 20px;
  padding: 20px;
`;

export const Header = styled.TouchableOpacity.attrs({
  style: {
    shadowOffset: { width: 0, height: 2 },
  },
})`
  flex-direction: row;
  background: ${colors.primary}
  height: 70px;
  align-items: center;
  padding: 20px 20px;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const HeaderTitle = styled(NunitoBold)`
  font-size: 20px;
  margin-left: 20px;
  color: #fff;
`;

export const InputContainer = styled.View`
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1.5px;
  border-bottom-color: #f1f1f1;
  height: 44px;
`;

export const InputContainer2 = styled.View`
  margin: 15px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 44px;
`;

export const InputNumber = styled.TextInput`
  flex: 1;
  padding: 0;
  text-align: center;
  height: 44px;
  padding: 0 10px;
`;

export const ImageCard = styled.Image`
  height: 35px;
  width: 40px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary};
  padding: 10px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  color: #fff;
  font-weight: bold;
`;

export const Span = styled.Text`
  font-size: 12px;
  color: #444;
  text-align: center;
  margin-top: 20px;
`;
