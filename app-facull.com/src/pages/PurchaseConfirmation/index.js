import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useDispatch, useSelector } from 'react-redux';

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

export default function PurchaseConfirmation({ navigation }) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.data);
  const [pedido] = useState(navigation.getParam('pedido'));

  useEffect(() => {
    const produto = products.map(product => ({ ...product, quantity: 0 }));

    dispatch({
      type: ProductsTypes.GET_PRODUCTS_SUCCESS,
      data: produto,
    });

    dispatch({
      type: BagsTypes.GET_BAGS_SUCCESS,
      data: [],
      total: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container showsVerticalScrollIndicator={false}>
      <Header>
        <QRCode value={`${pedido.id}`} size={75} />
        <HeaderTitle>Pedido N°: {pedido.id}</HeaderTitle>
        <HeaderTitle style={{ color: colors.primary }}>
          R$ {pedido.total}
        </HeaderTitle>
      </Header>
      <Content>
        <DashedBorder />
        <ContainerInfo>
          {pedido.itens.map(item => (
            <Item>
              <Title>{item.produto.descricao}</Title>
              <Value>
                {Math.floor(item.quantidade)} x R$ {item.produto.preco_venda}
              </Value>
            </Item>
          ))}
        </ContainerInfo>
        <DashedBorder />
        <Item style={{ marginVertical: 20 }}>
          <Title>Total</Title>
          <Value>R$ {pedido.total}</Value>
        </Item>
      </Content>
    </Container>
  );
}
