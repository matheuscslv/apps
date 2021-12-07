import FAIcon from 'react-native-vector-icons/FontAwesome';

import styled, { css } from 'styled-components/native';

import {
  Nunito,
  PlatformType,
  NunitoSemiBold,
  colors,
  NunitoBold,
} from '~/styles';

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
  padding-bottom: 10px;
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

export const Title = styled(NunitoSemiBold)`
  text-transform: uppercase;
  font-size: 10px;
  text-align: center;
  margin-top: 10px;
`;

export const Subtitle = styled(NunitoSemiBold)`
  text-transform: uppercase;
  font-size: 10px;
  text-align: center;
  color: #666;
  margin-top: 3px;
  margin-bottom: 8px;
`;

export const PackagesContent = styled.View`
  justify-content: center;
`;

export const PackagesContentLine = styled.View`
  flex-direction: row;
`;

export const ItemPackage = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  margin: 10px auto;
  height: 44px;
  max-width: 38%;
  width: 100%;
  border-radius: 10px;

  padding: 0 20px;

  justify-content: center;
  align-items: center;

  ${({ selected }) =>
    selected
      ? css`
          border-width: 3px;
          border-color: ${colors.success};
        `
      : css`
          border-width: 1px;
          border-color: #333;
        `}
`;

export const PackageName = styled(NunitoBold)`
  text-transform: uppercase;
  font-size: 13px;

  ${({ selected }) =>
    selected
      ? css`
          color: ${colors.success};
        `
      : css`
          font-family: 'Nunito';
        `}
`;

export const Bold = styled(Subtitle)`
  color: #333;
`;

export const Divider = styled.View`
  height: 1px;
  width: 60%;
  background: #ccc;
  margin: 5px auto;
`;
