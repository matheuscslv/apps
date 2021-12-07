import styled from 'styled-components/native';
import {colors} from '~/styles';

export const Container = styled.SafeAreaView`
  background-color: #fff;
  margin-bottom: 85px;
`;

export const Title = styled.Text`
  background: #f6f6f6;
  padding: 10px 20px;
  font-weight: bold;
  font-size: 14px;
  color: #555;
`;

export const InfoView = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: #f6f6f6;
`;

export const Name = styled.Text`
  color: #111;
  font-size: 14px;
  line-height: 20px;
`;

export const ContentButtons = styled.View`
  padding: 10px 20px;
  background: #fafafa;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  align-items: flex-end;
  border-top-width: 1px;
  border-top-color: ${colors.primary};
`;

export const Button = styled.TouchableOpacity`
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 49%;
  height: 54px;
  border-width: 1px;
  border-color: ${colors.primary};
  background: ${props =>
    props.background ? props.background : colors.primary};
`;

export const ButtonText = styled.Text`
  color: ${({color}) => (color ? colors.primary : '#FFF')};
  font-weight: bold;
  text-align: center;
`;
