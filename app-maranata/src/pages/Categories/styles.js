import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
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
  border-bottom-color: ${({ theme }) => theme.colors.border};
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
  color: ${({ theme }) => theme.colors.subtitle};
`;

export const RightIcon = styled(Icon).attrs({
  name: 'arrow-right',
})`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.subtitle};
`;

export const DepartmentText = styled.Text`
  margin-left: 10px;
  font-size: 16px;
  padding: 0;
  font-family: ${({ theme }) => theme.fonts.semibold};
`;
