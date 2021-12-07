import styled from 'styled-components/native';

import { colors, Nunito, NunitoBold, NunitoSemiBold } from '~/styles';

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 65px;
  margin-top: 20px;
`;

export const Left = styled.View`
  flex-direction: row;
  align-items: center;
  height: 100%;
  flex: 1;
`;

export const ImageIcon = styled.Image`
  width: 50px;
  height: 50px;
`;

export const InfoContent = styled.View`
  justify-content: space-between;
  margin-left: 15px;
`;

export const TypeName = styled(NunitoBold)`
  color: #333;
  font-size: 18px;
`;

export const Name = styled(NunitoSemiBold)`
  color: #555;
  font-size: 14px;
`;

export const StatusName = styled(Nunito)`
  font-size: 12px;
  color: ${({ payment }) => (payment ? colors.success : colors.danger)};
`;

export const Price = styled(NunitoBold)`
  color: ${({ payment }) => (payment ? colors.success : colors.danger)};
  font-size: 18px;
`;
