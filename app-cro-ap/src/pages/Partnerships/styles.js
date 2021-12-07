import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { colors, metrics } from '~/styles';

const { width, height } = Dimensions.get('window');

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const CardView = styled.View`
  /*
align-items: center;
justify-content:center; */
  border-radius: ${metrics.baseRadius}px;
  border-color: ${colors.border};
  border-width: 1px;
  margin: 10px;
  padding: 10px 0;
  background-color: #fff;
`;

export const Card2 = styled.View`
  margin: 10px;
  background-color: #fff;
  border-radius: ${metrics.baseRadius}px;
  border-color: ${colors.border};
  border-width: 1px;
  padding: 10px 0;
`;

export const InfoUser = styled.View`
  margin-left: 22%;
  margin-bottom: 5.5%;
`;
export const Card = styled.View`
  /*
align-items: center;
justify-content:center;
  border-radius: 2px;
  margin: 10px; */
  background-color: #fff;
  height: 200px;
`;

export const DataUser = styled.Text`
  font-size: ${({ size }) => size || 10};
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : 'none')};
  font-weight: ${({ bold }) => (bold ? 'bold' : 'normal')};
  color: #111;
`;

export const CardImage = styled.ImageBackground`
  /* width: 90%;
  height: 200px;
  margin-bottom: 10px; */
  flex: 1;

  justify-content: flex-end;
`;
export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6,
})`
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 38px;
  width: 75%;
  background-color: #8b0000;
  border-radius: 4px;
  margin: 0 20px;
`;
export const ButoonText = styled.Text`
  color: #fff;
  font-size: 16px;
`;
export const SubTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: #000;
  text-align: left;
`;
export const Title = styled.Text`
  font-size: 16px;
  color: #8b0000;
  padding: 8px 2px;
  background-color: #eee;
  padding-left: 10px;
  font-weight: bold;
  text-align: justify;
  margin-bottom: 4px;
`;

export const Topic = styled.Text`
  font-size: 24px;
  color: #8b0000;
  font-weight: bold;
  margin: 0 15px;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: #999;
  margin-top: 2px;
  padding: 0 20px;
`;

export const CardInfo = styled.View`
  padding: 10px;
`;

export const Flilter = styled.View`
  padding: 0 10px;
`;

export const Bold = styled.Text`
  margin-top: 10px;
  padding: 0 20px;
  font-weight: bold;
`;

export const ComboBox = styled.PickerIOS`
  height: 30px;
`;
