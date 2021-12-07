import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';

export const Container = styled.ScrollView`
  flex:1;
`;

export const Card = styled.View`
  padding: 10px;
  margin: 10px;
  border-width: 1px;
  border-color:#ccc;
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
