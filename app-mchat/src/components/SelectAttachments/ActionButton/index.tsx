import React, { memo } from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Icon, Label, Action } from './styles';

interface IActionButtonProps extends TouchableOpacityProps {
  icon: string;
  children: string;
}

const ActionButton: React.FC<IActionButtonProps> = ({
  icon,
  children,
  ...rest
}) => (
  <Action {...rest}>
    <Icon name={icon} />
    <Label>{children}</Label>
  </Action>
);

export default memo(ActionButton);
