import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import tipoPagamento from '~/Components/PaymentType';
import soma, { somaUnitaria, somaOrder } from '~/Components/SumTotalBag';
import api from '~/services/api';
import NavigationService from '~/services/navigation';

import BagActions from '../ducks/bag';
import { setNewPurchase } from './shopping';

import { ShoppingTypes } from '../ducks/shopping';
import { WalletTypes } from '../ducks/wallet';

export function* handlePayment({
  setLoading,
  setOpen,
  closeCart,
  user,
  bag,
  carrinho,
  wallet,
  dispatch,

  delivery,
  paymentType,
  addressType,
  cardType,
  parcelasType,
  troco,

  taxa_entrega,
  empresa_id,
  endereco_entrega_id,
  numero_parcelas,
}) {
  //const tipo = tipoPagamento(wallet, dispatch);

  if (paymentType == 1 || paymentType == 0) {
    const itens = [];
    for (let i = 0; i < bag.length - 1; i++) {
      itens.push({
        preco: bag[i].preco_venda,
        quantidade: bag[i].quantity,
        desconto: 0,
        total: somaUnitaria(bag[i]),
        produto_id: bag[i].id,
        observacao: bag[i].observacao
      });
    }

    const venda_cartao = {
      total: somaOrder(bag),
      embalar_viagem: 'SIM',
      itens,
      forma_pagamento: 'Cartão de Crédito',

      //status: 'Pagamento Confirmado',
      tipo_entrega: delivery ? 'Entregar no endereço' : 'Retirar no Local',
      taxa_entrega: delivery ? taxa_entrega : 0,
      empresa_id,
      endereco_entrega_id: delivery ? endereco_entrega_id : 0,

      cartao_id: cardType,
      numero_parcelas: numero_parcelas,
    };

    console.log(venda_cartao);

    /* try {
      const { data } = yield call(api.post, `/vendas`, venda_cartao);

      if (data == "Pedido não autorizada") {
        Alert.alert(
          "Pedido não confirmado",
          'Pagamento não autorizado pela instuição financeira!'
        );
        setLoading(false);
        return;
      }

      if (data.status === 'Pagamento Falhou') {
        Alert.alert(
          data.status,
          'Pagamento não autorizado pela instuição financeira!'
        );
        setLoading(false);
        return;
      }

      let final = carrinho.filter((item) => item.empresa_id != empresa_id);
      let quantidade = 0;

      for (let i = 0; i < final.length; i++) {
        quantidade = quantidade + final[i].quantity;
      }

      yield put(BagActions.getBagsSuccess(final, quantidade));
      //Alert.alert('Finalização do Pedido', 'Pedido confirmado com sucesso!');

      dispatch({
        type: ShoppingTypes.GET_SHOPPING_RELOAD_REQUEST,
      });

      Alert.alert(
        'Finalização do Pedido',
        'Pedido realizado com sucesso, aguarde a confirmação do estabelecimento!',
        [{ text: 'OK', onPress: () => closeCart() }],
        { cancelable: false }
      );

    //NavigationService.navigate('PurchaseDetail', { id: data.id });
  } catch (error) {
    console.log(error);
    if (String(error).includes('401')) {
      Alert.alert(
        'Usuário não autorizado',
        'É necessário fazer login antes de confirmar seu pedido!'
      );
      NavigationService.navigate('SignIn');
    } else {
      Alert.alert(
        'Finalização do Pedido',
        'Não foi possível confirmar seu pedido!'
      );
    }
  }*/
  } else if (paymentType == 2) {
    const itens = [];
    for (let i = 0; i < bag.length - 1; i++) {
      itens.push({
        preco: bag[i].preco_venda,
        quantidade: bag[i].quantity,
        desconto: 0,
        total: somaUnitaria(bag[i]),
        produto_id: bag[i].id,
        observacao: bag[i].observacao
      });
    }

    const venda_dinheiro = {
      total: somaOrder(bag),
      embalar_viagem: delivery ? 'SIM' : 'NÃO',
      itens,
      forma_pagamento: 'Dinheiro',
      status: 'Aguardando Pagamento',

      tipo_entrega: delivery ? 'Entregar no endereço' : 'Retirar no Local',
      taxa_entrega: delivery ? taxa_entrega : 0,
      empresa_id,
      endereco_entrega_id: delivery ? endereco_entrega_id : 0,
      troco: String(troco).split(' ')[1].replace(',', '.'),
    };

    try {
      const { data } = yield call(api.post, `/vendas`, venda_dinheiro);
      //yield setNewPurchase(data);

      let final = carrinho.filter((item) => item.empresa_id != empresa_id);
      let quantidade = 0;

      for (let i = 0; i < final.length; i++) {
        quantidade = quantidade + final[i].quantity;
      }

      yield put(BagActions.getBagsSuccess(final, quantidade));
      //Alert.alert('Finalização do Pedido', 'Pedido confirmado com sucesso!');

      dispatch({
        type: ShoppingTypes.GET_SHOPPING_RELOAD_REQUEST,
      });

      Alert.alert(
        'Finalização do Pedido',
        'Pedido realizado com sucesso, aguarde a confirmação do estabelecimento!',
        [{ text: 'OK', onPress: () => closeCart() }],
        { cancelable: false }
      );
    } catch (error) {
      console.log(error);
      if (String(error).includes('401')) {
        Alert.alert(
          'Usuário não autorizado',
          'É necessário fazer login antes de confirmar seu pedido!'
        );
        NavigationService.navigate('SignIn');
      } else {
        Alert.alert(
          'Finalização do Pedido',
          'Não foi possível confirmar seu pedido!'
        );
      }
    }
  }
  setLoading(false);
}
