import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CardProduct from '~/components/CardProduct';
import Search from '~/components/Search';
import Loading from '~/components/Loading';
import { ProductsTypes } from '~/store/ducks/product';

import { Container, ViewSearch } from './styles';
import api from '~/services/api';
import { useNavigation } from '@react-navigation/native';
import FloatingButton from '~/components/FloatingButton';
import SearchHeader from '~/components/SearchHeader';

export default function ProductList({ route }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { type, category_id, section_id } = route.params;

  const [showSearchBar, onShowSearchBar] = useState(false);
  const products = useSelector((state) => state.products.data);
  const current_page = useSelector((state) => state.products.current_page);
  const loadingProducts = useSelector((state) => state.products.loading);

  const [loading, setLoading] = useState(true);
  const [lanches, setLanches] = useState([]);
  const [lanchesAll, setLanchesAll] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [emBusca, setEmBusca] = useState(false);

  async function getProducts(page = 1) {
    const response_api = await api.get(
      `/produtos/secao/${section_id}/categoria/${category_id}?page=${page}`,
    );

    const { data: response } = response_api.data;

    setLanchesAll(productsOfCategory);
    setLanches(productsOfCategory);

    const filteredList = response?.filter(
      (product) => !products.find((p) => p.id === product.id),
    );

    const formattedList = filteredList?.map((product) => ({
      ...product,
      venda_sem_estoque: product.venda_sem_estoque,
      estoque: product.estoque.quantidade,
      quantity: 0,
    }));

    const productsList = formattedList.filter(
      (product) => product.venda_sem_estoque || product?.estoque > 0,
    );

    const productsOfCategory = products.filter(
      (product) =>
        product.grupo.id === category_id && product.secao.id === section_id,
    );

    setLanchesAll([...productsOfCategory, ...productsList]);
    setLanches([...productsOfCategory, ...productsList]);

    // console.tron.warn(productsList);

    if (productsList.length === 0) {
      setLoading(false);
      return;
    }

    dispatch({
      type: ProductsTypes.GET_PRODUCTS_SUCCESS,
      data: [...products, ...productsList],
      current_page,
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
    if (String(text) === '') {
      setEmBusca(false);
    } else {
      setEmBusca(true);
    }

    setLoading(true);

    const filter = lanchesAll.filter((value) => {
      return String(value.descricao)
        .toUpperCase()
        .includes(String(text).toUpperCase());
    });
    setLanches(filter);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <FlatList
        refreshing={loading}
        onRefresh={getProducts}
        data={lanches}
        renderItem={({ item }) => <CardProduct item={item} />}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        onEndReached={load}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        ListHeaderComponent={
          <FloatingButton onPress={() => onShowSearchBar(true)} />
        }
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
              Não há produtos nesta categoria!
            </Text>
          </View>
        }
      />

      {showSearchBar && (
        <SearchHeader
          onGetSuggestions={async (text) => {
            if (text) {
              const response = await api.get(
                `/pesquisar/sugestoes/produtos/secao/${section_id}/grupo/${category_id}`,
                {
                  params: {
                    campo: 'descricao',
                    valor: text,
                    limite: 15,
                  },
                },
              );

              const list = response.data;
              return list;
            }
            return [];
          }}
          onSearch={(text) => {
            onShowSearchBar(false);
            navigation.navigate('Results', {
              textProduct: text,
              idSection: section_id,
              idCategory: category_id,
            });
          }}
          onHide={() => {
            onShowSearchBar(false);
          }}
          placeholder="Nome do produto"
        />
      )}
    </Container>
  );
}
