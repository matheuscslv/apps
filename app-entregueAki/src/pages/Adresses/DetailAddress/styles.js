import styled from 'styled-components/native';

import { colors, Nunito, NunitoSemiBold, PlatformType } from '~/styles';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: PlatformType === 'ios',
  behavior: 'padding',
})`
  background: ${colors.background};
  flex: 1;
`;

export const Scroll = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  showsVerticalScrollIndicator: false,
})`
  flex: 1;
  margin-bottom:10px;

`;

export const Header = styled.View`
  height: 160px;
  justify-content: center;
`;

export const Welcome = styled(NunitoSemiBold)`
  font-size: 28px;
  color: ${colors.titleColor};
`;

export const Info = styled(Nunito)`
  font-size: 14px;
  color: ${colors.subTitleColor};
  line-height: 24px;
  margin: 5px 0;
`;

export const ContainerTwoInput = styled.View`
  flex-direction: row;
  align-items: center;
  height: 44px;
  justify-content: space-between;
  margin: 12px 0;
`;

export const ContentIput = styled.View``;
