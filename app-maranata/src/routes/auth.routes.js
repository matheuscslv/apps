import React from 'react';
import { useTheme } from 'styled-components';
import { createStackNavigator } from '@react-navigation/stack';
import { defaultStackStyles, StackImageHeaderStyles } from './styles';
const AuthRoutes = createStackNavigator();

import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

export default function () {
  const { colors } = useTheme();
  const stackStyles = defaultStackStyles(colors);

  return (
    <AuthRoutes.Navigator screenOptions={stackStyles}>
      <AuthRoutes.Screen
        name="SignIn"
        component={SignIn}
        options={StackImageHeaderStyles}
      />
      <AuthRoutes.Screen
        name="SignUp"
        component={SignUp}
        options={StackImageHeaderStyles}
      />
    </AuthRoutes.Navigator>
  );
}
