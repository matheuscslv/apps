import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, View, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';

import api from '~/services/api';
import { BagsTypes } from '~/store/ducks/bag';
import { ProductsTypes } from '~/store/ducks/product';
import { colors } from '~/styles';

import {
  Container,
  Header,
  HeaderTitle,
  Content,
  ContainerTransaction,
  Title,
  Value,
  Item,
  ContainerInfo,
  DashedBorder,
  Button,
  ButtonText,
} from './styles';

export default function PurchaseDetail({ navigation }) {
  const idSale = useMemo(() => navigation.getParam('id'), [navigation]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getDatail() {
      const { data: response } = await api.get(`/vendas/${idSale}`);
      setData(response);
      setLoading(false);
    }
    getDatail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      {loading ? (
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : (
        <>
          <Header>
            <QRCode value={`${data?.id}`} size={70} />
            <HeaderTitle>Pedido N°: {data?.id}</HeaderTitle>
            <HeaderTitle style={{ color: colors.primary }}>
              R$ {data?.total}
            </HeaderTitle>
          </Header>
          <Content>
            <DashedBorder />
            <ContainerTransaction>
              <Title>Transação</Title>
              <Value>{data?.forma_pagamento}</Value>
            </ContainerTransaction>
            <DashedBorder />
            <ContainerInfo>
              {data?.itens.map(item => (
                <Item>
                  <Title>{item.produto.descricao}</Title>
                  <Value>
                    {Math.floor(item.quantidade)} x R${' '}
                    {item.produto.preco_venda}
                  </Value>
                </Item>
              ))}
            </ContainerInfo>
            <DashedBorder />
            <Item style={{ marginVertical: 20 }}>
              <Title>Total</Title>
              <Value>R$ {data?.total}</Value>
            </Item>
          </Content>
          {/* <Button>
            <ButtonText>Estou aqui</ButtonText>
          </Button> */}
        </>
      )}
    </Container>
  );
}

PurchaseDetail.navigationOptions = {
  headerTitle: 'Detalhes do pedido',
};
