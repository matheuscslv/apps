import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { useTheme } from 'styled-components';

const Loading: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <ActivityIndicator size="small" color={colors.primary} />
    </View>
  );
};

export default Loading;
