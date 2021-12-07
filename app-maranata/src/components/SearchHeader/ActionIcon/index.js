import React from 'react';

import { Action, Icon } from './styles';

export default function ActionIcon({ name, onPress }) {
  return (
    <Action onPress={onPress}>
      <Icon name={name} />
    </Action>
  );
}
