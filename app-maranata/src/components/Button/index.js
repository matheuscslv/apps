import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, ButtonText } from './styles';

export default function ButtonDefault({
  title,
  onSubmit,
  loading,
  children,
  outline = false,
  ...props
}) {
  return (
    <Container onPress={onSubmit} {...props} outline={outline}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <ButtonText outline={outline}>{title || children}</ButtonText>
      )}
    </Container>
  );
}
