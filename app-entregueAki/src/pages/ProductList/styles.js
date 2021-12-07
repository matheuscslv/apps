import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Arrow from 'react-native-vector-icons/Ionicons';
import { colors, Nunito, NunitoSemiBold } from '~/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.background};
`;

export const ViewSearch = styled.View`
  padding: 10px;
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

export const CompanyImage = styled.Image`
  width:50px;
  height:50px;
  border-radius:50px;
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
  color: ${props => props.color};
  font-family:'Quicksand-Regular';
`;

