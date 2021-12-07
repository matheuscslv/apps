import React, { useState, useEffect, useCallback } from 'react';
import { Alert, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ButtonDefault from '~/Components/ButtonDefault';
import InputDefault from '~/Components/InputDefault';
import UserActions from '~/store/ducks/user';

import {
  Container,
  Scroll,
  Header,
  Welcome,
  ContainerTwoInput,
  ContentIput,
  Info,
} from './styles';
import { colors } from '~/styles';

export default function DetailAddress({ navigation }) {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDeleting, setLoadingDeleting] = useState(false);

  const [id, setId] = useState(navigation.getParam("address").id);
  const [cep, setCep] = useState(navigation.getParam("address").cep);
  const [numero, setNumero] = useState('');
  const [descricao, setDescricao] = useState("");

  const [address, setAddress] = useState(null);

  useEffect(() => {
    setId(navigation.getParam("address").id)
    setCep(navigation.getParam("address").cep)
    setNumero(navigation.getParam("address").numero)
    setDescricao(navigation.getParam("address").descricao)

    navigation.setParams({
      deleteAddress: () => deleteAddress(),
    });
  }, []);

  async function deleteAddress() {
    setLoadingDeleting(true);
    dispatch(
      UserActions.setDeleteAddressRequest({
        id,
        setLoadingDeleting,
      })
    );
  }

  useEffect(() => {
    async function getAddress() {
      setError(false);
      if (cep?.length === 8) {
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
    setLoading(true);
    dispatch(
      UserActions.setAddressRequest({
        ...address,
        numero,
        id,
        descricao,
        setLoading,
      })
    );
  }, [address, dispatch, descricao, numero]);

  return (
    <>
      {loadingDeleting ?
        (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        ) : (
          <Container>
            <Scroll>
              <Header>
                <Welcome>Nos informe o seu endereço</Welcome>
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
                    title="Número da casa"
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
                title={"Descrição"}
                maxLength={20}
                placeholder="Ex: Casa"
                style={{ marginVertical: 10 }}
                onChangeText={setDescricao}
                value={descricao}
              />

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
                  numero?.length === 0 ||
                  error ||
                  cep?.length !== 8 ||
                  (!address && !loading)
                }
              />
            </Scroll>
          </Container>
        )}
    </>
  );
}

DetailAddress.navigationOptions = ({ navigation }) => {
  return {
    headerRight: (
      <TouchableOpacity onPress={() => navigation.state.params.deleteAddress()}>
        <Icon
          style={{ marginRight: 10 }}
          name="trash-can"
          size={30}
          color={colors.primary}
        />
      </TouchableOpacity>
    )
  }
}
