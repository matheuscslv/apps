import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';

import { Container, Header, Content, Tab, Tabs } from 'native-base';
import {
  ContainerHead,
  Center,
  Image,
  Title,
  Status,
  ContentSearch,
  TitleSearch,
  IconSearch,
} from './styles';

import SearchHeader from 'react-native-search-header';

import { showMessage } from 'react-native-flash-message';

import Tab1 from './Product';
import Tab2 from './Section';
import Tab3 from './Information';

import { colors } from '~/styles';

import api from '~/services/api';

export default function DetailCompany({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [empresa, setEmpresa] = useState([]);
  const [type] = useState(navigation.getParam('type'));

  const [products, setProducts] = useState([]);
  const [productsAll, setProductsAll] = useState([]);

  const [sections, setSections] = useState([]);

  const searchHeaderRef = useRef(null);
  const [isClose, setIsClose] = useState(false);

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  async function getEmpresa(page = 1) {
    setLoading(true)
    api.get(`empresa/${type}/visualizar?page=${page}`).then(({ data }) => {
      setEmpresa(data);
      setSections(data.secoes.data)
      setProducts(data.produtos.data);
      setProductsAll(data.produtos.data);
      navigation.setParams({ title: data.empresa.nome_fantasia });

      if (data.empresa.funcionando == 0) {
        setIsClose(true);
        Alert.alert(
          'Horário encerrado',
          'Não estamos mais aceitando pedidos hoje!'
        );
      } else {
        const taxas = data.empresa.taxas_entregas;
        api.get('/enderecos').then(({ data }) => {

          let passou = false;
          for (let i = 0; i < taxas.length; i++) {
            const filter = data.filter(item => (parse(item.bairro) == parse(taxas[i].bairro)));
            if (filter.length > 0) {
              passou = true;
            }
          }

          if (!passou) {
            /* Alert.alert(
              'Entrega',
              'Não efetuamos entregas nos seus endereços cadastrados, mas você pode continuar realizando o pedido e retirá-lo no local do estabelecimento.'
            ); */

            showMessage({
              message: 'Não efetuamos entregas nos seus endereços cadastrados, mas você pode continuar realizando o pedido e retirá-lo no local do estabelecimento.',
              type: 'danger',
              backgroundColor: '#f00',
              autoHide: false,
            });
          }

        });
      }

      setLoading(false);
    });
  }

  function parse(value) {
    const str = String(value);
    const parsed = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return parsed.toLocaleLowerCase().replace(/[\s*]/g, "-");
  }

  useEffect(() => {
    getEmpresa();

    navigation.setParams({
      openSearchBar: () => openSearchBar(),
    });
  }, []);

  function openSearchBar() {
    searchHeaderRef.current.show();
  }

  function searchItem(text) {
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
    api.get(`empresa/${type}/visualizar?page=${page}`).then(({ data }) => {
      setEmpresa(data);
      setSections([...sections, ...data.secoes.data])
      setProducts([...products, ...data.produtos.data]);
      setProductsAll([...productsAll, ...data.produtos.data]);
    });
  }

  function loadMore() {
    if (page == lastPage) return;
    const pageNumber = page + 1;
    loadData(pageNumber);
  }

  return (
    <>
      <SearchHeader
        ref={searchHeaderRef}
        placeholder="Ex: Remédio"
        placeholderColor="#999"
        onClear={() => {
          setLoading(true);
          setProducts(productsAll);
          setTimeout(() => {
            setLoading(false);
          }, 250);
        }}
        onSearch={(value) => searchItem(value.nativeEvent.text)}
        onGetAutocompletions={async (text) => {
          if (text) {
            const response = await fetch(
              `http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`,
              {
                method: 'get',
              }
            );
            const data = await response.json();
            return data[1];
          } else {
            return [];
          }
        }}
      />

      {loading ? (
        <View
          style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator size="small" color={colors.primary} />
        </View>
      ) : (
          <>
            <ContainerHead>
              <Center>
                <Image source={{ uri: empresa.empresa.logo }} />
                <Title>{empresa.empresa.nome_fantasia}</Title>
                <Status color={empresa.empresa.funcionando == 1 ? '#080' : '#f00'}>
                  {empresa.empresa.funcionando == 1 ? 'Funcionando' : 'Fechado'}
                </Status>
              </Center>
            </ContainerHead>

            <Container style={{ backgroundColor: colors.background }}>
              <Tabs tabBarUnderlineStyle={{ backgroundColor: '#fff' }}>
                <Tab
                  heading="PRODUTOS"
                  tabStyle={{ backgroundColor: colors.primary }}
                  textStyle={{ fontFamily: 'Quicksand-Bold', color: '#fff' }}
                  activeTabStyle={{
                    backgroundColor: colors.primary,
                    opacity: 0.8,
                  }}
                  activeTextStyle={{
                    fontFamily: 'Quicksand-Bold',
                    color: '#fff',
                    fontWeight: 'normal',
                  }}
                >
                  <Tab1 refreshing={loading} loadMore={loadMore} getEmpresa={getEmpresa} empresa={empresa.empresa} close={isClose} produtos={products} />
                </Tab>
                <Tab
                  heading="SEÇÕES"
                  tabStyle={{ backgroundColor: colors.primary }}
                  textStyle={{ fontFamily: 'Quicksand-Bold', color: '#fff' }}
                  activeTabStyle={{
                    backgroundColor: colors.primary,
                    opacity: 0.8,
                  }}
                  activeTextStyle={{
                    fontFamily: 'Quicksand-Bold',
                    color: '#fff',
                    fontWeight: 'normal',
                  }}
                >
                  <Tab2 empresa={empresa.empresa} close={isClose} refreshing={loading} loadMore={loadMore} getEmpresa={getEmpresa} secoes={sections} />
                </Tab>
                <Tab
                  heading="INFORMAÇÕES"
                  tabStyle={{ backgroundColor: colors.primary }}
                  textStyle={{ fontFamily: 'Quicksand-Bold', color: '#fff' }}
                  activeTabStyle={{
                    backgroundColor: colors.primary,
                    opacity: 0.8,
                  }}
                  activeTextStyle={{
                    fontFamily: 'Quicksand-Bold',
                    color: '#fff',
                    fontWeight: 'normal',
                  }}
                >
                  <Tab3 informacoes={empresa.empresa} />
                </Tab>
              </Tabs>
            </Container>
          </>
        )}
    </>
  );
}

DetailCompany.navigationOptions = ({ navigation }) => {
  const title = 'Pesquisar Produto...';//navigation.getParam('title');
  return {
    headerStyle: {
      height: Platform.OS === 'ios' ? 100 : 70,
      backgroundColor: colors.white,

      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,

      elevation: 3,
    },

    headerTintColor: colors.primary,
    headerTitleAlign: 'left',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerBackTitleStyle: {
      color: colors.primary,
    },
    // headerRight: <View />,
    headerBackTitleVisible: false,
    headerTitleAlign: 'center',
    headerTitle: (
      <ContentSearch onPress={() => navigation.state.params.openSearchBar()}>
        <TitleSearch>{title ? `${title}` : ''}</TitleSearch>
      </ContentSearch>
    ),
    headerRight: (
      <ContentSearch onPress={() => navigation.state.params.openSearchBar()}>
        <IconSearch size={25} />
      </ContentSearch>
    )
    //headerTitle: title || '',
  };
};
