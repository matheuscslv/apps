import React from 'react';
import { MaskService } from 'react-native-masked-text';

import { FormHandles } from '@unform/core';

import Input from '../../../components/Input';

interface IFormStep1Props {
  focusTargetInput(name: string): void;
  onSubmitForm(): void;
  formRef: React.RefObject<FormHandles>;
}

const FormStep1: React.FC<IFormStep1Props> = (props) => {
  const { focusTargetInput } = props;
  const { onSubmitForm, formRef } = props;

  return (
    <>
      <Input
        icon="user"
        label="Seu nome"
        name="nome"
        placeholder="Seu nome completo"
        autoCapitalize="words"
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('telefone_whatsapp')}
        containerStyle={{
          maxWidth: 350,
        }}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        onChangeText={(text) => {
          const formatted = MaskService.toMask('cel-phone', text, {
            maskType: 'BRL',
            withDDD: true,
            dddMask: '(99) ',
          });
          formRef.current?.setFieldValue('telefone_whatsapp', formatted);
        }}
        icon="message-circle"
        label="Telefone whatsapp"
        name="telefone_whatsapp"
        placeholder="Telefone whatsapp"
        keyboardType="number-pad"
        returnKeyType="send"
        onSubmitEditing={() => focusTargetInput('email')}
      />
      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="mail"
        label="Seu email"
        name="email"
        placeholder="Seu email"
        autoCapitalize="none"
        autoCorrect={false}
        onSubmitEditing={() => focusTargetInput('cpf')}
        returnKeyType="next"
      />

      <Input
        icon="info"
        label="Seu CPF"
        name="cpf"
        placeholder="Seu CPF"
        autoCapitalize="none"
        returnKeyType="next"
        keyboardType="number-pad"
        onSubmitEditing={() => focusTargetInput('senha')}
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        onChangeText={(text) => {
          let formatted = text;

          formatted = MaskService.toMask('cpf', text);

          formRef.current?.setFieldValue('cpf', formatted);
        }}
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="lock"
        label="Senha"
        name="senha"
        placeholder="Sua senha secreta"
        secureTextEntry
        returnKeyType="next"
        onSubmitEditing={() => focusTargetInput('password_confirmation')}
      />

      <Input
        containerStyle={{
          marginTop: 15,
          maxWidth: 350,
        }}
        icon="lock"
        label="Confirmar senha"
        name="password_confirmation"
        placeholder="Confirme sua senha"
        secureTextEntry
        returnKeyType="send"
        onSubmitEditing={onSubmitForm}
      />
    </>
  );
};

export default FormStep1;
