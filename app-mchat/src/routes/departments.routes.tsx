import React from 'react';
import { StatusBar } from 'react-native';

import Departments from '@pages/Departments';
import ConversationsDepartment from '@pages/Departments/Conversations';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from 'styled-components/native';

const Stack = createStackNavigator();

const DepartmentsRoutes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <>
      <StatusBar backgroundColor={colors.primary} barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Departments" component={Departments} />
        <Stack.Screen
          name="ConversationsDepartment"
          component={ConversationsDepartment}
        />
      </Stack.Navigator>
    </>
  );
};

export default DepartmentsRoutes;
