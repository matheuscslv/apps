import React, { useState, useMemo, useCallback } from 'react';
import { Modal, Alert } from 'react-native';
import MaIcon from 'react-native-vector-icons/MaterialIcons';
import PaymentMethod from './PaymentMethod';
import {
  Container,
  Content,
  ContentUser,
  ContentPayment,
  Header,
  UserInformations,
  Name,
  Address,
  OptionsPayment,
  OptionButton,
  OptionName,
  NumberCard,
  Title,
  Item,
  TitleItem,
  ValueItem,
  Icon,
  Bold,
} from './styles';
import ButtonChange from './Button';
import { useSelector, useDispatch } from 'react-redux';
import Button from '~/components/Button';
import WalletActions from '~/store/ducks/wallet';
import formatPrice from '~/utils/formatPrice';

export default function Checkout({ navigation, route }) {
  const bag = useSelector((state) => state.bags.data);
  const total = bag.reduce(
    (amount, item) => amount + item.preco_venda * item.quantity,
    0,
  );

  const numItens = bag.reduce((total, item) => total + item.quantity, 0);
  const formattedValue = useMemo(() => formatPrice(total), [total]);

  const dispatch = useDispatch();
  const address = useSelector((state) => state.adresses.data).find(
    (address) => address.isDefault,
  );
  const user = useSelector((state) => state.user?.data?.name);
  const loading = useSelector((state) => state.wallet.loading);
  const money = useSelector((state) => state.wallet.money);
  const debit = useSelector((state) => state.wallet.debit);
  const card_selected = useSelector((state) => state.wallet.card_selected);

  const [modalSelectPayment, setPayment] = useState(false);
  const [deliveryType, setDeliveryType] = useState(true);

  const typeHome = useMemo(() => deliveryType, [deliveryType]);
  const typeStore = useMemo(() => !deliveryType, [deliveryType]);

  const renderMethodPayment = useMemo(() => {
    if (money) {
      return 'Dinheiro';
    }
    if (card_selected) {
      return `Cartão de crédito (Inicio ${card_selected['4primeiros_digitos']})`;
    }
    if (debit) {
      return `Débito`;
    }
    return `Selecione`;
  }, [card_selected, money]);

  const handlePayment = useCallback(() => {
    if (!address) {
      Alert.alert('Fique atento', 'Você deve selecionar um endereço!');
      return;
    }

    const tipo_entrega = deliveryType
      ? 'Entregar no endereço'
      : 'Retirar no local';
    const forma_pagamento = card_selected ? 'Cartão de Crédito' : 'Dinheiro';
    const endereco_entrega_id = address.id;
    const card = card_selected;
    const numero_parcelas = 1;

    dispatch(
      WalletActions.handleProcessPayment({
        tipo_entrega,
        forma_pagamento: debit ? 'Débito' : forma_pagamento,
        endereco_entrega_id,
        card,
        numero_parcelas,
      }),
    );
  });

  const handleSelectAddress = useCallback(() => {
    if (!user) {
      Alert.alert(
        'Selecionar endereço',
        'É necessário fazer login antes para selecionar um endereço!',
      );
      return navigation.navigate('Auth');
    }
    navigation.navigate('Adresses');
  });

  return (
    <>
      <Container>
        <Content>
          <Header>
            <Title>Endereço de entrega</Title>
          </Header>
          <ContentUser>
            <MaIcon size={20} name="location-on" color="#999" />
            <UserInformations>
              <Name>{user}</Name>
              <Address>
                {address?.formattedAddress ||
                  'Por favor, selecione ou cadastre um novo endereço'}
              </Address>
            </UserInformations>
            <ButtonChange onPress={handleSelectAddress}>Alterar</ButtonChange>
          </ContentUser>
        </Content>

        <Content>
          <Header>
            <Title>Como você deseja receber seu produto?</Title>
          </Header>
          <OptionsPayment>
            <OptionButton
              onPress={() => setDeliveryType(!deliveryType)}
              selected={typeHome}
            >
              <Icon size={20} name="local-shipping" selected={typeHome} />
              <OptionName selected={typeHome}>
                Entregue na minha casa
              </OptionName>
            </OptionButton>
            <OptionButton
              onPress={() => setDeliveryType(!deliveryType)}
              selected={typeStore}
            >
              <Icon size={20} name="store" selected={typeStore} />
              <OptionName selected={typeStore}>Vou retirar no local</OptionName>
            </OptionButton>
          </OptionsPayment>
        </Content>

        <Content>
          <Header>
            <Title>Selecione o método de pagamento</Title>
          </Header>
          <ContentPayment>
            <MaIcon size={20} name="attach-money" color="#999" />
            <NumberCard>{renderMethodPayment}</NumberCard>
            <ButtonChange onPress={() => setPayment(true)}>
              Alterar
            </ButtonChange>
          </ContentPayment>
        </Content>

        <Content>
          <Header>
            <Title>Resumo do Pedido ({numItens} itens)</Title>
          </Header>

          <Item>
            <TitleItem>Subtotal</TitleItem>
            <ValueItem>{formattedValue}</ValueItem>
          </Item>
          <Item>
            <TitleItem>Taxa de entrega</TitleItem>
            <ValueItem> - </ValueItem>
          </Item>
          <Item>
            <TitleItem>Descontos</TitleItem>
            <ValueItem> - </ValueItem>
          </Item>
          <Item>
            <TitleItem>
              <Bold>Total</Bold>
            </TitleItem>
            <ValueItem>
              <Bold>{formattedValue}</Bold>
            </ValueItem>
          </Item>
        </Content>
        <Modal
          animationType="slide"
          transparent
          visible={modalSelectPayment}
          onRequestClose={() => setPayment(false)}
        >
          <PaymentMethod onClose={setPayment} />
        </Modal>
      </Container>

      <Button
        width="100%"
        onPress={handlePayment}
        loading={loading}
        disabled={loading}
      >
        FINALIZAR PEDIDO
      </Button>
    </>
  );
}
