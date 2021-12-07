import styled from 'styled-components/native';

import { colors, NunitoSemiBold, NunitoBold, Nunito } from '~/styles';

export const Container = styled.View.attrs({
  style: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
})`
  background: #fff;
  padding: 20px 0;
  margin-top: 20px;
  elevation: 5;
`;

export const InfoMatche = styled.View`
  justify-content: center;
  align-items: center;
`;

export const IconBall = styled.Image`
  height: 25px;
  width: 25px;
`;

export const Title = styled(NunitoBold)`
  text-transform: uppercase;
  margin: 5px 0;
`;

export const DateMatche = styled(Nunito)`
  color: ${colors.subTitle};
`;

export const WeekDay = styled(Nunito)`
  margin: 5px 0;
  color: ${colors.subTitle};
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  justify-content: center;
  align-items: center;
  padding: 15px 0 0 0;
  border-top-width: 0.25px;
  border-top-color: #999;
  margin-top: 10px;
`;

export const ButtonText = styled(NunitoSemiBold)`
  color: ${colors.primary};
`;
