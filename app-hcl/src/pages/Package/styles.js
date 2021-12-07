import styled from 'styled-components/native';

import { colors, Nunito, NunitoBold, NunitoSemiBold } from '~/styles';

export const Container = styled.View`
  background: ${colors.secundary};
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;

export const PackageName = styled(Nunito)`
  color: ${colors.primary};
  text-transform: uppercase;
  margin-top: 10px;
  font-size: 18px;
`;

export const Bold = styled(PackageName)`
  font-weight: bold;
`;

export const DaysPackageName = styled.Text`
  color: ${colors.primary};
  font-size: 12px;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: ${colors.primary};
  height: 44px;
  padding: 0 20px;
  border-radius: 4px;
  margin-top: 15px;
`;

export const ButtonText = styled.Text`
  margin-left: 10px;
  color: ${colors.secundary}
`;

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: 60,
  },
  showsVerticalScrollIndicator: false,
})`
  background: #fff;
  flex: 1;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 20px 30px;
  margin-top: 15px;
`;
export const Title = styled(NunitoBold)`
  font-size: 18px;
  text-transform: uppercase;
  margin-bottom: 5px;
  color: #333;
`;
