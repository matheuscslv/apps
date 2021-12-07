import React, { useContext } from 'react';
import { View, StatusBar } from 'react-native';

import { useTheme } from 'styled-components';

import AuthContext from '../contexts/auth';
import AppRoutes from './app.routes';

const Routes: React.FC = () => {
  const { loading } = useContext(AuthContext);
  const { colors } = useTheme();

  return loading ? (
    <View />
  ) : (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <AppRoutes />
    </>
  );
};

export default Routes;
