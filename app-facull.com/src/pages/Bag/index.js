import React, { useState, useCallback, useMemo } from 'react';
import {
  FlatList,
  Modal,
  Switch,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import isempty from '~/assets/isEmpty.png';
import tipoPagamento from '~/Components/PaymentType';
import soma from '~/Components/SumTotalBag';
import finalCardNumber from '~/scripts/finalCard';
import api from '~/services/api';
import { BagsTypes } from '~/store/ducks/bag';

import Card from './Card';
import PaymentMethod from './PaymentMethod';
import {
  Container,
  ContentPayment,
  Item,
  Total,
  Amount,
  Payment,
  TypePayment,
  Button,
  ButtonText,
  SelectPayment,
  Replace,
  IsEmptyContainer,
  IsEmptyImage,
  IsEmptyText,
} from './styles';

export default function Bag({ navigation }) {
  const dispatch = useDispatch();
  const bag = useSelector(state => state.bags.data);
  const trip = useSelector(state => state.bags.trip);
  const cards = useSelector(state => state.wallet.cards);
  const credit = useSelector(state => state.wallet.credit);
  const money = useSelector(state => state.wallet.money);
  const credit_selected = useSelector(state => state.wallet.credit_selected);
  const card_selected = useSelector(state => state.wallet.card_selected);
  const moneyAndCredit = useSelector(state => state.wallet.moneyAndCredit);

  const user = useSelector(state => state.user.data);
  const wallet = useSelector(state => state.wallet);

  const [modalSelectPayment, setPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  const listEmpty = useCallback(() => {
    return (
      <IsEmptyContainer>
        <IsEmptyImage source={isempty} />
        <IsEmptyText>Sua sacola esta vazia!</IsEmptyText>
      </IsEmptyContainer>
    );
  }, []);

  const renderMethodPayment = useCallback(() => {
    if (money) {
      return 'Dinheiro em especie';
    }
    if (credit_selected) {
      return `Crédito Voucher! Saldo R$ ${credit}`;
    }
    if (card_selected) {
      return `Cartão de crédito (Inicio ${card_selected['4primeiros_digitos']})`;
    }
    if (moneyAndCredit) {
      return `Saldo: R$ ${credit} + Dinheiro em espécie`;
    }
    return `Selecione`;
  }, [card_selected, credit, credit_selected, money, moneyAndCredit]);

  const renderBag = useMemo(() => {
    return (
      <FlatList
        data={bag}
        renderItem={({ item }) => <Card item={item} />}
        keyExtractor={item => item}
        style={{ marginBottom: 10 }}
      />
    );
  }, [bag]);

  const alterTrip = useCallback(() => {
    dispatch({
      type: BagsTypes.SET_TRIP,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function finishedOrder() {
    setLoading(true);
    const {
      data: { funcionando },
    } = await api.get('/loja-funcionando');

    if (!funcionando) {
      Alert.alert(
        'Horário encerrado',
        'Desculpe, não estamos mais aceitando pedidos hoje!'
      );
      setLoading(false);
      return;
    }

    // chamada saga
    dispatch({
      type: BagsTypes.GET_BAGS_REQUEST,
      setLoading,
      user,
      bag,
      trip,
      wallet,
      dispatch,
    });
  }

  return (
    <>
      {bag.length > 0 && (
        <>
          <Container>{renderBag}</Container>
          <ContentPayment>
            <Item>
              <Total>Embalar para viagem</Total>
              <Switch
                onValueChange={alterTrip}
                value={trip}
                style={{ marginRight: 25 }}
              />
            </Item>
            <Item>
              <Total>Valor total</Total>
              <Amount>R$ {soma(bag)}</Amount>
            </Item>
            <SelectPayment onPress={() => setPayment(true)}>
              <Payment>
                <Total>Método de pagamento</Total>
                <TypePayment>{renderMethodPayment()}</TypePayment>
              </Payment>

              <Replace>alterar</Replace>
            </SelectPayment>
            <Button disabled={loading} onPress={!loading && finishedOrder}>
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <ButtonText>FINALIZAR PEDIDO</ButtonText>
              )}
            </Button>
          </ContentPayment>
        </>
      )}

      {bag.length === 0 && listEmpty()}
      <Modal
        animationType="slide"
        transparent
        visible={modalSelectPayment}
        onRequestClose={() => setPayment(false)}
      >
        <PaymentMethod onClose={setPayment} />
      </Modal>
    </>
  );
}
