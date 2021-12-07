import styled from 'styled-components/native';
import {colors} from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.background};
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

export const CardContainer = styled.View`
  background: #fff;
  justify-content: space-between;
  padding: 15px;
  border-radius: 4px;
  margin: 10px;
  flex-direction: row;
  align-items: center;
  elevation: 5;

  ${({isDefault}) =>
    isDefault &&
    `
    border-left-width: 5px;
    border-left-color: ${colors.primary};
  `}
`;

export const InfoAdress = styled.View``;

export const Street = styled.Text`
  font-size: 16px;
  margin: 3px 0;
  color: #333;
`;

export const Neighborhood = styled.Text`
  font-size: 14px;
  margin: 3px 0;
  color: #333;
`;

export const Zip = styled.Text`
  font-size: 13px;
  margin: 3px 0;
  color: #333;
`;
