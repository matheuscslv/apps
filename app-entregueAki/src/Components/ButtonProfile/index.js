import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';

import { Tooltip, TooltipText } from './styles';

export default function ButtonProfile({ tintColor }) {
  const total = useSelector((state) => state.shopping.notification);

  return (
    <>
      <Icon
        style={{
          alignSelf: 'center',
          textAlign: 'center',
        }}
        name="format-list-numbered"
        size={28}
        color={tintColor}
      />
      {total > 0 && (
        <Tooltip>
          <TooltipText>{total}</TooltipText>
        </Tooltip>
      )}
    </>
  );
}
