import React, { useMemo, useCallback } from 'react';
import { FlatList } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';

import AdressesActions from '~/store/ducks/adresses';

import {
  Container,
  Button,
  CardContainer,
  InfoAdress,
  Street,
  Neighborhood,
  Zip,
  TextSelected,
  ActionIcon,
  LabelIcon,
  ContentListIsEmpty,
  TextListIsEmpty,
  Icon,
  IconPlus,
} from './styles';

export default function Adresses({ navigation: { navigate } }) {
  const dispath = useDispatch();
  const adresses = useSelector((state) => state.adresses.data);

  const listIsEmpty = useMemo(
    () => (
      <ContentListIsEmpty>
        <TextListIsEmpty>
          Você não possui endereços cadastrados, clique no botão logo abaixo
          para adicionar.
        </TextListIsEmpty>
      </ContentListIsEmpty>
    ),
    [],
  );

  function setAddressWithDefault(id) {
    dispath(AdressesActions.changeAddressDefaultRequest({ id }));
  }

  const renderItem = useCallback(
    ({ item }) => (
      <CardContainer
        isDefault={item.isDefault}
        onPress={() => setAddressWithDefault(item.id)}
      >
        <InfoAdress>
          <Street>{item.logradouro}</Street>
          <Neighborhood>{item.bairro}</Neighborhood>
          <Zip>{item.cep}</Zip>
          {item.isDefault && <TextSelected>Endereço selecionado</TextSelected>}
        </InfoAdress>
        <ActionIcon
          onPress={() => navigate('AddressForm', { idAddress: item.id })}
        >
          <Icon name="edit" size={25} />
          <LabelIcon>Editar</LabelIcon>
        </ActionIcon>
      </CardContainer>
    ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [adresses],
  );

  return (
    <Container>
      <FlatList
        data={adresses}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ flexGrow: 1 }}
        ListFooterComponentStyle={{ marginBottom: 20 }}
        ListEmptyComponent={listIsEmpty}
      />
      <Button onPress={() => navigate('AddressForm')}>
        <IconPlus name="plus" size={20} />
      </Button>
    </Container>
  );
}
