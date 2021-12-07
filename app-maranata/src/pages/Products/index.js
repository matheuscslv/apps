import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import CardProduct from '~/components/CardProduct';
import Loading from '~/components/Loading';
import ProductsActions from '~/store/ducks/product';
import { Container, ViewSearch } from './styles';
import IsEmpty from '~/components/IsEmpty';
import FloatingButton from '~/components/FloatingButton';
import SearchHeader from '~/components/SearchHeader';
import api from '~/services/api';
import { useNavigation } from '@react-navigation/native';

export default function Products() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const products = useSelector((state) => state.products.data);
  const loadingProducts = useSelector((state) => state.products.loading);
  const refreshing = useSelector((state) => state.products.refreshing);

  const [loading, setLoading] = useState(true);
  const [lanches, setLanches] = useState(products);
  const [showSearchBar, onShowSearchBar] = useState(false);

  const [emBusca, setEmBusca] = useState(false);

  function getProducts() {
    dispatch(ProductsActions.getProductsRequest());
  }

  useEffect(() => {
    getProducts();
    setLoading(false);
  }, []);

  useEffect(() => {
    setLanches(products);
  }, [products]);

  function reloadProducList() {
    dispatch(ProductsActions.reloadProductsRequest());
  }

  function load() {
    if (!emBusca) {
      getProducts();
    }
  }

  return (
    <Container>
      {!loading && !loadingProducts ? (
        <>
          <FlatList
            refreshing={refreshing}
            onRefresh={reloadProducList}
            onEndReached={load}
            onEndReachedThreshold={0.8}
            data={lanches}
            renderItem={({ item }) => <CardProduct item={item} />}
            keyExtractor={(item) => item.id}
            ListHeaderComponent={
              <FloatingButton onPress={() => onShowSearchBar(true)} />
            }
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: 'space-around',
            }}
            ListFooterComponentStyle={{ marginBottom: 20 }}
            contentContainerStyle={{ flexGrow: 1 }}
            ListEmptyComponent={
              !loadingProducts && (
                <IsEmpty>Não há produtos disponiveis!</IsEmpty>
              )
            }
          />
        </>
      ) : (
        <Loading />
      )}

      {showSearchBar && (
        <SearchHeader
          onGetSuggestions={async (text) => {
            if (text) {
              const response = await api.get(`/pesquisar/sugestoes/produtos`, {
                params: {
                  campo: 'descricao',
                  valor: text,
                  limite: 15,
                },
              });

              const list = response.data;
              return list;
            }
            return [];
          }}
          onSearch={(text) => {
            onShowSearchBar(false);
            navigation.navigate('Results', {
              textProduct: text,
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
