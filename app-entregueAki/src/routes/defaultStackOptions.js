import { Platform } from 'react-native';

import { colors } from '~/styles';

export default {
  headerStyle: {
    height: Platform.OS === 'ios' ? 100 : 70,
    backgroundColor: colors.white,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  headerTintColor: colors.primary,
  headerTitleAlign: 'left',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
  headerBackTitleStyle: {
    color: colors.primary,
  },
  // headerRight: <View />,
  headerBackTitleVisible: false,
};
