import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Product from '~/Components/Product';
import api from '~/services/api';
import { ProductsTypes } from '~/store/ducks/product';

import { Container, ViewSearch } from './styles';

import Search from '~/Components/Search';

export default function ProductList({ navigation }) {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.data);

  const [loading, setLoading] = useState(true);
  const [lanches, setLanches] = useState([]);
  const [lanchesAll, setLanchesAll] = useState([]);
  const [type] = useState(navigation.getParam('type'));

  const [currentPage, setCurrentPage] = useState(1);

  const [emBusca, setEmBusca] = useState(false);

  async function getProducts(page = 1) {
    const produtos = await api.get(
      `/cardapio/secao/${type}/produtos?page=${page}`
    );

    /* let teste = {
      current_page: 1,
      data: [
        {
          created_at: '2020-02-04 14:00:37',
          id: 1,
          produto: [Object],
          produto_id: 1,
          secao_id: 1,
          updated_at: '2020-02-04 14:00:37',
        },
        {
          created_at: '2020-02-04 14:24:30',
          id: 4,
          produto: [Object],
          produto_id: 2,
          secao_id: 1,
          updated_at: '2020-02-04 14:24:30',
        },
      ],
      first_page_url:
        'https://lanchonete-backend.snplus.com.br/api/v1/cardapio/secao/1/produtos?page=1',
      from: 1,
      last_page: 1,
      last_page_url:
        'https://lanchonete-backend.snplus.com.br/api/v1/cardapio/secao/1/produtos?page=1',
      next_page_url: null,
      path:
        'https://lanchonete-backend.snplus.com.br/api/v1/cardapio/secao/1/produtos',
      per_page: 30,
      prev_page_url: null,
      to: 2,
      total: 2,
    }; */

    // venda_sem_estoque == 0 && estoque == 0 -> nao exibe o produto
    // venda_Sem_estoque -> estoque infinito

    let final = [];
    final = [...products];

    let isinside = false;
    for (let i = 0; i < produtos.data.data.length; i++) {
      isinside = false;

      for (let j = 0; j < products.length; j++) {
        if (produtos.data.data[i].produto_id == products[j].produto_id) {
          // final.push(products[j]);
          isinside = true;
        }
      }

      try {
        if (!isinside) {
          final.push({
            ...produtos.data.data[i],
            estoque:
              produtos.data.data[i].produto.estoque <= 0
                ? 0
                : produtos.data.data[i].produto.estoque,
            quantity: 0,
          });
        } else {
          final = final.map(item =>
            item.produto_id != produtos.data.data[i].produto_id
              ? item
              : {
                  ...item,
                  estoque:
                    produtos.data.data[i].produto.estoque <= 0
                      ? 0
                      : produtos.data.data[i].produto.estoque,
                }
          );
        }
      } catch (error) {
        console.log(produtos.data.data[i]);
      }
    }

    let aux = final.filter(item => item.secao_id == type);
    let aux2 = [];
    for (let i = 0; i < aux.length; i++) {
      if (aux[i].produto.venda_sem_estoque == 1) {
        aux2.push(aux[i]);
      } else if (aux[i].estoque != 0) {
        aux2.push(aux[i]);
      }
    }

    setLanches(aux2);
    setLanchesAll(aux2);

    dispatch({
      type: ProductsTypes.GET_PRODUCTS_SUCCESS,
      data: final,
    });

    setLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, []);

  function load() {
    if (!emBusca) {
      getProducts(currentPage + 1);

      if (products.length != 0) {
        setCurrentPage(currentPage + 1);
      }
    }
  }

  function busca(text) {
    if (String(text) == '') {
      setEmBusca(false);
    } else {
      setEmBusca(true);
    }

    setLoading(true);

    var filter = lanchesAll.filter(value => {
      return String(value.produto.descricao)
        .toUpperCase()
        .includes(String(text).toUpperCase());
    });
    setLanches(filter);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }

  return (
    <Container>
      <ViewSearch>
        <Search placeholder="Buscar" filter={busca} />
      </ViewSearch>

      {!loading ? (
        <FlatList
          refreshing={loading}
          onRefresh={() => getProducts(1)}
          data={loading ? [] : lanches}
          renderItem={({ index, item }) => <Product item={item} />}
          keyExtractor={item => item.id}
          onEndReached={load}
          ListFooterComponentStyle={{ marginBottom: 20 }}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18 }}>
                Não há lanches nesta categoria!
              </Text>
            </View>
          }
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="large" color="#000" />
        </View>
      )}
    </Container>
  );
}
