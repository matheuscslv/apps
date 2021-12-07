import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { StackActions, NavigationActions } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/FontAwesome';

import banner from '~/assets/logo.jpeg';

import Main from '~/pages/Main';
import ListMonths from '~/pages/ListMonths';
import Profile from '~/pages/Profile';

import ContraCheque from '~/pages/ListMonths/ContraCheque/contracheque';

import SignIn from '~/pages/SignIn';
import OAuth from '~/pages/OAuth';
import { colors } from '~/styles/';

import store from '~/services/storage';

import { unsubscribeToNotification } from '~/services/notification';

const Routes = (userLogged = false) =>
  createAppContainer(
    createStackNavigator(
      { SignIn, OAuth, Main, Profile, ListMonths, ContraCheque },
      {
        defaultNavigationOptions: ({ navigation }) => ({
          headerTitle: (
            <Image
              style={{
                flex: 1,
                width: 54,
                height: 40,
                marginRight: Platform.OS === 'ios' ? 0 : 50,
              }}
              resizeMode="contain"
              source={banner}
            />
          ),
        }),
        headerBackTitleVisible: false,
        initialRouteName: userLogged ? 'Main' : 'SignIn',
      },
    ),
  );

Main.navigationOptions = ({ navigation }) => ({
  headerLeft: (
    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
      <Icon2
        style={{ paddingLeft: 12 }}
        name="user"
        size={30}
        color={`${colors.primary}`}
      />
    </TouchableOpacity>
  ),
});

ListMonths.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <Image
      style={{
        flex: 1,
        width: 54,
        height: 40,
        marginRight: Platform.OS === 'ios' ? 0 : 50,
      }}
      resizeMode="contain"
      source={banner}
    />
  ),
  headerTintColor: '#0996d4',
});

Profile.navigationOptions = ({ navigation }) => ({
  headerTitle: (
    <Image
      style={{
        flex: 1,
        width: 54,
        height: 40,
      }}
      resizeMode="contain"
      source={banner}
    />
  ),
  headerTintColor: '#0996d4',
  headerRight: (
    <TouchableOpacity
      onPress={async () => {
        const token = await store.get('token');
        const user = await store.get('User');

        try {
          unsubscribeToNotification(user.cpf);
        } catch (error) { }

        await store.save('User', null);
        await store.save('token', null);

        let resetAction = StackActions.reset({
          index: 0,
          actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
        });
        navigation.dispatch(resetAction);
      }}
      style={{ paddingRight: 12 }}>
      <Icon name="logout" color={'#0996d4'} size={30} />
    </TouchableOpacity>
  ),
});

export default Routes;
