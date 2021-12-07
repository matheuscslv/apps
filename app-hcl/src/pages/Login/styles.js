import styled from 'styled-components/native';
import { Animated } from 'react-native';
import { colors, PlatformType } from '~/styles';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: PlatformType === 'ios' ? 'padding' : 'height',
})`
  flex: 1;
  background: ${colors.background};
`;

export const BackgroundImage = styled(Animated.View)`
  background:${colors.secundary};
  width: 100%;
  border-bottom-width: 10px;
  border-bottom-color: ${colors.primary};
  justify-content: center;
  align-items: center;
`;

export const ImageLogo = styled(Animated.Image)`
`;

export const FormContent = styled.View`
  margin: auto 40px;
`;
