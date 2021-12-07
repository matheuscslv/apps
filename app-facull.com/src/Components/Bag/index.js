import { showMessage } from 'react-native-flash-message';

import { BagsTypes } from '~/store/ducks/bag';
import { ProductsTypes } from '~/store/ducks/product';

export function addProductBag(item, dispatch, bag, total, products) {
  let result;
  if (bag.length > 0) {
    const filter = bag.filter(product => product.produto_id == item.produto_id);

    if (filter.length > 0) {
      result = bag.map(product =>
        product.produto_id != item.produto_id
          ? product
          : {
              ...product,
              estoque: product.estoque - 1,
              quantity: product.quantity + 1,
            }
      );

      /* setProduct({
        ...item,
        estoque: item.estoque - 1,
        quantity: item.quantity + 1,
      }); */

      const produto = products.map(product =>
        product.produto_id != item.produto_id
          ? product
          : {
              ...product,
              estoque: product.estoque - 1,
              quantity: product.quantity + 1,
            }
      );

      dispatch({
        type: ProductsTypes.GET_PRODUCTS_SUCCESS,
        data: produto,
      });
    } else {
      result = [...bag, { ...item, estoque: item.estoque - 1, quantity: 1 }];
      // setProduct({ ...item, estoque: item.estoque - 1, quantity: 1 });

      const produto = products.map(product =>
        product.produto_id != item.produto_id
          ? product
          : { ...product, estoque: product.estoque - 1, quantity: 1 }
      );

      dispatch({
        type: ProductsTypes.GET_PRODUCTS_SUCCESS,
        data: produto,
      });
    }
  } else {
    result = [...bag, { ...item, estoque: item.estoque - 1, quantity: 1 }];
    // setProduct({ ...item, estoque: item.estoque - 1, quantity: 1 });

    const produto = products.map(product =>
      product.produto_id != item.produto_id
        ? product
        : { ...product, estoque: product.estoque - 1, quantity: 1 }
    );

    dispatch({
      type: ProductsTypes.GET_PRODUCTS_SUCCESS,
      data: produto,
    });
  }

  dispatch({
    type: BagsTypes.GET_BAGS_SUCCESS,
    data: result,
    total: total + 1,
  });

  showMessage({
    message: 'Produto adicionado o carrinho',
    type: 'success',
  });
}

export function removeProductBag(item, dispatch, bag, total, products) {
  // dispatch({ type: BagsTypes.GET_BAGS_REQUEST });

  let result;
  if (bag.length > 0) {
    const filter = bag.filter(product => product.produto_id == item.produto_id);

    if (filter.length > 0) {
      if (filter[0].quantity == 0 || filter[0].quantity == 1) {
        result = bag.filter(product => product.produto_id != item.produto_id);
        // setProduct({ ...item, estoque: item.estoque + 1, quantity: 0 });

        const produto = products.map(product =>
          product.produto_id != item.produto_id
            ? product
            : { ...product, estoque: product.estoque + 1, quantity: 0 }
        );

        dispatch({
          type: ProductsTypes.GET_PRODUCTS_SUCCESS,
          data: produto,
        });
      } else {
        result = bag.map(product =>
          product.produto_id != item.produto_id
            ? product
            : {
                ...product,
                estoque: product.estoque + 1,
                quantity: product.quantity - 1,
              }
        );

        /* setProduct({
          ...item,
          estoque: item.estoque + 1,
          quantity: item.quantity - 1,
        }); */

        const produto = products.map(product =>
          product.produto_id != item.produto_id
            ? product
            : {
                ...product,
                estoque: product.estoque + 1,
                quantity: product.quantity - 1,
              }
        );

        dispatch({
          type: ProductsTypes.GET_PRODUCTS_SUCCESS,
          data: produto,
        });
      }
    }
  }

  dispatch({
    type: BagsTypes.GET_BAGS_SUCCESS,
    data: result,
    total: total - 1,
  });

  showMessage({
    message: 'Produto removido do carrinho',
    type: 'danger',
    backgroundColor: '#f00',
    color: '#fff',
  });
}
