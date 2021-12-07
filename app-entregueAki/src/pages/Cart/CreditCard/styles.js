import { TextInputMask } from 'react-native-masked-text';

import styled from 'styled-components/native';

import { NunitoBold, colors, PlatformType } from '~/styles';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: 'height',
})`
  background: #fff;
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({})``;

export const Content = styled.View`
  padding: 10px;
`;

export const Header = styled.TouchableOpacity.attrs({
  style: {
    shadowOffset: { width: 0, height: 2 },
  },
})`
  flex-direction: row;
  background: ${colors.primary};
  height: 60px;
  align-items: center;
  padding: 20px;
  elevation: 5;
  shadow-color: #000;
  shadow-opacity: 0.25;
  shadow-radius: 3.84px;
`;

export const HeaderTitle = styled(NunitoBold)`
  font-size: 16px;
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

export const Label = styled.Text`
  color: ${colors.titleColor};
  font-size: 14px;
  margin-top: 10px;
`;

export const InputNumber = styled(TextInputMask).attrs({
  type: 'credit-card',
})`
  flex: 1;
  padding: 0;
  height: 44px;
  padding: 0 10px;
  color: #000;
`;

export const ImageCard = styled.Image`
  height: 35px;
  width: 40px;
`;

export const InputCode = styled(TextInputMask).attrs({
  type: 'custom',
  options: {
    mask: '999',
  },
})`
  border-bottom-width: 1.5px;
  border-bottom-color: #f1f1f1;
  height: 44px;
  padding: 0 10px;
  width: 40%;
  color: #000;
`;

export const InputValid = styled(TextInputMask).attrs({
  type: 'datetime',
  options: {
    format: 'MM/YYYY',
  },
})`
  border-bottom-width: 1.5px;
  border-bottom-color: #f1f1f1;
  height: 44px;
  width: 40%;
  padding: 0 10px;
  color: #000;
`;

export const InputMask = styled(TextInputMask)`
  border-bottom-width: 1.5px;
  border-bottom-color: #f1f1f1;
  height: 44px;
  padding: 0 10px;
  margin-bottom: 10px;
  color: #000;
`;

export const InputName = styled.TextInput`
  border-bottom-width: 1.5px;
  border-bottom-color: #f1f1f1;
  height: 44px;
  padding: 0 10px;
  margin-bottom: 10px;
  color: #000;
`;

export const CheckContainer = styled.View`
  margin: 15px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const CheckTitle = styled.Text`
  font-size: 15px;
  color: #444;
  font-weight: bold;
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
