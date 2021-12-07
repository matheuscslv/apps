import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';

import moment from 'moment';

import 'moment/locale/pt-br';
import api from '~/services/api';

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
  ContentStatus,
  StatusName,
  ContentView,
  Address,
} from './styles';
import Loading from '~/components/Loading';
import formatPrice from '~/utils/formatPrice';

export default function PurchaseDetail({ route }) {
  const idSale = useMemo(() => route.params.id, [route]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getDatail() {
      const { data: response } = await api.get(`/vendas/${idSale}`);

      const { logradouro, numero, bairro, cidade } = response.endereco_entrega;

      setData({
        ...response,
        formattedDataUpdated: moment(response.updated_at, 'YYYY-MM-DD hh:mm')
          .locale('pt-br')
          .format('lll'),
        formattedAddress: `${logradouro}, ${numero}, ${bairro} - ${cidade}`,
        formattedTotal: formatPrice(response.total),
        itens: response?.itens?.map((product) => ({
          ...product,
          formattedValue: `${Math.floor(product.quantidade)} x ${
            product.preco
          }`,
        })),
      });
      setLoading(false);
    }
    getDatail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      {loading ? (
        <Loading />
      ) : (
        <ContentView>
          <ContentStatus status={data?.status}>
            <StatusName>{data?.status}</StatusName>
            <StatusName>{data?.formattedDataUpdated}</StatusName>
          </ContentStatus>
          <Header>
            <HeaderTitle>Pedido N°: {data?.id}</HeaderTitle>
            <HeaderTitle>{data.formattedTotal}</HeaderTitle>
          </Header>
          <Content>
            <DashedBorder />
            <ContainerTransaction>
              <Title>Transação</Title>
              <Value>{data?.forma_pagamento}</Value>
            </ContainerTransaction>
            <DashedBorder />
            <ContainerInfo>
              {data?.itens.map((item) => (
                <Item key={item.id}>
                  <Title>{item.produto.descricao}</Title>
                  <Value>{item.formattedValue}</Value>
                </Item>
              ))}
            </ContainerInfo>
            <DashedBorder />
            <Item style={{ marginVertical: 20 }}>
              <Title>Total</Title>
              <Value>{data?.formattedTotal}</Value>
            </Item>
            <DashedBorder />
            <Address>{data.formattedAddress}</Address>
          </Content>
        </ContentView>
      )}
    </Container>
  );
}
