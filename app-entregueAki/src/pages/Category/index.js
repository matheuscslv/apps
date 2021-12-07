import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Icon from '~/Components/Icons';
import Loading from '~/Components/Loading';
import Search from '~/Components/Search';
import api from '~/services/api';
import { subscribeToNotification } from '~/services/notification';
import { colors } from '~/styles';

import {
  Container,
  DepartmentContainer,
  DepartmentIcon,
  DepartmentText,
  CountText,
  LeftContainer,
  RightIcon,
  ViewSearch,
  CategoryText,
} from './styles';

export default function Category({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [categoriesAll, setCategoriesAll] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useSelector((state) => state.user.data);

  useEffect(() => {
    if (user) {
      subscribeToNotification(user.id);
    }

    api.get('/categorias/empresas').then(({ data }) => {
      const filter = data.filter(
        (item) => item.empresas_count > 0 && item.icone != null
      );
      setCategories(filter);
      setCategoriesAll(filter);
      setLoading(false);
    });
  }, []);

  function busca(text) {
    setLoading(true);

    const filter = categoriesAll.filter((value) => {
      return String(value.descricao)
        .toUpperCase()
        .includes(String(text).toUpperCase());
    });
    setCategories(filter);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }

  function renderItem({ item }) {
    return (
      <DepartmentContainer
        onPress={() => navigation.navigate('ProductList', { type: item.id })}
      >
        <LeftContainer>
          {Icon(item.categoria_icone, item.icone, 30, colors.primary)}

          {/* <DepartmentIcon name="store" size={30} color={colors.primary} /> */}

          <View>
            <DepartmentText>{item.descricao}</DepartmentText>
            {/* <CountText>
              {''}
              {item.empresas_count}{' '}
              {item.empresas_count < 2 ? 'Disponível' : 'Disponíveis'}
            </CountText> */}
          </View>
        </LeftContainer>
        <RightIcon />
      </DepartmentContainer>
    );
  }

  return (
    <Container>
      <View style={{ padding: 10 }}>
        <Search placeholder="Pesquise por exemplo: Farmácia" filter={busca} />
      </View>

      <CategoryText color={colors.primary}>Departamentos</CategoryText>

      {loading ? (
        <Loading />
      ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={categories}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={{
              flexGrow: 1,
              marginTop: 1,
            }}
            ListEmptyComponent={
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: 14,
                    padding: 40,
                    textAlign: 'center',
                    color: '#333',
                    fontFamily: 'Quicksand-Regular',
                    lineHeight: 28,
                  }}
                >
                  Por enquanto não há empresas disponíveis!
              </Text>
              </View>
            }
          />
        )}
    </Container>
  );
}
