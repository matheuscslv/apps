import styled from 'styled-components/native';
import {colors, metrics} from '~/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.background};
  padding: 10px;
`;

export const DepartmentContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  height: 60px;

  padding: 0 5px;
`;

export const DepartmentIcon = styled(Icon)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const DepartmentText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  padding: 0;
`;
