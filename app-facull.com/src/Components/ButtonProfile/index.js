import React from 'react';
import { Image } from 'react-native';

import { Tooltip, TooltipText } from './styles';
import { useSelector } from 'react-redux';
import account from '~/assets/account.png';

export default function ButtonProfile() {
  const total = useSelector(state => state.shopping.notification);

  return (
    <>
      <Image
        source={account}
        resizeMode="contain"
        style={{ width: 30, height: 30 }}
      />
      {total > 0 && (
        <Tooltip>
          <TooltipText>{total}</TooltipText>
        </Tooltip>
      )}
    </>
  );
}
