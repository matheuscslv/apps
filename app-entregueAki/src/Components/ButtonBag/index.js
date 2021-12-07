import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {withNavigation} from 'react-navigation';
import {useSelector} from 'react-redux';

import {Tooltip, TooltipText} from './styles';

function ButtonBag({tintColor}) {
  const total = useSelector((state) => state.bags.total);
  return (
    <>
      <Icon name="basket" size={28} color={tintColor} />
      {total > 0 && (
        <Tooltip>
          <TooltipText>{total}</TooltipText>
        </Tooltip>
      )}
    </>
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
