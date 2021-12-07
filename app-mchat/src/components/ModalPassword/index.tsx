import React, { useState, useCallback } from 'react';
import { Alert, ActivityIndicator } from 'react-native';

import { useAuth } from '@hooks/auth';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  HeaderTitle,
  Form,
  Input,
  Button,
  ButtonText,
} from './styles';

interface IModalPasswordProps {
  callback: Function;
}

const ModalPassword: React.FC<IModalPasswordProps> = ({ callback }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const { colors } = useTheme();

  const handleSignIn = useCallback(async () => {
    if (!password) {
      Alert.alert('Atenção', 'Você deve preencher o campo de senha');
    }
    setLoading(true);
    await signIn({ password });
    callback();
    setLoading(false);
  }, [password, signIn, callback]);

  return (
    <Container>
      <Header>
        <HeaderTitle>Informe a senha para continuar</HeaderTitle>
      </Header>
      <Form>
        <Input
          onChangeText={setPassword}
          placeholder="Sua senha secreta"
          placeholderTextColor={colors.subtitle}
          returnKeyType="send"
          secureTextEntry
          autoCapitalize="none"
          onSubmitEditing={handleSignIn}
        />
        <Button onPress={handleSignIn}>
          {loading ? (
            <ActivityIndicator color={colors.white} size="small" />
          ) : (
            <ButtonText>Confirmar</ButtonText>
          )}
        </Button>
      </Form>
    </Container>
  );
};

export default ModalPassword;
