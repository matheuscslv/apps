import React from 'react';
import { Image, Platform, View } from 'react-native';
import logo from '~/assets/headerlogo.png';

export const defaultStackStyles = (colors) => ({
  headerBackTitleVisible: false,
  headerTintColor: colors.primary,
  headerTitleAlign: 'center',
  headerBackTitleStyle: {
    color: colors.primary,
  },
  headerStyle: {
    backgroundColor: colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    height: Platform.OS === 'ios' ? 95 : 70,
  },
});

export const ImageTitle = (
  <Image
    style={{
      height: 34,
      width: 113,
      flex: 1,
    }}
    source={logo}
    resizeMode="contain"
  />
);

export const StackImageHeaderStyles = {
  headerTitle: ImageTitle,
  headerTitleStyle: {
    height: '100%',
  },
  headerTitleContainerStyle: {
    position: 'absolute',
    minHeight: 60,
    margin: 0,
    padding: 0,
    alignContent: 'center',
  },
};
