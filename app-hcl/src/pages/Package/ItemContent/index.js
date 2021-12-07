import React, { memo } from 'react';

import PropTypes from 'prop-types';

import payment_false from '~/assets/payment_false.png';
import payment_true from '~/assets/payment_true.png';

import {
  Container,
  Left,
  ImageIcon,
  InfoContent,
  TypeName,
  Name,
  StatusName,
  Price,
} from './styles';

function ItemContent({ payment }) {
  return (
    <Container>
      <Left>
        <ImageIcon source={payment.payment ? payment_true : payment_false} />
        <InfoContent>
          <TypeName>{payment.type}</TypeName>
          <Name>
            {payment.package.name} - {payment.date_full}
          </Name>
          <StatusName payment={payment.payment}>
            {payment.payment ? 'Pago' : 'Aguardando Pagamento'}
          </StatusName>
        </InfoContent>
      </Left>
      <Price payment={payment.payment}>R$ {payment.package.price}</Price>
    </Container>
  );
}

export default memo(ItemContent);

ItemContent.propTypes = {
  payment: PropTypes.shape({
    payment: PropTypes.string,
    type: PropTypes.string,
    date_full: PropTypes.string,
    package: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};
