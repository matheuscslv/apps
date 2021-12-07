import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Alert,
  Platform,
  ActionSheetIOS,
} from 'react-native';
import { colors } from '~/styles';

import {
  Container,
  CardHead,
  TextCardHead,
  TextCardCart,
  Line,
  Text,
  Card,
  UpIcon,
  DownIcon,
  OptionIcon,
  TextCard,
  MinusIcon,
  PlusIcon,
} from './styles';
import { useSelector, useDispatch } from 'react-redux';

import soma, { somaOrder, somaUnitaria } from '~/Components/SumTotalBag';
import basket from '~/Components/Basket';

import {
  addProductBag,
  removeProductBag,
  removeProductBagCart,
} from '~/Components/Bag';

import FinishedOrder from './FinishedOrder';
import EditOrder from './EditOrder';

import formatMoney from '~/Components/ConvertMoney';

import ActionSheet from 'react-native-actionsheet';

export default function Cart({ navigation }) {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [order, setOrder] = useState({});

  const [baskets, setBaskets] = useState([]);

  const refAlert = useRef(null);

  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const bag = useSelector((state) => state.bags.data);
  const total = useSelector((state) => state.bags.total);

  useEffect(() => {
    reloadBag();
  }, [bag]);

  function reloadBag() {
    const result = basket(bag);
    let aux = result.map((item) => [...item, { open: true }]);
    setBaskets(aux);
  }

  function finished(item) {
    if (somaOrder(item) < item[0]?.empresa_pedido_minimo) {
      Alert.alert(
        'Pedido',
        `A empresa só aceita pedidos com o valor minímo de R$ ${item[0]?.empresa_pedido_minimo}`
      );
    } else {
      if (token != null) {
        setOrder(item);
        setOpen(true);
      } else {
        navigation.navigate('SignIn');
      }
    }
  }

  function edit(item) {
    setOrder(item);
    if (Platform.OS === 'android') {
      refAlert.current.show();
    } else {
      onPress(item);
    }
  }

  function onPress(item) {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['Editar item', 'Remover item', 'Cancelar'],
        destructiveButtonIndex: 1,
        cancelButtonIndex: 2,
        title: `${item.quantity} x ${item.descricao}`,
      },
      (buttonIndex) => {
        if (buttonIndex == 0) {
          setEditOpen(true);
        } else if (buttonIndex == 1) {
          Alert.alert(
            'Confirme para continuar',
            'Deseja remover este produto da sua cesta ?',
            [
              {
                text: 'Não',
                onPress: () => { },
                style: 'cancel',
              },
              {
                text: 'Sim',
                onPress: () => {
                  removeProductBagCart(item, [], dispatch, bag, total, []);
                },
              },
            ],
            { cancelable: false }
          );
        }
      }
    );
  }

  return (
    <Container>
      <CardHead>
        <Line>
          <View style={{ alignItems: 'center' }}>
            <Text>
              {baskets.length == 1
                ? baskets[0].length == 1
                  ? 0
                  : baskets.length
                : baskets.length}
            </Text>
            <Text>Cesta(s)</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>{total}</Text>
            <Text>Produto(s)</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text>R$ {formatMoney(soma(bag))}</Text>
            <Text>Valor Total</Text>
          </View>
        </Line>
        <TextCardHead>
          <Text>VEJA SUAS CESTAS ABAIXO</Text>
        </TextCardHead>
      </CardHead>

      {baskets.map(
        (item) =>
          item.length > 1 && (
            <Card>
              <TouchableOpacity
                onPress={() => {
                  let final = [];
                  for (let i = 0; i < baskets.length; i++) {
                    if (baskets[i][0].empresa_id == item[0].empresa_id) {
                      let array = baskets[i];
                      let aux = array.pop(); //!array[array.length - 1].open;
                      array.push({ open: !aux.open });
                      final.push(array);
                    } else {
                      final.push(baskets[i]);
                    }
                  }
                  setBaskets(final);
                }}
              >
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{
                    flex: 1,
                  }}>
                    <Text style={{ flex: 1, color: colors.dark }}>
                      {item[0].empresa_nome}
                    </Text>
                  </View>
                  {item[item.length - 1].open ? (
                    <DownIcon
                      style={{ marginRight: 3 }}
                      name="ios-arrow-down"
                      color={colors.dark}
                      size={20}
                    />
                  ) : (
                      <UpIcon
                        style={{ marginRight: 3 }}
                        color={colors.dark}
                        name="ios-arrow-up"
                        size={20}
                      />
                    )}
                </View>
              </TouchableOpacity>

              {item[item.length - 1].open && (
                <>
                  {item.map(
                    (item) =>
                      !item.open && (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 10,
                          }}
                        >
                          <View style={{ flex: 1, marginRight: 10 }}>
                            <TextCard color={'#000'}>
                              {item.quantity} x {item.descricao}
                            </TextCard>
                            <TextCard color={'#080'}>
                              Total: R$ {formatMoney(somaUnitaria(item))}
                            </TextCard>
                          </View>

                          <TouchableOpacity onPress={() => edit(item)}>
                            <OptionIcon
                              name="options-vertical"
                              color={colors.success}
                              size={20}
                            />
                          </TouchableOpacity>

                          {/* <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => removeProductBag(item, [], dispatch, bag, total, [])}>
                    <MinusIcon style={{ marginRight: 10 }} name="minus-circle-outline" size={25} color={colors.success} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => addProductBag(item, item[0], dispatch, bag, total, [])}>
                    <PlusIcon name="plus-circle-outline" size={25} color={colors.success} />
                  </TouchableOpacity>
                </View> */}

                          {/* <TouchableOpacity onPress={() => {
                  Alert.alert(
                    'Confirme para continuar',
                    "Deseja remover este produto da sua cesta ?",
                    [
                      {
                        text: 'Não',
                        onPress: () => { },
                        style: 'cancel',
                      },
                      {
                        text: 'Sim', onPress: () => {
                          removeProductBagCart(item, [], dispatch, bag, total, []);
                        }
                      }],
                    { cancelable: false },
                  );
                }}>
                  <DownIcon name="md-close" color={colors.success} size={20} />
                </TouchableOpacity> */}
                        </View>
                      )
                  )}

                  <Text style={{ flex: 1, marginTop: 10, color: colors.primary }}>
                    Valor Total: R$ {formatMoney(somaOrder(item))}
                  </Text>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      marginTop: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => finished(item)}
                  >
                    <TextCardCart>
                      <TextCard color={colors.success}>COMPRAR CESTA</TextCard>
                    </TextCardCart>
                  </TouchableOpacity>
                </>
              )}
            </Card>
          )
      )}

      <View>
        <EditOrder item={order} open={editOpen} setOpen={setEditOpen} />
      </View>

      <View>
        <FinishedOrder bag={bag} open={open} item={order} setOpen={setOpen} />
      </View>

      <ActionSheet
        ref={refAlert}
        //Title of the Bottom Sheet
        title={
          <Text
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              color: colors.primary,
            }}
          >{`${order.quantity} x ${order.descricao}`}</Text>
        }
        //Options Array to show in bottom sheet
        options={[
          <Text style={{ color: colors.success }}>Editar item</Text>,
          <Text style={{ color: '#f00' }}>Remover item</Text>,
          <Text style={{ color: colors.primary }}>Cancelar</Text>,
        ]}
        //Define cancel button index in the option array
        //this will take the cancel option in bottom and will highlight it
        cancelButtonIndex={2}
        //If you want to highlight any specific option you can use below prop
        destructiveButtonIndex={1}
        onPress={(index) => {
          if (index == 0) {
            setEditOpen(true);
          } else if (index == 1) {
            Alert.alert(
              'Confirme para continuar',
              'Deseja remover este produto da sua cesta ?',
              [
                {
                  text: 'Não',
                  onPress: () => { },
                  style: 'cancel',
                },
                {
                  text: 'Sim',
                  onPress: () => {
                    removeProductBagCart(order, [], dispatch, bag, total, []);
                  },
                },
              ],
              { cancelable: false }
            );
          }
        }}
      />
    </Container>
  );
}
