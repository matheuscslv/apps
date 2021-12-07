/* eslint-disable default-case */
import React from 'react';
import { Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import completed_false from '~/assets/completed_false.png';
import completed_true from '~/assets/completed_true.png';
import current_false from '~/assets/current_false.png';
import current_true from '~/assets/current_true.png';
import me_false from '~/assets/me_false.png';
import me_true from '~/assets/me_true.png';
import Completed from '~/pages/Completed';
import Current from '~/pages/Current';
import MyMatches from '~/pages/MyMatches';
import { colors } from '~/styles';

const defaultOptionStackNavigator = {
  headerStyle: {
    backgroundColor: colors.secundary,
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const MainTabBottomNavigator = createBottomTabNavigator(
  {
    Vigentes: createStackNavigator(
      { Current },
      {
        defaultNavigationOptions: {
          ...defaultOptionStackNavigator,
          header: () => null,
        },
      }
    ),
    Finalizadas: createStackNavigator(
      { Completed },
      {
        defaultNavigationOptions: {
          ...defaultOptionStackNavigator,
          header: () => null,
        },
      }
    ),
    Minhas: createStackNavigator(
      { MyMatches },
      {
        defaultNavigationOptions: {
          ...defaultOptionStackNavigator,
          header: () => null,
        },
      }
    ),
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: () => null,
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        switch (routeName) {
          case 'Vigentes':
            return (
              <Image
                source={focused ? current_false : current_true}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            );
          case 'Finalizadas':
            return (
              <Image
                source={focused ? me_false : me_true}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            );
          case 'Minhas':
            return (
              <Image
                source={focused ? completed_false : completed_true}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            );
        }
      },
    }),
    tabBarOptions: {
      showLabel: false,
      activeTintColor: '#000',
      activeBackgroundColor: '#d4a733',
      inactiveTintColor: colors.primary,
      style: {
        height: 55,
        borderTopWidth: 0,
        backgroundColor: colors.secundary,
      },
    },
  }
);

export default MainTabBottomNavigator;
