import Arrow from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styled from 'styled-components/native';

import { colors, Nunito, NunitoSemiBold } from '~/styles';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${colors.background};
`;

export const DepartmentContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  padding: 0 15px;
  margin-bottom: 1.5px;

  border-bottom-width: 1px;
  border-bottom-color: #ebebeb;
`;

export const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const DepartmentIcon = styled(Icon)`
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;

export const RightIcon = styled(Arrow).attrs({
  name: 'ios-arrow-forward',
})`
  font-size: 20px;
  color: ${colors.primary};
`;

export const DepartmentText = styled(NunitoSemiBold)`
  margin-left: 10px;
  font-size: 14px;
  padding: 0;
  font-family:'Quicksand-Bold';
`;

export const CountText = styled(Nunito)`
  margin-left: 10px;
  font-size: 11px;
  padding: 0;
  font-family:'Quicksand-Regular';
`;

export const ViewSearch = styled.View`
  padding: 10px;
`;

export const CategoryText = styled(NunitoSemiBold)`
  color: ${props => props.color};
  margin: 0 10px 10px 10px;
  font-size: 14px;
  padding: 5px;
  font-family:'Quicksand-Bold';
`;
