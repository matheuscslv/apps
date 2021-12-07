import { CachedImage } from 'react-native-img-cache';

import styled from 'styled-components/native';

import { NunitoBold, NunitoBlack, NunitoSemiBold, colors } from '~/styles';

export const Container = styled.View`
  flex-direction: row;
  background: #fff;
  padding: 15px 20px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1px;
`;

export const InfoPlayer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const Avatar = styled(CachedImage)`
  height: 60px;
  width: 60px;
  border-radius: 30px;
`;

export const Data = styled.View`
  flex-direction: column;
  margin-left: 20px;
  justify-content: space-between;
`;

export const Name = styled(NunitoBlack)`
  color: #555;
  font-size: 16px;
`;

export const Position = styled(NunitoSemiBold)`
  text-transform: uppercase;
  color: ${colors.subTitle};
  font-size: 14px;
  margin: 2px 0;
`;
export const Package = styled(NunitoBold)`
  text-transform: uppercase;
  color: #8b0000;
  font-size: 12px;
`;

export const Status = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: ${({ color }) => (color ? colors.success : colors.danger)};
`;

export const Actions = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ButtonRemoveGuest = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  margin-right: 20px;
`;
