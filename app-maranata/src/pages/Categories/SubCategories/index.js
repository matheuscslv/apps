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
} from '../styles';

export default function Categories({ navigation, route }) {
  const { id: idSecao } = route.params;
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/produtos/grupos/secao/${idSecao}`).then((response) => {
      const subcategoriesList = response.data.filter(
        (subcategory) => subcategory.produtos_count > 0,
      );

      setSubCategories(
        subcategoriesList.map(({ id, grupo, produtos_count }) => ({
          id,
          grupo,
          produtos_count,
        })),
      );

      setLoading(false);
    });
  }, []);

  function renderItem({ item }) {
    return (
      <DepartmentContainer
        onPress={() =>
          navigation.navigate('ProductList', {
            category_id: item.id,
            section_id: idSecao,
            type: item.id,
            name: item.grupo,
          })
        }
      >
        <LeftContainer>
          {/* <DepartmentIcon name="washing-machine" size={25} /> */}
          <DepartmentText> {item.grupo} </DepartmentText>
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
          data={subCategories}
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
