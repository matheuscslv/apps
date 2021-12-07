import React, { useCallback } from 'react';
import { StatusBar, Alert } from 'react-native';

import { useAuth } from '@hooks/auth';
import Chat from '@pages/Chat';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

import ChatRoutes from './chat.routes';
import { HeaderTitle, HeaderRightButton } from './styles';

type RootStackParamList = {
  Chat: {
    name: string;
    activeConversation: boolean;
    closeConversation(): void;
  };
  Home: {};
};

const Stack = createStackNavigator<RootStackParamList>();

const AuthRoutes: React.FC = () => {
  const { signOut } = useAuth();
  const { colors } = useTheme();

  const handleLogoutConfirmation = useCallback(() => {
    Alert.alert(
      'Atenção',
      'Deseja mesmo sair da sua conta?',
      [
        {
          text: 'Não',
        },
        { text: 'Sim', onPress: signOut },
      ],
      { cancelable: false },
    );
  }, [signOut]);

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerBackTitleVisible: false,
          headerTintColor: colors.white,
          headerTitleAlign: 'left',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitle: HeaderTitle,
          headerRight: () => (
            <HeaderRightButton
              icon="sign-out"
              onPress={handleLogoutConfirmation}
            />
          ),
        }}
      >
        <Stack.Screen name="Home" component={ChatRoutes} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={({ route }) => ({
            headerTitle: route.params?.name || 'Cliente',
            headerRight: () =>
              route.params?.activeConversation && (
                <HeaderRightButton
                  icon="times-circle"
                  onPress={() => route.params?.closeConversation()}
                />
              ),
          })}
        />
      </Stack.Navigator>
    </>
  );
};

export default AuthRoutes;
