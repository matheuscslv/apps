import React from 'react';

import { ButtonChange, ButtonText } from './styles';

export default function Button({ children, ...rest }) {
  return (
    <ButtonChange {...rest}>
      <ButtonText>{children}</ButtonText>
    </ButtonChange>
  );
}
