import React, { useEffect, useState, useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Axios from 'axios';
import { useTheme } from 'styled-components';

import Mixer from '../../components/Cards/Mixer';
import AuthContext from '../../contexts/auth';
import api from '../../services/api';
import { Container, Header, TextMid } from './styles';

interface IMixer {
  id: string;
  nome_fantasia: string;
  taxa_delivery: string;
  verificado: boolean;
}

interface ICEPResponse {
  localidade: string;
  uf: string;
}

const Home: React.FC = () => {
  const [data, setData] = useState<IMixer[]>([]);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(true);

  const [city, setCity] = useState('');

  const { colors } = useTheme();

  function getCityAndUf(cep: string): void {
    Axios.get<ICEPResponse>(`https://viacep.com.br/ws/${cep}/json/`).then(
      (response) => {
        const { localidade, uf } = response.data;
        setCity(` ${localidade} - ${uf}`);
      },
    );
  }

  function getMixers(): void {
    setRefresh(true);
    api
      .get<IMixer[]>('fornecedor')
      .then((response) => {
        const filter = response.data.filter((item) => item?.verificado);
        setData(filter);
        setLoading(false);
        setRefresh(false);
      })
      .catch((response) => {
        setLoading(false);
        setRefresh(false);
      });
  }

  useEffect(() => {
    getMixers();
  }, []);

  useEffect(() => {
    if (user?.cep) {
      getCityAndUf(user.cep);
    }
  }, [user]);

  return (
    <Container>
      {user && (
        <Header>
          <Icon name="map-marker" size={40} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: 'Ubuntu-Regular',
                color: '#455A64',
                fontSize: 10,
                paddingLeft: 5,
                paddingTop: 5,
              }}
            >
              Entregar para {user.nome}, em
            </Text>
            <Text
              style={{
                fontFamily: 'Ubuntu-Bold',
                color: '#455A64',
                paddingLeft: 3,
              }}
            >
              {user.cep ? (
                <>
                  {user.logradouro}, nº {user.numero_local}, {user.bairro},{' '}
                  {city}
                </>
              ) : (
                <Text>Sem endereço cadastrado</Text>
              )}
            </Text>
          </View>
        </Header>
      )}

      <TextMid>Batedeiras disponíveis</TextMid>

      <FlatList
        onRefresh={getMixers}
        refreshing={refresh}
        data={data}
        renderItem={({ item }) => <Mixer item={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <>
            {!loading && (
              <Text
                style={{
                  fontSize: 12,
                  color: '#999',
                  fontFamily: 'Ubuntu-Regular',
                  marginLeft: 10,
                }}
              >
                Não há batedeiras disponíveis
              </Text>
            )}
          </>
        )}
      />
    </Container>
  );
};

export default Home;
