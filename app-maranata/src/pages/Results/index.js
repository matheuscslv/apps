import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import CardProduct from '~/components/CardProduct';
import Loading from '~/components/Loading';
import { ProductsTypes } from '~/store/ducks/product';
import { Container, Title, Subtitle } from './styles';
import IsEmpty from '~/components/IsEmpty';
import api from '~/services/api';
import { useCallback } from 'react';

export default function Results({ route }) {
  const { textProduct, idCategory, idSection } = route.params;
  const dispatch = useDispatch();

  const productsStore = useSelector((state) => state.products.data);
  const current_page = useSelector((state) => state.products.current_page);

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [perPage, setPerPage] = useState(0);
  const [refreshing, setRefreshing] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts().then(() => setLoading(false));
  }, []);

  const loadProducts = useCallback(async () => {
    setRefreshing(true);

    const { data: response } = await api.findSuggestions(
      `/pesquisar/produtos`,
      {
        valor: textProduct,
        idCategory,
        idSection,
        page,
      },
    );

    if (response.data.length === 0) {
      setRefreshing(false);
      return;
    }

    const filteredList = response.data?.filter(
      (product) => !products.find((p) => p.id === product.id),
    );

    const formattedList = filteredList?.map((product) => ({
      ...product,
      venda_sem_estoque: product.venda_sem_estoque,
      estoque: product.estoque.quantidade,
      quantity: 0,
    }));

    dispatch({
      type: ProductsTypes.GET_PRODUCTS_SUCCESS,
      data: [...productsStore, ...formattedList],
      current_page,
    });

    setProducts((oldData) => [...oldData, ...formattedList]);
    setTotal(response.total);
    setPerPage(response.per_page);
    setPage((oldPage) => oldPage + 1);
    setRefreshing(false);
  });

  function load() {
    if (!refreshing) {
      loadProducts();
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <Title>Resultados para: {textProduct}</Title>
      <Subtitle>
        Exibindo {products.length} de {total} resultados
      </Subtitle>
      <FlatList
        refreshing={refreshing}
        onEndReached={load}
        onEndReachedThreshold={0.8}
        data={products}
        renderItem={({ item }) => <CardProduct item={item} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-around',
        }}
        ListFooterComponentStyle={{ marginBottom: 20 }}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={<IsEmpty>Não há produtos disponiveis!</IsEmpty>}
      />
    </Container>
  );
}
