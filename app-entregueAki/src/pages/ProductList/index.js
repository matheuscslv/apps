import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { colors } from '~/styles';
import Search from '~/Components/Search';
import api from '~/services/api';

import {
  Container,
  ViewSearch,
  DepartmentContainer,
  DepartmentIcon,
  CompanyImage,
  DepartmentText,
  CountText,
  LeftContainer,
  RightIcon,
} from './styles';

export default function ProductList({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [empresas, setEmpresas] = useState([]);
  const [empresasAll, setEmpresasAll] = useState([]);
  const [type] = useState(navigation.getParam('type'));

  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  async function getEmpresas(page = 1) {
    setLoading(true)
    api.get(`categoria/${type}/empresas?page=${page}`).then(({ data }) => {
      setEmpresas(data.empresas.data);
      setEmpresasAll(data.empresas.data);
      navigation.setParams({ title: data.categoria.descricao });
      setLoading(false);

      setPage(1)
      setLastPage(data.empresas.last_page)
    });
  }

  useEffect(() => {
    getEmpresas();
  }, []);

  function busca(text) {
    setLoading(true);

    console.log(empresasAll);
    const filter = empresasAll.filter((value) => {
      return String(value.nome_fantasia)
        .toUpperCase()
        .includes(String(text).toUpperCase());
    });
    setEmpresas(filter);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }

  function renderItem({ item }) {
    return (
      <DepartmentContainer
        onPress={() => navigation.navigate('DetailCompany', { type: item.id })}
      >
        <LeftContainer>
          {/* <DepartmentIcon
            name="store"
            size={30}
            color={colors.primary}
          /> */}
          <CompanyImage source={{ uri: item.logo }} resizeMode="cover" />
          <View>
            <DepartmentText> {item.nome_fantasia} </DepartmentText>
            <CountText color="#000">
              {' '}
              {item.logradouro}, {item.numero}
            </CountText>
            <CountText color={item.funcionando == 1 ? '#080' : '#f00'}>
              {' '}
              {item.funcionando == 1 ? 'Funcionando' : 'Fechado'}
            </CountText>
          </View>
        </LeftContainer>
        <RightIcon />
      </DepartmentContainer>
    );
  }

  function loadData(page = 1) {
    api.get(`categoria/${type}/empresas?page=${page}`).then(({ data }) => {
      setEmpresas([...empresas, ...data.empresas.data]);
      setEmpresasAll([...empresasAll, ...data.empresas.data]);
      setLoading(false);
      setPage(page)
    });
  }

  function loadMore() {
    if (page == lastPage) return;
    const pageNumber = page + 1;
    loadData(pageNumber);
  }

  return (
    <Container>
      <ViewSearch>
        <Search placeholder="Pesquise um Estabelecimento" filter={busca} />
      </ViewSearch>

      {!loading ? (
        <FlatList
          refreshing={loading}
          onRefresh={getEmpresas}
          onEndReached={loadMore}
          data={loading ? [] : empresas}
          renderItem={renderItem}
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
                Não há empresas nesta categoria!
              </Text>
            </View>
          }
        />
      ) : (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <ActivityIndicator size="small" color={colors.primary} />
          </View>
        )}
    </Container>
  );
}

ProductList.navigationOptions = ({ navigation }) => {
  const title = navigation.getParam('title');
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
    headerTitle: title || '',
  };
};
