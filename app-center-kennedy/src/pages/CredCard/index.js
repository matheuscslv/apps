import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Container,
  Button,
  ContentCard,
  CardNumber,
  Remove,
  FlagCard,
} from './styles';
import ModalForm from './ModalForm';
import {colors} from '~/styles';

export default function CredCard() {
  const [modal, setModal] = useState(false);

  function getCardFlag(cardnumber) {
    var cardnumber = cardnumber.replace(/[^0-9]+/g, '');

    var cards = {
      visa: /^4[0-9]{12}(?:[0-9]{3})/,
      mastercard: /^5[1-5][0-9]{14}/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
      amex: /^3[47][0-9]{13}/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
      hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
      elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}/,
      aura: /^(5078\d{2})(\d{2})(\d{11})$/,
    };

    for (var flag in cards) {
      if (cards[flag].test(cardnumber)) {
        return `${flag}`;
      }
    }

    return false;
  }

  useEffect(() => {
    console.log(getCardFlag('6509079000336005'));
  }, []);

  function addNewCard(values) {
    console.log(values);
  }

  return (
    <Container>
      <Button onPress={() => setModal(true)}>
        <Icon name="plus" color="#fff" size={40} />
      </Button>

      <Modal transparent animationType="fade" visible={modal}>
        <ModalForm handleSubmit={addNewCard} setModal={setModal} />
      </Modal>

      <ContentCard>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FlagCard
            source={require('~/assets/mastercard.png')}
            resizeMode="contain"
          />
          <CardNumber>**** **** **** 9999</CardNumber>
        </View>
        <TouchableOpacity
          style={{
            alignItems: 'flex-end',
            width: 100,
            position: 'absolute',
            bottom: 5,
            right: 20,
          }}>
          <Remove>Excluir</Remove>
        </TouchableOpacity>
      </ContentCard>
    </Container>
  );
}

CredCard.navigationOptions = {
  headerTitle: 'Meus Cartões',
};
