import React, { useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import 'moment/locale/pt-br';
import formatMoney from '@components/FormatMoney';
import { somaPedido } from '@components/SumTotalBag';
import { useNavigation } from '@react-navigation/native';
import api from '@services/api';
import Axios from 'axios';
import moment from 'moment';
import { useTheme } from 'styled-components';

import logo from '../../assets/icone512x512_escuro_sem_bordas.png';
import Icone from '../../components/Icons';
import AuthContext from '../../contexts/auth';
import CartContext from '../../contexts/cart';
import { Container, Image, Header, Title } from './styles';

interface IPedido {
  id: string;
  fornecedor: {
    nome_fantasia: string;
    taxa_delivery: string;
    latitude: number;
    longitude: number;
  };
  arqFornecedor: {
    url: string;
  };
  delivery: boolean;
  status_pedido:
    | 'Pendente'
    | 'Reserva confirmada'
    | 'Delivery confirmado'
    | 'Pedido em rota de entrega'
    | 'Finalizado'
    | 'Cancelado';
  created_at: string;
  updated_at: string;
}

interface IProduto {
  quantidade: number;
  preco_venda: string;
  produto: {
    nome: string;
  };
}

interface IProps {
  route: {
    params: {
      item: {
        pedido: IPedido;
        produtos: IProduto[];
      };
    };
  };
}

interface ICEPResponse {
  localidade: string;
  uf: string;
}

const DetailsDelivery: React.FC<IProps> = (props) => {
  const { pedido, produtos } = props?.route?.params?.item;
  const { colors } = useTheme();

  const [city, setCity] = React.useState('');

  const navigation = useNavigation();

  const { user } = useContext(AuthContext);
  const { changeStatus } = useContext(CartContext);

  const [loadingPedido, setLoadingPedido] = React.useState(false);

  function getCityAndUf(cep: string): void {
    Axios.get<ICEPResponse>(`https://viacep.com.br/ws/${cep}/json/`).then(
      (response) => {
        const { localidade, uf } = response.data;
        setCity(` ${localidade} - ${uf}`);
      },
    );
  }

  React.useEffect(() => {
    if (user?.cep) {
      getCityAndUf(user.cep);
    }
  }, [user]);

  function cancelarPedido(): void {
    Alert.alert(
      'Cancelar pedido',
      'Você realmente deseja cancelar seu pedido?',
      [
        {
          text: 'Sim',
          onPress: () => {
            setLoadingPedido(true);
            api.put(`/cancelar/pedido/${pedido.id}`).then(({ data }) => {
              Alert.alert(
                'Sucesso!',
                'Pedido cancelado com sucesso!',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      changeStatus();
                      navigation.goBack();
                    },
                  },
                ],
                { cancelable: false },
              );
              setLoadingPedido(false);
            });
          },
        },
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  function confirmarPedido(): void {
    Alert.alert(
      'Confirmar recebimento do pedido',
      'Você realmente deseja confirmar o recebimento do seu pedido?',
      [
        {
          text: 'Sim',
          onPress: () => {
            setLoadingPedido(true);
            api.put(`/pedidos/finalizar/${pedido.id}`).then(({ data }) => {
              Alert.alert(
                'Sucesso!',
                'Entrega do pedido confirmada com sucesso!',
                [
                  {
                    text: 'OK',
                    onPress: () => {
                      changeStatus();
                      navigation.goBack();
                    },
                  },
                ],
                { cancelable: false },
              );
              setLoadingPedido(false);
            });
          },
        },
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  return (
    <Container>
      <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
        <Header>
          <Image
            source={
              pedido.arqFornecedor ? { uri: pedido?.arqFornecedor?.url } : logo
            }
          />
          <Title>{pedido.fornecedor.nome_fantasia}</Title>
        </Header>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
          }}
        >
          <Text
            style={{ flex: 1, fontFamily: 'Ubuntu-Regular', color: '#999' }}
          >
            Realizado em{' '}
            {moment(pedido.created_at)
              .locale('pt-br')
              .format('DD/MM/YYYY [às] H:mm')}
          </Text>

          {pedido.status_pedido === 'Pedido em rota de entrega' && (
            <TouchableOpacity
              onPress={() => navigation.navigate('Route', { item: pedido })}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.regular,
                padding: 10,
                borderRadius: 5,
              }}
            >
              <Icon
                name="map-marker"
                style={{ marginRight: 5 }}
                size={14}
                color={colors.white}
              />
              <Text style={{ fontFamily: 'Ubuntu-Regular', color: '#fff' }}>
                Traçar rota
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {pedido.status_pedido === 'Finalizado' ||
        pedido.status_pedido === 'Cancelado' ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              backgroundColor: '#ebebeb',
              padding: 5,
              borderRadius: 5,
            }}
          >
            {Icone(pedido.status_pedido)}
            {/* <Icon
              name="check-circle"
              style={{ marginRight: 10 }}
              size={30}
              color={
                pedido.status_pedido === 'Finalizado'
                  ? colors.success
                  : colors.danger
              }
            /> */}
            <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
              Pedido {pedido.status_pedido} em{' '}
              {moment(pedido.updated_at)
                .locale('pt-br')
                .format('DD/MM/YYYY [às] H:mm')}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 20,
              backgroundColor: '#ebebeb',
              padding: 5,
              borderRadius: 5,
            }}
          >
            {/* <Icon
              name="check-circle"
              style={{ marginRight: 10 }}
              size={30}
              color={colors.danger}
            /> */}
            {Icone(pedido.status_pedido)}
            <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
              {pedido.status_pedido}
            </Text>
          </View>
        )}

        <View style={{ marginTop: 20, marginBottom: 20 }}>
          <View
            style={{
              borderTopColor: '#ebebeb',
              borderTopWidth: 1,
              marginTop: 10,
              marginBottom: 10,
            }}
          />

          {produtos.map((item) => (
            <>
              <View
                style={{
                  marginVertical: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View
                    style={{
                      backgroundColor: '#ccc',
                      paddingVertical: 2,
                      borderRadius: 5,
                      paddingHorizontal: 5,
                      marginRight: 10,
                    }}
                  >
                    <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                      {item.quantidade}
                    </Text>
                  </View>
                  <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                    {item.produto.nome}
                  </Text>
                </View>
                <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
                  R${' '}
                  {formatMoney(
                    Number(item.quantidade) * Number(item.preco_venda),
                  )}
                </Text>
              </View>
              <View
                style={{
                  borderTopColor: '#ebebeb',
                  borderTopWidth: 1,
                  marginTop: 10,
                  marginBottom: 10,
                }}
              />
            </>
          ))}
        </View>

        <View style={{ marginBottom: 20 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontFamily: 'Ubuntu-Regular' }}>Subtotal</Text>
            <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
              R$ {formatMoney(somaPedido(produtos))}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
              Taxa de entrega
            </Text>
            <Text style={{ fontFamily: 'Ubuntu-Regular' }}>
              R${' '}
              {formatMoney(
                pedido.delivery ? pedido.fornecedor.taxa_delivery : 0,
              )}
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ fontFamily: 'Ubuntu-Bold' }}>Total</Text>
            <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
              R${' '}
              {formatMoney(
                Number(pedido.delivery ? pedido.fornecedor.taxa_delivery : 0) +
                  Number(somaPedido(produtos)),
              )}
            </Text>
          </View>
        </View>

        <View
          style={{
            borderTopColor: '#ebebeb',
            borderTopWidth: 1,
            marginTop: 10,
            marginBottom: 20,
          }}
        />

        <View>
          {pedido.delivery ? (
            <>
              <Text style={{ fontFamily: 'Ubuntu-Bold', textAlign: 'justify' }}>
                Endereço de entrega
              </Text>
              <Text
                style={{
                  fontFamily: 'Ubuntu-Regular',
                  marginTop: 4,
                  textAlign: 'justify',
                }}
              >
                {user?.logradouro}, nº {user?.numero_local}, {user?.bairro},{' '}
                {city}
              </Text>
            </>
          ) : (
            <Text
              style={{
                fontFamily: 'Ubuntu-Bold',
                marginTop: 4,
                textAlign: 'justify',
              }}
            >
              Pedido com retirada no estabelecimento
            </Text>
          )}
        </View>

        <View
          style={{
            borderTopColor: '#ebebeb',
            borderTopWidth: 1,
            marginTop: 20,
            marginBottom: 20,
          }}
        />

        {pedido.status_pedido === 'Pedido em rota de entrega' && (
          <TouchableOpacity
            onPress={confirmarPedido}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 5,
            }}
          >
            {loadingPedido ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  textAlign: 'justify',
                  color: colors.white,
                }}
              >
                Confirmar recebimento do pedido
              </Text>
            )}
          </TouchableOpacity>
        )}

        {pedido.status_pedido === 'Pendente' && (
          <TouchableOpacity
            onPress={cancelarPedido}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: colors.primary,
              padding: 10,
              borderRadius: 5,
            }}
          >
            {loadingPedido ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text
                style={{
                  fontFamily: 'Ubuntu-Bold',
                  textAlign: 'justify',
                  color: colors.white,
                }}
              >
                Cancelar pedido
              </Text>
            )}
          </TouchableOpacity>
        )}
      </View>
    </Container>
  );
};

export default DetailsDelivery;
