import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';

import {
  ContainerModal,
  ViewModal,
  InputContainer,
  Buttons,
  Button,
  ButtonText,
  TitleModal,
  InputFrete,
  Error,
} from './styles';
import {colors} from '~/styles';

export default function ModalCep({
  cep,
  setCep,
  setErrorFrete,
  errorFrete,
  setFrete,
  setModalCep,
}) {
  const [loading, setLoading] = useState(false);

  function calcFrete() {
    if (cep.length !== 9) {
      setErrorFrete(true);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setFrete(99.0);
      setModalCep(false);
      setLoading(false);
    }, 2000);
  }

  function maskFrete(text) {
    if (text.length <= 9) {
      if (text.length === 5 && cep.length + 1 === text.length) {
        setCep(`${text}-`);
      } else {
        setCep(text);
      }
      setErrorFrete(false);
    }
  }

  return (
    <ContainerModal>
      <ViewModal>
        <TitleModal>Calcular frete e prazo de entrega</TitleModal>
        <InputContainer>
          <InputFrete
            placeholder="CEP (somente números)"
            value={cep}
            onChangeText={maskFrete}
            returnKeyType="search"
            onSubmitEditing={calcFrete}
          />
          {errorFrete && <Error>CEP inválido!</Error>}
          {loading && <ActivityIndicator color={colors.primary} size="small" />}
        </InputContainer>
        <Buttons>
          <Button background="#FFF" onPress={() => setModalCep(false)}>
            <ButtonText color> Cancelar </ButtonText>
          </Button>
          <Button disabled={loading} onPress={calcFrete}>
            <ButtonText> Calcular </ButtonText>
          </Button>
        </Buttons>
      </ViewModal>
    </ContainerModal>
  );
}
