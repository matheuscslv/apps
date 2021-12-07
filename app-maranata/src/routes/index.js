import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Main" component={AppRoutes} />
      <Stack.Screen name="Auth" component={AuthRoutes} />
    </Stack.Navigator>
  );
}
