import Icon from 'react-native-vector-icons/EvilIcons';

import styled from 'styled-components/native';

import { colors, Nunito, NunitoSemiBold, metrics } from '~/styles';

export const Container = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
})`
  flex: 1;

  background: ${colors.background};
`;

export const ContentLoginRequired = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px;
  height: ${metrics.screenHeight - 200}px;
`;

export const TextLoginRequired = styled(Nunito)`
  font-size: 15px;
  color: ${colors.titleColor};
  line-height: 25px;
  text-align: center;
  margin-bottom: 30px;
`;

export const Header = styled.View`
  height: 160px;
  justify-content: center;
  margin-left: 20px;
`;

export const Welcome = styled(NunitoSemiBold)`
  font-size: 28px;
  color: ${colors.titleColor};
`;

export const Email = styled(Nunito)`
  font-size: 14px;
  color: ${colors.subTitleColor};
  line-height: 24px;
  margin: 5px 0;
`;

export const Option = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  height: 74px;
  padding: 0 20px;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #ccc;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconItem = styled(Icon)`
  font-size: 30px;
  color: ${colors.subTitleColor};
`;

export const IconSelectItem = styled(Icon).attrs({
  name: 'chevron-right',
})`
  font-size: 40px;
  color: ${colors.subTitleColor};
`;

export const TextItem = styled.Text`
  margin-left: 15px;
  font-size: 16px;
  color: ${colors.titleColor};
`;

export const Tooltip = styled.View`
  width: 28px;
  height: 28px;
  border-radius: 14px;
  background-color: rgba(255, 0, 0, 0.7);
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const TooltipText = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #fff;
`;
