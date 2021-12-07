import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import tipoPagamento from '~/Components/PaymentType';
import soma, { somaUnitaria } from '~/Components/SumTotalBag';
import api from '~/services/api';
import NavigationService from '~/services/navigation';

import { setNewPurchase } from './shopping';

export function* handlePayment({
  setLoading,
  user,
  bag,
  trip,
  wallet,
  dispatch,
}) {
  const tipo = tipoPagamento(wallet, dispatch);

  if (String(tipo) === 'Cartão') {
    const itens = [];
    for (let i = 0; i < bag.length; i++) {
      itens.push({
        preco: bag[i].produto.preco_venda,
        quantidade: bag[i].quantity,
        desconto: 0,
        total: somaUnitaria(bag[i]),
        produto_id: bag[i].produto_id,
      });
    }

    const venda_cartao = {
      total: soma(bag),
      embalar_viagem: trip ? 'SIM' : 'NÃO',
      itens,
      forma_pagamento: 'Cartão de Crédito',
      cartao_id: wallet.card_selected.cartao_id,
    };

    try {
      if (!user) {
        Alert.alert(
          'Finalização do Pedido',
          'É necessário fazer login antes de confirmar seu pedido!'
        );
        NavigationService.navigate('SignIn');
      } else {
        const { data } = yield call(api.post, `/vendas`, venda_cartao);
        if (data.status === 'Pagamento Falhou') {
          Alert.alert(
            data.status,
            'Pagamento não autorizado pela instuição financeira!'
          );
          setLoading(false);
          return;
        }

        yield setNewPurchase(data);
        NavigationService.navigate('PurchaseConfirmation', { pedido: data });
      }
    } catch (error) {
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
  } else if (String(tipo) === 'Dinheiro') {
    const itens = [];
    for (let i = 0; i < bag.length; i++) {
      itens.push({
        preco: bag[i].produto.preco_venda,
        quantidade: bag[i].quantity,
        desconto: 0,
        total: somaUnitaria(bag[i]),
        produto_id: bag[i].produto_id,
      });
    }

    const venda_dinheiro = {
      total: soma(bag),
      embalar_viagem: trip ? 'SIM' : 'NÃO',
      itens,
      forma_pagamento: 'Dinheiro',
      status: 'Aguardando Pagamento',
    };

    try {
      if (!user) {
        Alert.alert(
          'Finalização do Pedido',
          'É necessário fazer login antes de confirmar seu pedido!'
        );
        NavigationService.navigate('SignIn');
      } else {
        const { data } = yield call(api.post, `/vendas`, venda_dinheiro);
        yield setNewPurchase(data);
        Alert.alert('Finalização do Pedido', 'Pedido confirmado com sucesso!');

        NavigationService.navigate('PurchaseConfirmation', { pedido: data });
      }
    } catch (error) {
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
