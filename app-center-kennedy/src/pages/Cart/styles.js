import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors} from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: #f6f6f6;
  padding: 0 10px;
  padding-bottom: 20px;
`;

export const ContentTotal = styled.View`
  margin-top: 10px;
  background: #fff;
  padding: 20px 15px;
  elevation: 5;
  border-radius: 3px;
`;
export const ContentItem = styled.View`
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  height: 44px;
`;

export const Title = styled.Text`
  color: #555;
  font-size: 16px;
  font-weight: bold;
`;

export const Price = styled.Text`
  font-size: 15px;
  color: ${colors.primary};
`;

export const ContentFrete = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 35%;
`;

export const FreteTitle = styled.Text`
  color: #999;
  font-size: 12px;
`;

export const FreteCep = styled.Text`
  color: #555;
  font-size: 14px;
`;

export const IconEdit = styled(Icon)``;

export const Buttons = styled.View``;

export const Button = styled.TouchableOpacity.attrs({
  activeOpacity: 0.4,
})`
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 54px;
  margin: 0 10px;
  border-width: 1px;
  border-color: ${colors.primary};
  background: ${props =>
    props.background ? props.background : colors.primary};
  opacity: ${props => (props.disabled ? '0.6' : '1.0')};
`;

export const ButtonText = styled.Text`
  color: ${({color}) => (color ? colors.primary : '#FFF')};
  font-weight: bold;
`;
