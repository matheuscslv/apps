import styled from 'styled-components/native';

import {
  NunitoSemiBold,
  colors,
  PlatformType,
  NunitoBold,
  Nunito,
} from '~/styles';

export const Container = styled.ScrollView.attrs({
  contentContainerStyle: { paddingBottom: 40 },
})`
  background: #fff;
  flex: 1;
`;

export const Header = styled.View`
  background: ${colors.secundary};
`;

export const Avatar = styled.ImageBackground.attrs({
  imageStyle: { borderRadius: 70 },
})`
  height: 140px;
  width: 140px;
  border-radius: 70px;
  align-self: center;
`;

export const ButtonReplaceAvatar = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  position: absolute;
  right: 0px;
  bottom: 0px;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
  padding: 5px;
`;

export const Name = styled(NunitoBold)`
  color: ${colors.primary};
  text-transform: capitalize;
  font-size: 16px;
  margin: 10px auto 5px auto;
`;

export const Email = styled(Nunito)`
  color: ${colors.primary};
  margin: 0 auto 15px auto;
`;

export const EditionContent = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: PlatformType === 'ios' ? 'padding' : 'height',
})`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: #f1f1f1;
  padding: 0 30px
  height: 64px;
`;

export const LabelEdition = styled(NunitoSemiBold)`
  text-transform: uppercase;
`;

export const FormContent = styled.View`
  padding: 0 30px;
`;

export const ContainerPosition = styled.View``;

export const Info = styled(NunitoSemiBold)`
  color: #666;
  font-size: 12px;
  margin: 5px auto 0 auto;
`;
