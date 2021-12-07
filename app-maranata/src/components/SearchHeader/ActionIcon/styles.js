import FaIcon from 'react-native-vector-icons/Feather';

import styled from 'styled-components/native';

export const Action = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
  hitSlop: { top: 15, bottom: 15, left: 15, right: 15 },
})`
  padding: 0 5px;
`;

export const Icon = styled(FaIcon)`
  font-size: 26px;
  color: #999;
`;
