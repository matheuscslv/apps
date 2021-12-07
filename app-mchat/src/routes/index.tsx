import React from 'react';

import { useAuth } from '@hooks/auth';
import { createStackNavigator } from '@react-navigation/stack';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Stack = createStackNavigator();

const Routes: React.FC = () => {
  const { signed } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {!signed ? (
        <Stack.Screen name="App" component={AppRoutes} />
      ) : (
        <Stack.Screen name="Auth" component={AuthRoutes} />
      )}
    </Stack.Navigator>
  );
};

export default Routes;
