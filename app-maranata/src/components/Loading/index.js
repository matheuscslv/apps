import React, { memo } from 'react';

import { Container, Spinner } from './styles';

function Loading() {
  return (
    <Container>
      <Spinner size="small" />
    </Container>
  );
}

export default memo(Loading);
