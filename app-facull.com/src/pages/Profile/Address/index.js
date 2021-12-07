import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import ButtonDefault from '~/Components/ButtonDefault';
import InputDefault from '~/Components/InputDefault';
import { UserTypes } from '~/store/ducks/user';

import {
  Container,
  Scroll,
  Header,
  Welcome,
  ContainerTwoInput,
  ContentIput,
  Info,
} from './styles';

export default function Address() {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cep, setCep] = useState(useSelector(state => state.user.data.cep));
  const [numero, setNumero] = useState(
    useSelector(state => state.user.data.numero)
  );
  const [address, setAddress] = useState(null);

  useEffect(() => {
    async function getAddress() {
      setError(false);
      if (cep.length === 8) {
        setLoading(true);
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );
        if (response.data.erro) {
          Alert.alert('Erro', 'O CEP inserido é inválido!');
          setLoading(false);
          setError(true);

          return;
        }
        const {
          logradouro,
          uf: estado,
          localidade: cidade,
          bairro,
        } = response.data;
        setAddress({ logradouro, estado, cidade, bairro, cep });
        setLoading(false);
      }
    }
    getAddress();
  }, [cep]);

  const handleSaveAddress = useCallback(() => {
    console.log(address, numero);
    setLoading(true);
    dispatch({
      type: UserTypes.SET_ADDRESS_REQUEST,
      data: { ...address, numero },
      setLoading,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numero, cep]);

  return (
    <Container>
      <Scroll>
        <Header>
          <Welcome>Nos informe seu endereço</Welcome>
          <Info>Preencha o campo de CEP e Número de sua casa!</Info>
        </Header>

        <ContainerTwoInput style={{ marginBottom: 20 }}>
          <ContentIput style={{ width: '50%' }}>
            <InputDefault
              title="CEP"
              value={cep}
              includeRawValueInChangeText
              onChangeText={(masked, raw) => setCep(raw)}
              placeholder="99999-999"
              returnKeyType="next"
              keyboardType="decimal-pad"
              type="zip-code"
              ref={null}
            />
          </ContentIput>
          <ContentIput style={{ width: '40%' }}>
            <InputDefault
              title="Numero da casa"
              maxLength={20}
              value={numero}
              onChangeText={setNumero}
              returnKeyType="send"
              keyboardType="decimal-pad"
              placeholder="1234"
              ref={null}
            />
          </ContentIput>
        </ContainerTwoInput>
        <InputDefault
          title={false}
          editable={false}
          placeholder="Logradouro"
          style={{ marginVertical: 10 }}
          value={address?.logradouro}
        />
        <InputDefault
          title={false}
          value={address?.bairro}
          editable={false}
          placeholder="Bairro"
        />
        <ContainerTwoInput style={{ marginVertical: 10 }}>
          <ContentIput style={{ width: '40%' }}>
            <InputDefault
              title={false}
              value={address?.cidade}
              editable={false}
              placeholder="Cidade"
            />
          </ContentIput>
          <ContentIput style={{ width: '40%' }}>
            <InputDefault
              title={false}
              value={address?.estado}
              editable={false}
              placeholder="Estado"
            />
          </ContentIput>
        </ContainerTwoInput>

        <ButtonDefault
          title="SALVAR"
          style={{ marginTop: 15 }}
          loading={loading}
          onSubmit={handleSaveAddress}
          disabled={
            numero.length === 0 ||
            error ||
            cep.length !== 8 ||
            (!address && !loading)
          }
        />
      </Scroll>
    </Container>
  );
}

Address.navigationOptions = {
  headerTitle: 'Meu Endereço',
};
