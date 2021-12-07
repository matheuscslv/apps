import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import api from '~/services/api';

import Product from '../../Card';
import { colors } from '~/styles';

import Search from '~/Components/Search';

export default function Products({ navigation }) {
  const [products, setProducts] = useState([]);
  const [productsAll, setProductsAll] = useState([]);
  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const [empresa, setEmpresa] = useState(navigation.getParam("empresa"))
  const [close, setClose] = useState(navigation.getParam("close"))

  function getProducts() {
    setLoading(true);
    const id = navigation.getParam("section");
    api.get(`/produtos/secao/${id}?page=1`).then(({ data }) => {
      setProducts(data.data)
      setProductsAll(data.data)

      setPage(1)
      setLastPage(data.last_page)

      setLoading(false);
    });
  }

  useEffect(() => {
    getProducts();
  }, [])

  function busca(text) {
    setLoading(true);

    const filter = productsAll.filter((value) => {
      return String(value.descricao)
        .toUpperCase()
        .includes(String(text).toUpperCase());
    });
    setProducts(filter);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }


  function loadData(page = 1) {
    setRefreshing(true);
    const id = navigation.getParam("section");
    api.get(`/produtos/secao/${id}?page=${page}`).then(({ data }) => {
      setProducts([...products, ...data.data]);
      setProductsAll([...productsAll, ...data.data]);

      setPage(page)

      setRefreshing(false);
    });
  }

  function loadMore() {
    if (page == lastPage) return;
    const pageNumber = page + 1;
    loadData(pageNumber);
  }

  return (
    <View style={{ backgroundColor: colors.background, flex: 1 }}>
      <View style={{ padding: 10 }}>
        <Search placeholder="Pesquise um produto" filter={busca} />
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
          <FlatList
            refreshing={refreshing}
            onRefresh={getProducts}
            onEndReached={loadMore}
            data={loading ? [] : products}
            renderItem={({ item }) => <Product empresa={empresa} close={close} item={item} />}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
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
                <Text style={{ fontFamily: "Quicksand-Regular", fontSize: 18 }}>
                  Não há produtos nesta seção!
              </Text>
              </View>
            }
          />
        )}
    </View>
  );
}
