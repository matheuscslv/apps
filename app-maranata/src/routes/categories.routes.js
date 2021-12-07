import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components';
import { defaultStackStyles, StackImageHeaderStyles } from './styles';
const CategoriesRoutes = createStackNavigator();

import Categories from '~/pages/Categories';
import ProductList from '~/pages/Categories/ProductList';
import SubCategories from '~/pages/Categories/SubCategories';
import DetailProduct from '~/pages/DetailProduct';

export default function () {
  const { colors } = useTheme();
  const stackStyles = defaultStackStyles(colors);
  return (
    <CategoriesRoutes.Navigator screenOptions={stackStyles}>
      <CategoriesRoutes.Screen
        name="Main"
        component={Categories}
        options={StackImageHeaderStyles}
      />
      <CategoriesRoutes.Screen
        name="DetailProduct"
        component={DetailProduct}
        options={{
          headerTitle: null,
          headerTransparent: true,
        }}
      />
      <CategoriesRoutes.Screen
        name="SubCategories"
        component={SubCategories}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
      <CategoriesRoutes.Screen
        name="ProductList"
        component={ProductList}
        options={{
          headerTitle: 'Produtos',
        }}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </CategoriesRoutes.Navigator>
  );
}
