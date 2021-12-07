import React, { useState, useCallback } from 'react';
import { View, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import CreditCard from '~/Components/CreditCard';
import Voucher from '~/Components/Voucher';
import getFlag from '~/scripts/getFlag';
import NavigationService from '~/services/navigation';
import { WalletTypes } from '~/store/ducks/wallet';

import {
  Container,
  Content,
  Header,
  HeaderTitle,
  Body,
  ItemContainer,
  Item,
  ItemText,
  Description,
  Marker,
  ImageCard,
} from './styles';

export default function PaymentMethod({ onClose }) {
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);
  const cards = useSelector(state => state.wallet.cards);
  const credit = useSelector(state => state.wallet.credit);
  const money = useSelector(state => state.wallet.money);
  const credit_selected = useSelector(state => state.wallet.credit_selected);
  const moneyAndCredit = useSelector(state => state.wallet.moneyAndCredit);

  const [modalCredit, setCredit] = useState(false);
  const [modalVoucher, setVoucher] = useState(false);

  const selectMoney = useCallback(() => {
    dispatch({
      type: WalletTypes.GET_MONEY_OPTION,
    });
    onClose(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectMoneyAndCredit = useCallback(() => {
    dispatch({
      type: WalletTypes.GET_MONEY_AND_CREDIT_OPTION,
    });
    onClose(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCredit = useCallback(() => {
    dispatch({
      type: WalletTypes.GET_CREDIT_OPTION,
    });
    onClose(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCard = useCallback(
    id => {
      dispatch({
        type: WalletTypes.GET_CARD_OPTION,
        id,
      });
      onClose(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const renderCards = useCallback(() => {
    return cards.map(card => (
      <ItemContainer onPress={() => selectCard(card.id)}>
        <Item>
          <Marker selected={card.selected} />
          <View>
            <ItemText>{card['4primeiros_digitos']} **** **** ****</ItemText>
            <Description>Crédito</Description>
          </View>
        </Item>
        <ImageCard source={getFlag(card.bandeira)} resizeMode="contain" />
      </ItemContainer>
    ));
  }, [cards, selectCard]);

  function handleSelectCard() {
    if (!token) {
      onClose(false);
      Alert.alert(
        'Adicionar cartão',
        'É necessário fazer login antes para adicionar um novo cartão!'
      );
      NavigationService.navigate('SignIn');
      return;
    }
    setCredit(true);
  }

  return (
    <Container>
      <Content>
        <Header onPress={() => onClose(false)}>
          <Icon name="close" size={25} color="#333" />
          <HeaderTitle>Formas de pagamento</HeaderTitle>
        </Header>
        <Body>
          {renderCards()}
          {/* <ItemContainer onPress={selectCredit}>
            <Item>
              <Marker selected={credit_selected} />
              <View>
                <ItemText>Utilizar credito voucher</ItemText>
                <Description>Saldo atual: R$ {credit}</Description>
              </View>
            </Item>
            <Icon size={25} color="#666" name="ticket" />
          </ItemContainer>
          <ItemContainer onPress={selectMoneyAndCredit}>
            <Item>
              <Marker selected={!!moneyAndCredit} />
              <View>
                <ItemText>Voucher + Dinherio</ItemText>
                <Description>
                  Saldo: R$ {credit} + Dinheiro em espécie
                </Description>
              </View>
            </Item>
            <Icon size={25} color="#666" name="money" />
  </ItemContainer> */}
          <ItemContainer onPress={selectMoney}>
            <Item>
              <Marker selected={money} />
              <View>
                <ItemText>Pagar no local</ItemText>
                <Description>Dinheiro em espécie</Description>
              </View>
            </Item>
            <Icon size={25} color="#666" name="money" />
          </ItemContainer>

          <ItemContainer onPress={handleSelectCard}>
            <Item>
              <Marker />
              <View>
                <ItemText>Adicionar novo cartão</ItemText>
                <Description>Apenas crédito</Description>
              </View>
            </Item>
            <Icon size={25} color="#666" name="credit-card" />
          </ItemContainer>
          {/*
           <ItemContainer onPress={() => setVoucher(true)}>
            <Item>
              <Marker />
              <View>
                <ItemText>Adicionar novo voucher</ItemText>
                <Description>Informe o codigo</Description>
              </View>
            </Item>
            <Icon size={25} color="#666" name="ticket" />
          </ItemContainer> */}
        </Body>
      </Content>
      <Modal
        animationType="slide"
        transparent
        visible={modalCredit}
        onRequestClose={() => setCredit(false)}
      >
        <CreditCard onClose={setCredit} />
      </Modal>
      <Modal
        animationType="slide"
        transparent
        visible={modalVoucher}
        onRequestClose={() => setVoucher(false)}
      >
        <Voucher onClose={setVoucher} />
      </Modal>
    </Container>
  );
}
