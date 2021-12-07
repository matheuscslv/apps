import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

const ScreenLock: React.FC = () => {
  const { colors } = useTheme();
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}
    >
      <Text
        style={{
          fontFamily: 'Ubuntu-Regular',
          color: colors.title,
          marginBottom: 10,
          fontSize: 16,
        }}
      >
        Faça login para continuar
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('SignIn')}
        style={{
          backgroundColor: colors.primary,
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
          minHeight: 40,
          minWidth: 100,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ color: '#fff', fontFamily: 'Ubuntu-Regular' }}>
          Entrar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScreenLock;
