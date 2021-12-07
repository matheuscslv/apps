import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { addProductBag, removeProductBag } from '~/Components/Bag';
import { colors } from '~/styles';
import sem_imagem from '~/assets/sem_imagem.jpg'

import {
  Container,
  ImageFood,
  Info,
  TitleFood,
  CategoryFood,
  Content,
  Amount,
  Action,
  ActionIcon,
  NumberItem,
  Price,
} from './styles';

export default function Card({ item }) {
  const dispatch = useDispatch();
  const bag = useSelector(state => state.bags.data);
  const total = useSelector(state => state.bags.total);
  const products = useSelector(state => state.products.data);

  const [product] = bag.filter(
    produto => produto.produto_id == item.produto_id
  );

  function type(category) {
    /* if (category == 1) {
      return 'Bebidas';
    } else if (category == 2) {
      return 'Pizzas';
    } else if (category == 3) {
      return 'Sanduiches';
    } else {
      return 'Variados';
    } */
    return 'Variados';
  }

  return (
    <Container>
      {product?.produto?.imagem == null ? 
      <ImageFood
      source={sem_imagem}
    />
      :
      <ImageFood
        source={{
          uri: product?.produto?.imagem,
        }}
      />
      }
      <Info>
        <TitleFood>{product.produto.descricao}</TitleFood>
        <CategoryFood>{product?.secao?.secao}</CategoryFood>
        <Content>
          <Amount>
            {product.quantity != 0 ? (
              <Action
                color={`${colors.primary}`}
                onPress={() =>
                  removeProductBag(product, dispatch, bag, total, products)
                }
              >
                <ActionIcon name="minus" />
              </Action>
            ) : (
                <Action color="#ddd">
                  <ActionIcon name="minus" />
                </Action>
              )}
            <NumberItem>{product.quantity}</NumberItem>

            {product.estoque == 0 && product.produto.venda_sem_estoque == 0 ? (
              <Action color="#ddd">
                <ActionIcon name="plus" />
              </Action>
            ) : (
                <Action
                  color={`${colors.primary}`}
                  onPress={() =>
                    addProductBag(product, dispatch, bag, total, products)
                  }
                >
                  <ActionIcon name="plus" />
                </Action>
              )}
          </Amount>
          <Price>R$ {product.produto.preco_venda}</Price>
        </Content>
      </Info>
    </Container>
  );
}
