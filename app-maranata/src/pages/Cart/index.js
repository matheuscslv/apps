import React, { useState, useCallback, useMemo } from 'react';
import { FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector } from 'react-redux';
import Button from '~/components/Button';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';
import {
  Container,
  ContentPayment,
  Item,
  Total,
  Amount,
  IsEmptyContainer,
  IsEmptyText,
} from './styles';
import formatPrice from '~/utils/formatPrice';

export default function Cart() {
  const navigation = useNavigation();
  const user = useSelector((state) => state.user.token);
  const bag = useSelector((state) => state.bags.data);
  const totalvalue = bag.reduce(
    (amount, item) => amount + item.preco_venda * item.quantity,
    0,
  );

  const numItens = bag.reduce((total, item) => total + item.quantity, 0);
  const formattedPrice = useMemo(() => formatPrice(totalvalue), [totalvalue]);

  const listEmpty = useCallback(() => {
    return (
      <IsEmptyContainer>
        <Icon color="#666" name="cart-minus" size={50} />
        <IsEmptyText>Seu carrinho está vazio!</IsEmptyText>
      </IsEmptyContainer>
    );
  }, []);

  const renderBag = useMemo(() => {
    return (
      <FlatList
        data={bag}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={(item) => String(item.id)}
        style={{ marginBottom: 10 }}
      />
    );
  }, [bag]);

  const navigateToCheckout = useCallback(() => {
    if (!user) {
      Alert.alert(
        'Um momento',
        'Você precisa estar logado para continuar a transação!',
      );
      return navigation.navigate('Auth');
    }
    navigation.navigate('Checkout');
  }, []);

  return (
    <>
      {bag.length > 0 && (
        <>
          <Container>{renderBag}</Container>
          <ContentPayment>
            <Item>
              <Total>Valor total</Total>
              <Amount>{formattedPrice}</Amount>
            </Item>
            <Button width="100%" onPress={navigateToCheckout}>
              IR PARA O PAGAMENTO
            </Button>
          </ContentPayment>
        </>
      )}
      {bag.length === 0 && listEmpty()}
    </>
  );
}
