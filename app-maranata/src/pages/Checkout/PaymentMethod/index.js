import React, { useState, useCallback, useMemo } from 'react';
import { View, Modal, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import CreditCard from '~/components/CreditCard';

import { getIconWithFlag } from '~/scripts/card';
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
  const token = useSelector((state) => state.user.token);
  const cards = useSelector((state) => state.wallet.cards);
  const money = useSelector((state) => state.wallet.money);
  const debit = useSelector((state) => state.wallet.debit);

  const [modalCredit, setCredit] = useState(false);

  const selectMoney = useCallback(() => {
    dispatch({
      type: WalletTypes.GET_MONEY_OPTION,
    });
    onClose(false);
  }, []);

  const selectDebit = useCallback(() => {
    dispatch({
      type: WalletTypes.SELECT_DEBIT_REQUEST,
    });
    onClose(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCard = useCallback(
    (id) => {
      dispatch({
        type: WalletTypes.GET_CARD_OPTION,
        id,
      });
      onClose(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderCards = useMemo(() => {
    return cards.map((card) => (
      <ItemContainer key={card.id} onPress={() => selectCard(card.id)}>
        <Item>
          <Marker selected={card.selected} />
          <View>
            <ItemText>{card['4primeiros_digitos']} **** **** ****</ItemText>
            <Description>Crédito</Description>
          </View>
        </Item>
        <ImageCard
          source={getIconWithFlag(card.bandeira)}
          resizeMode="contain"
        />
      </ItemContainer>
    ));
  }, [cards, selectCard]);

  function handleSelectCard() {
    if (!token) {
      onClose(false);
      Alert.alert(
        'Adicionar cartão',
        'É necessário fazer login antes para adicionar um novo cartão!',
      );
      NavigationService.navigate('Auth');
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
          {renderCards}
          <ItemContainer onPress={selectDebit}>
            <Item>
              <Marker selected={debit} />
              <View>
                <ItemText>Pagar no débito</ItemText>
                <Description>Débito</Description>
              </View>
            </Item>
            <Icon size={25} color="#666" name="credit-card" />
          </ItemContainer>

          <ItemContainer onPress={selectMoney}>
            <Item>
              <Marker selected={money} />
              <View>
                <ItemText>Pagar no dinheiro</ItemText>
                <Description>Dinheiro</Description>
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
    </Container>
  );
}
