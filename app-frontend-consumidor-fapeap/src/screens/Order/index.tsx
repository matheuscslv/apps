import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { useNavigation } from '@react-navigation/native';
import Axios from 'axios';
import { useTheme } from 'styled-components';

import order from '../../assets/order.png';
import basket from '../../components/Basket';
import formatMoney from '../../components/FormatMoney';
import soma from '../../components/SumTotalBag';
import AuthContext from '../../contexts/auth';
import CartContext from '../../contexts/cart';
import api from '../../services/api';
import {
  Container,
  Header,
  Image,
  Title,
  TextQuantity,
  Subtitle,
  Content,
  CardInformation,
  Left,
  Right,
  Button,
  ButtonText,
  BasketDeliveryCard,
  TextCard,
} from './styles';

interface IContentBasket {
  id: string;
  nome: string;
  unidade_medida: string | number;
  estoque_produto: number;
  preco: string;
  quantity: number;
  fornecedor: {
    id: string;
    nome_fantasia: string;
    taxa_delivery: string;
    delivery: boolean;
  };
}

interface ICEPResponse {
  localidade: string;
  uf: string;
}

type IBasket = IContentBasket[];

const Order: React.FC = () => {
  const navigation = useNavigation();
  const { cart, clearCart, changeDeliveryProduct } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  const [city, setCity] = useState('');

  const [loading, setLoading] = useState(true);

  const [loadingPedido, setLoadingPedido] = useState(false);

  const [baskets, setBaskets] = useState<IBasket[]>([]);

  const { colors } = useTheme();

  useEffect(() => {
    setLoading(true);
    const result = basket(cart);
    if (result[0].length > 0) {
      setBaskets(result);
    } else {
      setBaskets([]);
    }
    setLoading(false);
  }, [cart]);

  function getCityAndUf(cep: string): void {
    Axios.get<ICEPResponse>(`https://viacep.com.br/ws/${cep}/json/`).then(
      (response) => {
        const { localidade, uf } = response.data;
        setCity(` ${localidade} - ${uf}`);
      },
    );
  }

  useEffect(() => {
    if (user?.cep) {
      getCityAndUf(user.cep);
    }
  }, [user]);

  function setDeliveryChange(basket: IBasket): void {
    changeDeliveryProduct(basket);
  }

  function finalizeOrder(order: IContentBasket[]): void {
    if (user?.cep == null && order[0].fornecedor.delivery) {
      Alert.alert(
        'Pedido não efetuado',
        'Adicione um endereço de entrega antes de finalizar o pedido!',
      );

      return;
    }

    const products = order.map((item) => ({
      produto_id: item.id,
      preco_venda: item.preco,
      quantidade: item.quantity,
    }));

    Alert.alert(
      'Finalizar pedido',
      'Você realmente deseja confirmar o pedido?',
      [
        {
          text: 'Sim',
          onPress: () => {
            setLoadingPedido(true);
            api
              .post(
                `consumidor/${order[0].fornecedor.id}/${order[0].fornecedor.delivery}`,
                products,
              )
              .then(({ data }) => {
                Alert.alert(
                  'Pedido Confirmado',
                  "Pedido realizado com sucesso! Verifique a situção do pedido em 'Meus pedidos'.",
                );
                clearCart(order);
                setLoadingPedido(false);
              })
              .catch((response) => {
                Alert.alert(
                  'Pedido não efetuado',
                  response.response.data.error,
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

  function clearOneCart(order: IContentBasket): void {
    Alert.alert(
      'Fechar Pedido',
      'Você realmente deseja fechar este pedido?',
      [
        {
          text: 'Sim',
          onPress: () => {
            clearCart(order);
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
    <>
      {baskets.length != 0 ? (
        <Container>
          {user && (
            <Header>
              <Image
                style={{ marginTop: 5, marginBottom: 5 }}
                source={order}
                resizeMode="contain"
              />
              <Title style={{ marginBottom: 5 }}>{user.nome}</Title>
              {user.cep ? (
                <Subtitle style={{ fontSize: 12, textAlign: 'justify' }}>
                  {user.logradouro}, {user.numero_local}, {user.bairro}, {city}
                </Subtitle>
              ) : (
                <Subtitle style={{ fontSize: 12, textAlign: 'justify' }}>
                  Sem endereço cadastrado
                </Subtitle>
              )}
            </Header>
          )}

          {baskets.length > 0 && (
            <>
              {baskets.map((basket) => (
                <>
                  <Content>
                    <CardInformation>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          marginBottom: 20,
                          alignItems: 'center',
                        }}
                      >
                        <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                          {basket[0].fornecedor.nome_fantasia}
                        </Text>
                        <Icon
                          name="close-circle"
                          color={colors.primary}
                          size={18}
                          onPress={() => clearOneCart(basket)}
                        />
                      </View>

                      {basket[0].fornecedor.taxa_delivery ? (
                        <View style={{ flexDirection: 'row' }}>
                          <BasketDeliveryCard
                            onPress={() => setDeliveryChange(basket)}
                            color={
                              basket[0].fornecedor.delivery
                                ? colors.primary
                                : colors.regular
                            }
                          >
                            <TextCard
                              style={{
                                textTransform: 'uppercase',
                                fontSize: 11,
                              }}
                              color={
                                basket[0].fornecedor.delivery
                                  ? colors.primary
                                  : colors.regular
                              }
                            >
                              Entrega
                            </TextCard>
                          </BasketDeliveryCard>

                          <BasketDeliveryCard
                            onPress={() => setDeliveryChange(basket)}
                            color={
                              basket[0].fornecedor.delivery
                                ? colors.regular
                                : colors.primary
                            }
                          >
                            <TextCard
                              style={{
                                textTransform: 'uppercase',
                                fontSize: 11,
                              }}
                              color={
                                basket[0].fornecedor.delivery
                                  ? colors.regular
                                  : colors.primary
                              }
                            >
                              Retirar no Local
                            </TextCard>
                          </BasketDeliveryCard>
                        </View>
                      ) : (
                        <Subtitle
                          style={{
                            fontFamily: 'Ubuntu-Bold',
                            marginTop: -18,
                            marginBottom: 20,
                          }}
                        >
                          Apenas retirada
                        </Subtitle>
                      )}

                      {basket.map((item) => (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 20,
                          }}
                        >
                          <Left>
                            <Title>
                              <TextQuantity>{item.quantity}x</TextQuantity>{' '}
                              {item.nome}
                            </Title>
                            <Subtitle>
                              {isNaN(item.unidade_medida)
                                ? `1 ${item.unidade_medida}`
                                : `${
                                    item.unidade_medida * item.quantity
                                  } Litro(s)`}
                            </Subtitle>
                          </Left>
                          <Right>
                            <Title>
                              R$ {formatMoney(item.quantity * item.preco)}
                            </Title>
                          </Right>
                        </View>
                      ))}

                      <View>
                        <View
                          style={{ borderTopColor: '#ccc', borderTopWidth: 1 }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginTop: 10,
                              marginBottom: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: 'Ubuntu-Regular',
                                color: '#455A64',
                              }}
                            >
                              Subtotal
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Ubuntu-Regular',
                                color: '#455A64',
                              }}
                            >
                              R$ {formatMoney(soma(basket))}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            borderBottomColor: '#ccc',
                            borderBottomWidth: 1,
                            marginBottom: 10,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              marginBottom: 10,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: 'Ubuntu-Regular',
                                color: '#455A64',
                              }}
                            >
                              Taxa de Entrega
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Ubuntu-Regular',
                                color: '#455A64',
                              }}
                            >
                              R${' '}
                              {formatMoney(
                                basket[0].fornecedor.delivery
                                  ? basket[0].fornecedor.taxa_delivery
                                  : 0,
                              )}
                            </Text>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                            Total
                          </Text>
                          <Text style={{ fontFamily: 'Ubuntu-Bold' }}>
                            R${' '}
                            {formatMoney(
                              Number(soma(basket)) +
                                Number(
                                  basket[0].fornecedor.delivery
                                    ? basket[0].fornecedor.taxa_delivery
                                    : 0,
                                ),
                            )}
                          </Text>
                        </View>
                      </View>

                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginTop: 20,
                        }}
                      >
                        <Button
                          onPress={() =>
                            user && basket.length != 0
                              ? finalizeOrder(basket)
                              : !user && navigation.navigate('SignIn')
                          }
                        >
                          {loadingPedido ? (
                            <ActivityIndicator
                              size="small"
                              color={colors.white}
                            />
                          ) : (
                            <ButtonText>Finalizar Pedido</ButtonText>
                          )}
                        </Button>
                      </View>
                    </CardInformation>
                  </Content>
                </>
              ))}
            </>
          )}
        </Container>
      ) : (
        <>
          {!loading && (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.background,
              }}
            >
              <Title
                style={{
                  color: colors.title,
                  marginBottom: 5,
                }}
              >
                Não há produtos no seu carrinho
              </Title>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default Order;
