import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  Text,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CreditCard from '~/Components/CreditCard';
import getFlag from '~/scripts/getFlag';
import { WalletTypes } from '~/store/ducks/wallet';

import {
  Container,
  FAIcon,
  Option,
  Title,
  Button,
  IconCard,
  Icons,

  ButtonNew,
  Text2
} from './styles';
import { colors } from '~/styles';

export default function MyCards() {
  const dispatch = useDispatch();
  const cards = useSelector(state => state.wallet.cards);
  const [modalCredit, setCredit] = useState(false);
  const [loadingExclude, setLoadingExclude] = useState(false);

  async function handleDeleteCard(id) {

    Alert.alert(
      'Atenção',
      'Deseja mesmo excluir este cartão?',
      [
        {
          text: 'Cancelar',
          onPress: () => { },
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
      { cancelable: false }
    );
  }

  return (
    <Container>

      {cards.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              padding: 40,
              textAlign: 'center',
              color: '#333',
              fontFamily: "Quicksand-Regular",
              lineHeight: 28,
            }}
          >
            Por enquanto você não tem cartões cadastrados!
          </Text>
        </View>
      ) : (
          <ScrollView>
            {cards?.map(card => (
              <Option>
                <Icons>
                  <IconCard source={getFlag(card.bandeira)} resizeMode="contain" />
                  <View>
                    <Title>{card['4primeiros_digitos']} **** **** ****</Title>
                    <Title>{`Validade: ${card['mes_expiracao']}/${card['ano_expiracao']}`}</Title>
                  </View>
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
          </ScrollView>
        )}



      {/* <Button onPress={() => setCredit(true)}>
        <FAIcon
          name="plus"
          color="#fff"
          size={30}
          style={{ padding: 0, margin: 0, textAlign: 'center' }}
        />
      </Button> */}

      <View style={{ padding: 10 }}>
        <ButtonNew onPress={() => setCredit(true)}>
          <Text2 transform={'uppercase'} font={"Quicksand-Bold"} color={colors.success}>Novo Cartão</Text2>
        </ButtonNew>
      </View>

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

MyCards.navigationOptions = {
  headerTitle: 'Cartões salvos',
};
