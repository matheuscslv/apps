/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FAIcon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { useDispatch } from 'react-redux';

import logo from '~/assets/icone.png';
import package_false from '~/assets/package_false.png';
import package_true from '~/assets/package_true.png';
import SideBar from '~/components/SideBar';
import Package from '~/pages/Package';
import Profile from '~/pages/Profile';
import { MatcheTypes } from '~/store/ducks/matche';
import { colors } from '~/styles';

import BottomNavigator from './BottomNavigator';

export default createDrawerNavigator(
  {
    Peladas: {
      screen: BottomNavigator,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <FAIcon name="soccer-ball-o" size={22} color={tintColor} />
        ),
      },
    },
    Perfil: {
      screen: Profile,
      navigationOptions: {
        drawerIcon: ({ tintColor }) => (
          <Icon name="user" size={22} color={tintColor} />
        ),
      },
    },
    Pacotes: {
      screen: Package,
      navigationOptions: {
        drawerIcon: ({ tintColor, focused }) => (
          <Image
            resizeMode="contain"
            style={{
              width: 28,
              height: 28,
            }}
            source={focused ? package_true : package_false}
          />
        ),
      },
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      headerLeft: () => (
        <TouchableOpacity
          hitSlop={{
            top: 7,
            left: 7,
            right: 7,
            bottom: 7,
          }}
          activeOpacity={0.7}
          onPress={() => {
            navigation.toggleDrawer();
          }}
          style={{ paddingLeft: 12 }}
        >
          <Icon name="menu" size={30} color={colors.primary} />
        </TouchableOpacity>
      ),
    }),
    contentComponent: SideBar,
    contentOptions: {
      activeTintColor: colors.primary,
    },
    drawerBackgroundColor: '#f6f6f6',
    drawerWidth: 250,
  }
);
