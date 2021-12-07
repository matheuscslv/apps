import React, { useEffect, useState } from 'react';
import {
  Platform,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import api from '~/services/api';
import sem_imagem from '~/assets/sem_imagem.jpg'
import { Container } from './styles';

export default function Category({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCategories() {
    const categorias = await api.get(`/cardapio/secoes/listar`);
    setCategories(categorias.data);
    setLoading(false);
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Container>
      {!loading ? (
        <FlatList
          data={categories}
          renderItem={({ index, item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('ProductList', { type: item.id })
              }
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: index % 2 === 0 ? '#fff' : '#f5f5f5',
                paddingVertical: 10,
                paddingHorizontal: 30,
              }}
            >
              {item.imagem == null ? 
              <Image
              source={sem_imagem}
              style={{ width: 70, height: 70 }}
              resizeMode="stretch"
            />
              :
              <Image
                source={{ uri: item.imagem }}
                style={{ width: 70, height: 70 }}
                resizeMode="stretch"
              />
              }
              
              <Text
                style={{
                  fontSize: 24,
                  color: '#333',
                  fontFamily: Platform.OS === 'ios' ? 'Nunito' : 'Nunito Black',
                  fontWeight: Platform.OS === 'ios' ? 'bold' : 'normal',
                }}
              >
                {item.secao}
              </Text>
              <Icon name="angle-right" size={30} color="#333" />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
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
