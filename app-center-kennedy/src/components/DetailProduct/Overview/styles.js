import styled from 'styled-components/native';
import {colors} from '~/styles';
import * as Animatable from 'react-native-animatable';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.background};
`;

export const Photos = styled.Image`
  width: 100%;
  height: 220px;
  background: #fff;
`;

export const ContainerPhotos = styled.View`
  background: #fff;
  padding-bottom: 20px;
`;

export const ContentInfo = styled.View`
  padding: 0 20px;
  background: #fff;
`;

export const Title = styled.Text`
  color: #444;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const Price1 = styled.Text`
  color: #555;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const PriceSmall = styled.Text`
  color: #555;
  font-weight: bold;
  font-size: 16px;
`;

export const Price2 = styled.Text`
  color: #555;
  font-size: 14px;
  line-height: 20px;
`;

export const Button = styled.TouchableOpacity`
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  height: 54px;
  border-width: 1px;
  border-color: ${colors.primary};
  background: ${props =>
    props.background ? props.background : colors.primary};
`;

export const ButtonText = styled.Text`
  color: ${({color}) => (color ? colors.primary : '#FFF')};
  font-weight: bold;
`;

export const ContentFrete = styled.KeyboardAvoidingView`
  margin-top: 10px;
  background: #fff;
  padding: 10px 20px;
`;
export const TitleFrete = styled.Text`
  color: #444;
  font-size: 16px;
  font-weight: bold;
`;

export const InputContainer = styled.KeyboardAvoidingView`
  border-bottom-color: ${({error}) => (error ? '#f00' : '#999')};
  border-bottom-width: 1px;
  margin-top: 5px;
  height: 44px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
`;
export const InputFrete = styled.TextInput.attrs({
  keyboardType: 'numeric',
  placeholderTextColor: '#999',
  autoCapitalize: 'none',
  autoCorrect: false,
})`
  padding: 0 5px;
  width: 80%;
  height: 44px;
  font-size: 14px;
`;

export const ResponseFrete = styled(Animatable.View)`
  border-top-width: 2px;
  border-top-color: ${colors.primary};
  background: #fff;
  padding: 10px 20px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

export const PriceFrete = styled.Text`
  color: ${colors.primary};
  font-size: 18px;
`;

export const TitleSmall = styled.Text`
  font-size: 14px;
  color: #444;
  line-height: 20px;
`;

export const InfoFrete = styled.Text`
  padding: 10px 20px;
  color: #999;
`;

export const Error = styled.Text`
  font-size: 10px;
  color: #f00;
`;
