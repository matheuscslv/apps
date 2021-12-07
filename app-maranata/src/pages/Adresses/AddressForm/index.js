import React, { useState, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaskService } from 'react-native-masked-text';

import axios from 'axios';
import Button from '~/components/Button';
import AdressesActions from '~/store/ducks/adresses';

import {
  Container,
  Scroll,
  Header,
  Welcome,
  Info,
  ContainerTwoInput,
  ContentIput,
} from './styles';
import { SampleInput as Input, Label } from '~/components/Input/styles';
import { formatString } from '~/scripts/formatFields';

export default function AddressForm({ route }) {
  const dispatch = useDispatch();
  const idAddress = route.params?.idAddress;

  const address = useSelector((state) => state.adresses.data).find(
    (ad) => ad.id === idAddress,
  );

  const loading = useSelector((state) => state.adresses.loading);

  const [cep, setCep] = useState(address?.cep);
  const [number, setNumber] = useState(address?.numero);
  const [complement, setComplement] = useState(address?.complemento);
  const [addressDetail, setAddressDetail] = useState(null);

  useEffect(() => {
    async function getAddress() {
      setAddressDetail(null);
      if (cep?.length === 9) {
        const formattedCep = formatString(cep);

        const response = await axios.get(
          `https://viacep.com.br/ws/${formattedCep}/json/`,
        );
        if (response.data.erro) {
          Alert.alert('Erro', 'O CEP inserido é inválido!');
          return;
        }
        const {
          logradouro,
          uf: estado,
          localidade: cidade,
          bairro,
        } = response.data;
        setAddressDetail({ logradouro, estado, cidade, bairro, cep });
      }
    }
    getAddress();
  }, [cep]);

  const handleSaveAddress = useCallback(() => {
    dispatch(
      AdressesActions.handleNewOrUpdateAddressRequest({
        id: address?.id || idAddress,
        ...addressDetail,
        numero: number,
        complemento: complement,
      }),
    );
  }, [address, addressDetail, complement, dispatch, idAddress, number]);

  const handleDeleteAddress = useCallback(() => {
    Alert.alert(
      'Confirme para continuar',
      'Deseja mesmo excluir este endereço?',
      [
        {
          text: 'Não',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            dispatch(
              AdressesActions.handleDeleteAddressRequest({
                id: idAddress,
              }),
            );
          },
        },
      ],
    );
  }, [dispatch, idAddress]);

  return (
    <Container>
      <Scroll>
        <Header>
          <Welcome>Nos informe seu endereço</Welcome>
          <Info>Preencha os campos de CEP e Número de sua residência!</Info>
        </Header>

        <ContainerTwoInput style={{ marginBottom: 20 }}>
          <ContentIput style={{ width: '50%' }}>
            <Label editable>CEP</Label>
            <Input
              value={cep}
              includeRawValueInChangeText
              placeholder="99999-999"
              returnKeyType="next"
              keyboardType="decimal-pad"
              onChangeText={(text) => {
                const formatted = MaskService.toMask('zip-code', text);
                setCep(formatted);
              }}
              editable
            />
          </ContentIput>
          <ContentIput style={{ width: '40%' }}>
            <Label>Número da casa</Label>
            <Input
              maxLength={20}
              value={number}
              onChangeText={setNumber}
              returnKeyType="send"
              keyboardType="decimal-pad"
              placeholder="1234"
              editable
            />
          </ContentIput>
        </ContainerTwoInput>
        <Label editable>Complemento</Label>
        <Input
          title="Complemento"
          placeholder="Informe um complemento"
          maxLength={100}
          value={complement}
          onChangeText={setComplement}
          style={{ marginBottom: 20 }}
          editable
        />
        <Input
          title={false}
          editable={false}
          placeholder="Logradouro"
          value={addressDetail?.logradouro}
        />
        <Input
          title={false}
          value={addressDetail?.bairro}
          editable={false}
          placeholder="Bairro"
        />
        <ContainerTwoInput>
          <ContentIput style={{ width: '40%' }}>
            <Input
              title={false}
              value={addressDetail?.cidade}
              editable={false}
              placeholder="Cidade"
            />
          </ContentIput>
          <ContentIput style={{ width: '40%' }}>
            <Input
              title={false}
              value={addressDetail?.estado}
              editable={false}
              placeholder="Estado"
            />
          </ContentIput>
        </ContainerTwoInput>

        <Button
          title={address?.id ? 'ATUALIZAR' : 'SALVAR'}
          loading={loading}
          onSubmit={handleSaveAddress}
          disabled={
            number?.length === 0 ||
            !addressDetail ||
            cep?.length !== 9 ||
            (!addressDetail && !loading) ||
            loading
          }
        />

        <Button
          danger
          title="EXCLUIR"
          style={{ marginTop: 15 }}
          onSubmit={handleDeleteAddress}
          disabled={loading}
          loading={loading}
        />
      </Scroll>
    </Container>
  );
}
