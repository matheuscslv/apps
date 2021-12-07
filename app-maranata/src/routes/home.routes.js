import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { defaultStackStyles, StackImageHeaderStyles } from './styles';
const HomeRoutes = createStackNavigator();

import Products from '~/pages/Products';
import DetailProduct from '~/pages/DetailProduct';
import Results from '~/pages/Results';

export default function () {
  const { colors } = useTheme();
  const stackStyles = defaultStackStyles(colors);
  return (
    <HomeRoutes.Navigator screenOptions={stackStyles}>
      <HomeRoutes.Screen
        name="Main"
        component={Products}
        options={StackImageHeaderStyles}
      />
      <HomeRoutes.Screen
        name="DetailProduct"
        component={DetailProduct}
        options={{
          headerTitle: null,
          headerTransparent: true,
        }}
      />

      <HomeRoutes.Screen
        name="Results"
        component={Results}
        options={StackImageHeaderStyles}
      />
    </HomeRoutes.Navigator>
  );
}
