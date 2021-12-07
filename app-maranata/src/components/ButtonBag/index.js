import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withNavigation } from '@react-navigation/compat';
import { useSelector } from 'react-redux';

import { Tooltip, TooltipText } from './styles';

function ButtonBag({ color, size }) {
  const total = useSelector((state) => state.bags.total);
  return (
    <>
      <Icon name="cart" size={size} color={color} />
      {total > 0 && (
        <Tooltip>
          <TooltipText>{total}</TooltipText>
        </Tooltip>
      )}
    </>
  );
}

export default withNavigation(ButtonBag);
