import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';

import Loading from '~/components/Loading';
import api from '~/services/api';

import {
  Container,
  DepartmentContainer,
  DepartmentIcon,
  DepartmentText,
  LeftContainer,
  RightIcon,
} from './styles';

export default function Categories({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/produtos/secoes').then(({ data }) => {
      setCategories(data.filter((category) => category.produtos_count > 0));
      setLoading(false);
    });
  }, []);

  function renderItem({ item }) {
    return (
      <DepartmentContainer
        onPress={() =>
          navigation.navigate('SubCategories', {
            id: item.id,
            name: item.secao,
          })
        }
      >
        <LeftContainer>
          {/* <DepartmentIcon name="washing-machine" size={25} /> */}
          <DepartmentText> {item.secao} </DepartmentText>
        </LeftContainer>
        <RightIcon />
      </DepartmentContainer>
    );
  }

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderItem}
          contentContainerStyle={{
            marginTop: 1,
          }}
        />
      )}
    </Container>
  );
}
