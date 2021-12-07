import styled from 'styled-components/native';
import { colors } from '~/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/SimpleLineIcons';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 0px 10px;
  margin-top:10px;
  background: ${colors.background};
`;

export const CardHead = styled.View`
  flex: 1;
  padding: 10px;
  border-width: 1px;
  border-color:#ccc;
  margin-bottom: 10px;
  background-color:${colors.primary};
`;

export const CardCart = styled.View`
  flex: 1;
  padding: 10px;
  border-width: 1px;
  border-color:#ccc;
`;

export const Line = styled.View`
  flex-direction:row;
  justify-content:space-between;
`;

export const Text = styled.Text`
  color:#fff;
  font-family:'Quicksand-Bold';
`;

export const TextCardHead = styled.View`
  flex: 1;
  padding: 5px;
  border-width: 1px;
  border-color:#fff;
  margin-top:10px;
  background-color:${colors.primary};
  align-items:center;
`;

export const Card = styled.View`
  flex:1;
  padding: 10px;
  border-width: 1px;
  border-color:#ccc;
  margin-bottom: 10px;
`;

export const UpIcon = styled(Icon)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const DownIcon = styled(Icon)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const OptionIcon = styled(Icon3)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const TextCard = styled.Text`
  color:${props => props.color};
  font-family:'Quicksand-Regular';
`;

export const TextCardCart = styled.View`
  flex: 1;
  padding: 5px;
  border-width: 1px;
  border-color:${colors.success};
  margin-top:10px;
  align-items:center;
  width:50%;
`;

export const MinusIcon = styled(Icon2)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const PlusIcon = styled(Icon2)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;







export const HeaderCart = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color:#ccc;
  flex-direction:row;
  justify-content:space-between;
  margin-bottom:10px;
  align-items:center;
`;

export const CartIcon = styled(Icon)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const CloseIcon = styled(Icon)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const BasketCard = styled.View`
  flex:1;
  padding: 10px;
  border-width: 1px;
  border-color:#ccc;
  width: 50%;
  margin: 5px;
  align-items:center;
  justify-content:center;
`;

export const BasketDeliveryCard = styled.TouchableOpacity`
  flex:1;
  padding:5px;
  border-width: 1px;
  border-color:#ccc;
  margin: 10px;
  align-items:center;
  justify-content:center;
  flex-direction:row;
  border-radius: 10px;
`;

export const CheckIcon = styled(Icon)`
  justify-content: center;
  align-items: center;
  margin: 0 5px;
`;

export const ButtomBasketCard = styled.TouchableOpacity`
  padding: 5px;
  border-width: 1px;
  background-color: ${colors.success};
  border-color:${colors.success};
  margin: 10px;
  align-items:center;
  justify-content:center;
  flex-direction:row;
  border-radius:5px;
`;

export const InputCode = styled(TextInputMask)`
  border-bottom-width: 1.5px;
  border-bottom-color: #f1f1f1;
  height: 44px;
  padding: 10px;
  width: 100%;
  color: #000;
`;





export const Content = styled.View`
  padding-bottom: 10px;
  background: #fff;
  margin: 10px 5px 0 5px;

  border-width: 1px;
  border-color:#ccc;
  border-radius: 4px;
`;

export const Header = styled.View`
  padding: 10px 15px 5px 10px;
  border-bottom-width: 0.4px;
  border-bottom-color: #fafafa;
  justify-content: center;
`;

export const Title = styled.Text`
  color: ${colors.primary};
  font-family:"Quicksand-Bold";
  font-size: 14px;
`;

export const ContentUser = styled.View`
  padding: 0px 10px 10px 10px;
  background: #fff;
  flex-direction: row;
  align-items:center;
`;

export const UserInformations = styled.View`
  flex: 1;
`;

export const Name = styled.Text`
  font-size: 14px;
  color: #000;
  text-transform: uppercase;
  padding: 0 10px;
`;

export const Address = styled.Text`
  font-size: 12px;
  color: #333;
  padding: 10px 10px 0 10px;
`;



