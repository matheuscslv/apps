import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import moment from 'moment';

import 'moment/locale/pt-br';
import api from '~/services/api';
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
  ContentStatus,
  StatusName,
  ContentView,
  Address,
  StepIndicator
} from './styles';

import formatMoney from '~/Components/ConvertMoney';
//import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
//import StepIndicator from 'react-native-step-indicator';

export default function DetailRequest({ navigation }) {
  const idSale = useMemo(() => navigation.getParam('item').id, [navigation]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function getDatail() {
      const { data: response } = await api.get(`/vendas/${idSale}`);

      try {
        const { logradouro, numero, bairro, cidade, estado } = response.data.endereco_entrega;
        setData({
          ...response.data,
          formattedDataUpdated: moment(response.data.updated_at, 'YYYY-MM-DD hh:mm')
            .locale('pt-br')
            .format('lll'),
          formattedAddress: logradouro ? `${logradouro}, Nº ${numero}, ${bairro} - ${cidade} - ${estado}` : `${response.data.tipo_entrega == "Retirar no Local" ? 'Retirar no Local' : 'Indisponível'}`,
        });

        setTotal(Number(response.data.total) + Number(response.data.taxa_entrega));

      } catch (error) {
        console.log(error)
        const { data: address } = await api.get(`/enderecos/${response.data.endereco_entrega_id}`);
        const { logradouro, numero, bairro, cidade } = address;
        setData({
          ...response.data,
          formattedDataUpdated: moment(response.data.updated_at, 'YYYY-MM-DD hh:mm')
            .locale('pt-br')
            .format('lll'),
          formattedAddress: logradouro ? `${logradouro}, Nº ${numero}, ${bairro} - ${cidade} - ${estado}` : `${response.data.tipo_entrega == "Retirar no Local" ? 'Retirar no Local' : 'Indisponível'}`,
        });

        setTotal(Number(response.data.total) + Number(response.data.taxa_entrega));
      }


      setLoading(false);
    }
    getDatail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="small" color="#000" />
        </View>
      ) : (
          <>
            <ContentView>
              <ContentStatus status={data?.status}>
                <StatusName>{data?.status}</StatusName>
                <StatusName>{data?.formattedDataUpdated}</StatusName>
              </ContentStatus>
              <Header>
                <HeaderTitle>Pedido N°: {data?.id}</HeaderTitle>
                <HeaderTitle style={{ color: colors.primary }}>
                  R$ {formatMoney(total)}
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
                        {formatMoney(item.produto.preco_venda)}
                      </Value>
                    </Item>
                  ))}
                </ContainerInfo>

                <DashedBorder />

                <Item style={{ marginTop: 10 }}>
                  <Title>Subtotal</Title>
                  <Value>R$ {formatMoney(data?.total)}</Value>
                </Item>
                <Item style={{ marginVertical: 0 }}>
                  <Title>Taxa de Entrega</Title>
                  <Value>R$ {formatMoney(data?.taxa_entrega)}</Value>
                </Item>
                <Item style={{ marginBottom: 10 }}>
                  <Title>Total</Title>
                  <Value>R$ {formatMoney(total)}</Value>
                </Item>

                <DashedBorder />
                <View style={{ justifyContent: "center", alignItems: 'center', marginTop: 10 }}>
                  {data.formattedAddress != "Retirar no Local" && <Title>Endereço de Entrega</Title>}
                  <Address>{data.formattedAddress}</Address>
                </View>

                {data.historico_status.length > 0 &&
                  <>
                    <DashedBorder />
                    <View style={{ marginBottom: 10 }}>
                      <Address style={{ marginTop: 20 }}>Status do Pedido</Address>
                      {data.historico_status.map((item, index) => (
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                          <StepIndicator finalizado={String(item.status).toUpperCase() === "FINALIZADO" ? true : false} current={data.historico_status.length == (index + 1) ? true : false} />
                          <Text style={{ fontFamily: 'Quicksand-Regular' }}>{item.status}</Text>
                        </View>
                      ))}
                    </View>
                  </>
                }

              </Content>
            </ContentView>
          </>
        )}

    </Container>
  );
}
