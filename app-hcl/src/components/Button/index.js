import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, ButtonText } from './styles';

function Button({ title, onSubmit, loading, ...props }) {
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

export default memo(Button);
