import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import NavigationService from '~/services/navigation';
import { colors } from '~/styles';

export default () => (
  <TouchableOpacity
    hitSlop={{
      top: 7,
      left: 7,
      right: 7,
      bottom: 7,
    }}
    activeOpacity={0.7}
    onPress={() => NavigationService.toggleDrawer()}
    style={{ paddingLeft: 12 }}
  >
    <Icon name="menu" size={30} color={colors.primary} />
  </TouchableOpacity>
);
