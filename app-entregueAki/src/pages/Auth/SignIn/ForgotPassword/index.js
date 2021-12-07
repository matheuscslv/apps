import React, { useState } from 'react';
import { Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import ButtonDefault from '~/Components/ButtonDefault';
import api from '~/services/api';

import {
  ContainerModal,
  Container,
  Header,
  HeaderTitle,
  Content,
  InputContainer,
  InputNumber,
  Span,
} from './styles';

export default function ForgotPassword({ modal, setModal }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  async function handleForgotPassword() {
    setLoading(true);
    try {
      await api.post('/login/gerar-senha', { email });
      Alert.alert(
        'Sucesso',
        'Um email de recuperação de senha foi enviado para seu email!',
        [
          { text: "OK", onPress: () => setModal(false) }
        ],
        { cancelable: false }
      );
    } catch (e) {
      Alert.alert(
        'Recuperação de senha',
        'Houve um erro ao recuperar sua senha, contate um administrador!'
      );
    }

    setLoading(false);
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={modal}
      onRequestClose={() => setModal(false)}
    >
      <ContainerModal>
        <Container>
          <Header onPress={() => setModal(false)}>
            <HeaderTitle>Recupere sua senha</HeaderTitle>
            <Icon name="close" size={25} color="#fff" />
          </Header>
          <Content>
            <Span>Insira seu email cadastrado para recuperar sua senha!</Span>
            <InputContainer>
              <InputNumber
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Seu email"
                placeholderTextColor={'#666'}
                keyboardType="email-address"
                onSubmitEditing={handleForgotPassword}
              />
            </InputContainer>

            <ButtonDefault
              title="OK"
              loading={loading}
              disabled={loading}
              onSubmit={handleForgotPassword}
            />
          </Content>
        </Container>
      </ContainerModal>
    </Modal>
  );
}
