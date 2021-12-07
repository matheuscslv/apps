import React from 'react';
import {ActivityIndicator} from 'react-native';

import {Container, ButtonText} from './styles';

export default function ButtonDefault({title, onSubmit, loading, ...props}) {
  return (
    <Container onPress={onSubmit} {...props}>
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <ButtonText>{title}</ButtonText>
      )}
    </Container>
  );
}
