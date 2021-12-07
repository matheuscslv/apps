import React from 'react';
import { withNavigation } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';

import payment from '~/assets/payment.png';
import bag from '~/assets/take-away-food.png';
import { BagsTypes } from '~/store/ducks/bag';

import { Container, Icon, Tooltip, TooltipText } from './styles';

function ButtonBag({ tintColor, navigation, isFocused }) {
  const total = useSelector(state => state.bags.total);
  return (
    <Icon source={bag}>
      {total > 0 && (
        <Tooltip>
          <TooltipText>{total}</TooltipText>
        </Tooltip>
      )}
    </Icon>
  );
}

export default withNavigation(ButtonBag);

/* <Container
      isFocused={isFocused}
      background={tintColor}
      onPress={() => {
        navigation.navigate('Sacola');
      }}
    >
      <Icon source={bag}>
        {bags.length > 0 && (
          <Tooltip>
            <TooltipText>{bags.length}</TooltipText>
        {!isFocused && (
          <Tooltip>
            <TooltipText>10</TooltipText>
          </Tooltip>
        )}
      </Icon>
    </Container> */
