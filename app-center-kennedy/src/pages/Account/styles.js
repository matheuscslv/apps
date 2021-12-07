import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.SafeAreaView`
  background: #f3f3f3;
`;

export const Icone = styled(Icon)``;

export const Content = styled.TouchableOpacity.attrs({
  activeOpacity: 0.5,
})`
  padding: 20px 20px;
  background: #fff;
  border-bottom-color: #f6f6f6;
  border-bottom-width: 1px;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 16px;
  color: #444;
`;

export const SubTitle = styled.Text`
  font-size: 12px;
  color: #999;
  margin-top: 2px;
`;

export const TextFooter = styled.Text`
  font-size: 14px;
  color: #666;
  margin-top: 2px;
`;
