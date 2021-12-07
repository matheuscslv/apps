import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { getIconWithFlag } from '~/scripts/card';
import { WalletTypes } from '~/store/ducks/wallet';

import {
  Container,
  FAIcon,
  Option,
  Title,
  Button,
  IconCard,
  Icons,
} from './styles';
import IsEmpty from '~/components/IsEmpty';
import CreditCard from '~/components/CreditCard';

export default function Cards() {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.wallet.cards);
  const [modalCredit, setCredit] = useState(false);
  const [loadingExclude, setLoadingExclude] = useState(false);

  async function handleDeleteCard(id) {
    Alert.alert(
      'Atenção',
      'Deseja mesmo excluir este cartão?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            setLoadingExclude(true);
            dispatch({
              type: WalletTypes.DELETE_CARD_REQUEST,
              card_id: id,
              setLoading: setLoadingExclude,
            });
          },
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <Container>
      {cards?.map((card) => (
        <Option key={card.cartao_id} >
          <Icons>
            <IconCard
              source={getIconWithFlag(card.bandeira)}
              resizeMode="contain"
            />
            <Title>{card['4primeiros_digitos']} **** **** ****</Title>
          </Icons>

          <TouchableOpacity
            activeOpacity={0.5}
            hitSlop={{ top: 4, left: 4, bottom: 4, right: 4 }}
            disabled={loadingExclude}
            onPress={() => handleDeleteCard(card.cartao_id)}
          >
            {loadingExclude ? (
              <ActivityIndicator color="#8b0000" size="small" />
            ) : (
              <FAIcon name="trash-2" color="#8b0000" size={25} />
            )}
          </TouchableOpacity>
        </Option>
      ))}

      {cards.length === 0 && (
        <IsEmpty title="Por enquanto você nao tem cartões cadastrados!" />
      )}

      <Button onPress={() => setCredit(true)}>
        <FAIcon
          name="plus"
          color="#fff"
          size={30}
          style={{ padding: 0, margin: 0, textAlign: 'center' }}
        />
      </Button>
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

Cards.navigationOptions = {
  headerTitle: 'Cartões salvos',
};
