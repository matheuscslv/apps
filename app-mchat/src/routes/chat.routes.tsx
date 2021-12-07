import React from 'react';

import LabelAttendance from '@components/TopBarLabels/Attendances';
import LabelDepartaments from '@components/TopBarLabels/Departaments';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useTheme } from 'styled-components';

import ConversationsRoutes from './conversations.routes';
import DepartmentsRoutes from './departments.routes';

const TabTop = createMaterialTopTabNavigator();

const ChatRoutes: React.FC = () => {
  const { colors } = useTheme();

  return (
    <TabTop.Navigator
      tabBarOptions={{
        activeTintColor: colors.secundary,
        inactiveTintColor: colors.title,
        indicatorStyle: {
          backgroundColor: colors.secundary,
          borderBottomColor: colors.secundary,
          borderBottomWidth: 2,
        },
        labelStyle: {
          alignSelf: 'stretch',
        },
      }}
    >
      <TabTop.Screen
        name="Attendance"
        component={ConversationsRoutes}
        options={{
          tabBarLabel: ({ focused }) => <LabelAttendance isFocused={focused} />,
        }}
      />
      <TabTop.Screen
        name="Departments"
        component={DepartmentsRoutes}
        options={{
          tabBarLabel: ({ focused }) => (
            <LabelDepartaments isFocused={focused} />
          ),
        }}
      />
    </TabTop.Navigator>
  );
};

export default ChatRoutes;
