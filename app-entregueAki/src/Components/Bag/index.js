import { showMessage } from 'react-native-flash-message';

import Toast from 'react-native-simple-toast';

import { BagsTypes } from '~/store/ducks/bag';
import { ProductsTypes } from '~/store/ducks/product';

export function addProductBag(item, empresa, dispatch, bag, total, products) {
  let result;

  if (bag.length > 0) {
    const filter = bag.filter(product => product.id == item.id);

    if (filter.length > 0) {
      result = bag.map(product =>
        product.id != item.id
          ? product
          : {
            ...product,
            quantity: product.quantity + 1,
          }
      );
    } else {
      result = [...bag, { ...item, empresa_pedido_minimo: empresa.pedido_minino, empresa_parcelamento_maximo: empresa.parcelamento_maximo, empresa_id: empresa.id, empresa_nome: empresa.nome_fantasia, observacao: "", quantity: 1 }];
    }
  } else {
    result = [...bag, { ...item, observacao: "", quantity: 1, empresa_pedido_minimo: empresa.pedido_minino, empresa_parcelamento_maximo: empresa.parcelamento_maximo, empresa_id: empresa.id, empresa_nome: empresa.nome_fantasia }];
  }

  dispatch({
    type: BagsTypes.GET_BAGS_SUCCESS,
    data: result,
    total: total + 1,
  });

  Toast.show('Produto adicionado na cesta', Toast.SHORT);
  /* showMessage({
    message: 'Produto adicionado na cesta',
    type: 'success',
  }); */
}

export function removeProductBag(item, empresa, dispatch, bag, total, products) {
  // dispatch({ type: BagsTypes.GET_BAGS_REQUEST });

  let result = [];
  if (bag.length > 0) {
    const filter = bag.filter(product => product.id == item.id);

    if (filter.length > 0) {
      if (filter[0].quantity == 0 || filter[0].quantity == 1) {
        result = bag.filter(product => product.id != item.id);
      } else {
        result = bag.map(product =>
          product.id != item.id
            ? product
            : {
              ...product,
              quantity: product.quantity - 1,
            }
        );
      }

      const filter_empresa = bag.filter(product => product.empresa_id == item.empresa_id);

      dispatch({
        type: BagsTypes.GET_BAGS_SUCCESS,
        data: result,
        total: total - 1,
      });

      if (filter_empresa.length == 1 && filter_empresa[0].quantity == 1) {
        Toast.show('Produto removido da cesta / Cesta removida com sucesso', Toast.SHORT);
        /* showMessage({
          message: 'Produto removido da cesta / Cesta removida com sucesso',
          type: 'danger',
          backgroundColor: '#f00',
          color: '#fff',
        }); */
      } else {
        Toast.show('Produto removido da cesta', Toast.SHORT);
        /* showMessage({
          message: 'Produto removido da cesta',
          type: 'danger',
          backgroundColor: '#f00',
          color: '#fff',
        }); */
      }
    }
  }
}

export function removeProductBagCart(item, empresa, dispatch, bag, total, products) {
  // dispatch({ type: BagsTypes.GET_BAGS_REQUEST });

  let result = [];
  if (bag.length > 0) {
    const filter = bag.filter(product => product.id == item.id);

    if (filter.length > 0) {
      result = bag.filter(product => product.id != item.id);
      const filter_empresa = bag.filter(product => product.empresa_id == item.empresa_id);

      dispatch({
        type: BagsTypes.GET_BAGS_SUCCESS,
        data: result,
        total: total - filter[0].quantity,
      });

      if (filter_empresa.length == 1) {
        Toast.show('Produto removido da cesta / Cesta removida com sucesso', Toast.SHORT);
        /* showMessage({
          message: 'Produto removido da cesta / Cesta removida com sucesso',
          type: 'danger',
          backgroundColor: '#f00',
          color: '#fff',
        }); */
      } else {
        Toast.show('Produto removido da cesta', Toast.SHORT);
        /* showMessage({
          message: 'Produto removido da cesta',
          type: 'danger',
          backgroundColor: '#f00',
          color: '#fff',
        }); */
      }
    }
  }
}
