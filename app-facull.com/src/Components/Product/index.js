import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from 'react-redux';

import sem_imagem from '~/assets/sem_imagem.jpg';
import { BagsTypes } from '~/store/ducks/bag';
import { ProductsTypes } from '~/store/ducks/product';
import { colors } from '~/styles';

import { Container } from './styles';

/* import { useSelector, useDispatch } from 'react-redux';
import { ProductsTypes } from '~/store/ducks/product';
import { BagsTypes } from '~/store/ducks/bag'; */

export default function Product({ item }) {
  const dispatch = useDispatch();
  const bag = useSelector(state => state.bags.data);
  const total = useSelector(state => state.bags.total);
  const products = useSelector(state => state.products.data);

  const [product] = products.filter(
    produto => produto.produto_id == item.produto_id
  );

  const [lanche, setLanche] = useState({});

  function addProductBag(id) {
    // dispatch({ type: BagsTypes.GET_BAGS_REQUEST });

    let result;
    if (bag.length > 0) {
      const filter = bag.filter(product => product.produto_id == id);

      if (filter.length > 0) {
        result = bag.map(product =>
          product.produto_id != id
            ? product
            : {
                ...product,
                estoque: product.estoque - 1,
                quantity: product.quantity + 1,
              }
        );

        /* setProduct({
          ...product,
          estoque: product.estoque - 1,
          quantity: product.quantity + 1,
        }); */
        const produto = products.map(product =>
          product.produto_id != id
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
        result = [
          ...bag,
          { ...item, estoque: product.estoque - 1, quantity: 1 },
        ];
        // setProduct({ ...product, estoque: product.estoque - 1, quantity: 1 });

        const produto = products.map(product =>
          product.produto_id != id
            ? product
            : { ...product, estoque: product.estoque - 1, quantity: 1 }
        );

        dispatch({
          type: ProductsTypes.GET_PRODUCTS_SUCCESS,
          data: produto,
        });
      }
    } else {
      result = [...bag, { ...item, estoque: product.estoque - 1, quantity: 1 }];
      // setProduct({ ...product, estoque: product.estoque - 1, quantity: 1 });

      const produto = products.map(product =>
        product.produto_id != id
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
      message: 'Produto adicionado ao carrinho',
      type: 'success',
    });
  }

  function removeProductBag(id) {
    // dispatch({ type: BagsTypes.GET_BAGS_REQUEST });

    let result;
    if (bag.length > 0) {
      const filter = bag.filter(product => product.produto_id == id);

      if (filter.length > 0) {
        if (filter[0].quantity == 0 || filter[0].quantity == 1) {
          result = bag.filter(product => product.produto_id != id);
          // setProduct({ ...product, estoque: product.estoque + 1, quantity: 0 });

          const produto = products.map(product =>
            product.produto_id != id
              ? product
              : { ...product, estoque: product.estoque + 1, quantity: 0 }
          );

          dispatch({
            type: ProductsTypes.GET_PRODUCTS_SUCCESS,
            data: produto,
          });
        } else {
          result = bag.map(product =>
            product.produto_id != id
              ? product
              : {
                  ...product,
                  estoque: product.estoque + 1,
                  quantity: product.quantity - 1,
                }
          );

          /* setProduct({
            ...product,
            estoque: product.estoque + 1,
            quantity: product.quantity - 1,
          }); */

          const produto = products.map(product =>
            product.produto_id != id
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

  useEffect(() => {
    const [novo] = products.filter(
      produto => produto.produto_id == item.produto_id
    );
    setLanche(novo);

    const isBag = bag.filter(bag => bag.produto_id == item.produto_id);

    if (isBag.length > 0) {
      const [daSacola] = bag.filter(
        produto => produto.produto_id == item.produto_id
      );
      setLanche(daSacola);
    }
  }, [bag, item.produto_id, product, products]);

  return (
    <Container style={{ height: 130 }}>
      {lanche?.produto?.imagem == null ? (
        <Image
          source={sem_imagem}
          style={{
            width: 100,
            height: '100%',
            borderRadius: 4,
            marginRight: 15,
          }}
          // resizeMode="stretch"
        />
      ) : (
        <Image
          source={{ uri: lanche?.produto?.imagem }}
          style={{
            width: 100,
            height: '100%',
            borderRadius: 4,
            marginRight: 15,
          }}
          // resizeMode="stretch"
        />
      )}

      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <Text
            style={{
              fontSize: 18,
              fontFamily: Platform.OS == 'ios' ? 'Nunito' : 'Nunito Black',
              fontWeight: Platform.OS == 'ios' ? 'bold' : 'normal',
              marginBottom: 5,
              letterSpacing: 0.6,
              color: `${colors.titleColor}`,
            }}
          >
            {lanche?.produto?.descricao}
          </Text>
          <Text
            style={{
              marginTop: 3,
              fontSize: 14,
              color: `${colors.subTitleColor}`,
              fontFamily: 'Nunito',
              textTransform: 'capitalize',
            }}
          >
            {lanche?.produto?.marca || lanche?.secao?.secao}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 12,
          }}
        >
          <Text
            style={{
              fontFamily: Platform.OS == 'ios' ? 'Nunito' : 'Nunito Black',
              fontWeight: Platform.OS == 'ios' ? 'bold' : 'normal',
              color: colors.primary,
            }}
          >
            R$ {lanche?.produto?.preco_venda}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            {lanche?.quantity != 0 ? (
              <TouchableOpacity
                onPress={() => removeProductBag(item.produto_id)}
              >
                <Icon name="minus-circle" color={colors.primary} size={28} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Icon name="minus-circle" color={colors.light} size={28} />
              </TouchableOpacity>
            )}

            <Text style={{ marginHorizontal: 15, fontSize: 18 }}>
              {lanche?.quantity}
            </Text>

            {lanche?.estoque == 0 && lanche.produto.venda_sem_estoque == 0 ? (
              <TouchableOpacity>
                <Icon name="plus-circle" color={colors.light} size={28} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => addProductBag(item.produto_id)}>
                <Icon name="plus-circle" color={colors.primary} size={28} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Container>
  );
}
