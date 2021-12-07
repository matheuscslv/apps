import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {colors} from '~/styles';

export const Container = styled.SafeAreaView`
flex: 1;
background: ${colors.background}
  padding: 10px;
`;

export const DepartmentContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: #ddd;
  height: 60px;
  padding: 0 5px;
`;

export const DepartmentIcon = styled(Icon).attrs({
  name: 'right',
})``;

export const DepartmentText = styled.Text`
  font-size: 16px;
  color: #444;
`;
