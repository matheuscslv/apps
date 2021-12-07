import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Button, Label } from './styles';
import { useTheme } from 'styled-components';

export default function FloatingButton({ onPress, icon = 'magnify' }) {
  const { colors } = useTheme();

  return (
    <Button onPress={onPress}>
      <Label>Buscar produto...</Label>
      <Icon name={icon} color={colors.primary} size={20} />
    </Button>
  );
}
