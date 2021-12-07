import styled from 'styled-components/native';
import {colors} from '~/styles';

export const Container = styled.View`
  flex: 1;
  background: #f7f7f7;
  padding: 20px;
`;

export const ContentCard = styled.View`
  background: #fff;
  padding: 10px 20px;
  border-radius: 4px;
  padding-bottom: 30px;
`;

export const CardNumber = styled.Text`
  font-size: 22px;
  margin-left: 10px;
`;

export const Remove = styled.Text`
  text-transform: uppercase;
  color: ${colors.primary};
  margin: 10px 0;
`;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  background: ${colors.primary};
  height: 80px;
  width: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  elevation: 5;
  position: absolute;
  bottom: 30;
  right: 30;
`;

export const FlagCard = styled.Image`
  height: 80px;
  width: 80px;
`;
