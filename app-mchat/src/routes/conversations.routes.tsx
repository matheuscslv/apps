import React from 'react';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import IconInAttendance from '@components/BottomTabIcons/InAttendance';
import IconInHold from '@components/BottomTabIcons/InHold';
import Finished from '@pages/Finished';
import InAttendance from '@pages/InAttendance';
import InHold from '@pages/InHold';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components/native';

const Tab = createBottomTabNavigator();

const ConversationsRoutes: React.FC = () => {
  const { colors, fonts } = useTheme();

  return (
    <Tab.Navigator
      tabBarOptions={{
        inactiveTintColor: colors.title,
        activeTintColor: colors.secundary,
        labelStyle: {
          fontSize: 12,
          fontFamily: fonts.regular,
        },
        style: {
          paddingBottom: 5 + getBottomSpace(),
          height: 60 + getBottomSpace(),
        },
      }}
    >
      <Tab.Screen
        name="InAttendance"
        component={InAttendance}
        options={{
          tabBarLabel: 'Em atendimento',
          tabBarIcon: ({ color }) => (
            <IconInAttendance icon="chat-processing" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="InHold"
        component={InHold}
        options={{
          tabBarLabel: 'Em espera',
          tabBarIcon: ({ color }) => (
            <IconInHold icon="chat-alert" color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Finished"
        component={Finished}
        options={{
          tabBarLabel: 'Finalizadas',
          tabBarIcon: ({ color }) => (
            <MCIcons name="chat" color={color} size={23} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ConversationsRoutes;
