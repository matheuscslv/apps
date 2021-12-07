import React, { useEffect, useState } from 'react';
import {
  View,
  Alert,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  Modal
} from 'react-native';

import { TextInputMask } from 'react-native-masked-text';
import MaIcon from 'react-native-vector-icons/MaterialIcons';

import {
  DownIcon,
  TextCard,
  HeaderCart,
  BasketCard,
  BasketDeliveryCard,
  CheckIcon,
  ButtomBasketCard,
  InputCode
} from '../styles';
import { colors } from '~/styles';

//import Modal from 'react-native-modal';
import ModalAddress from 'react-native-modal';

import RNPickerSelect from 'react-native-picker-select';

import soma, { somaOrder, somaUnitaria } from '~/Components/SumTotalBag';
import InputDefault from '~/Components/InputDefault';

import CreditCard from '../CreditCard';

import { WalletTypes } from '~/store/ducks/wallet';
import { BagsTypes } from '~/store/ducks/bag';
import { useDispatch, useSelector } from 'react-redux';
import api from '~/services/api';

import Loading from '~/Components/Loading';
import { withNavigation } from 'react-navigation';

import formatMoney from '~/Components/ConvertMoney';




import {
  Content,
  ContentUser,
  Header,
  UserInformations,
  Name,
  Address,
  Title,
} from '../styles';
import ButtonChange from './Button';




function FinishedOrder({ navigation, bag, item, open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const [credit, setCredit] = useState(false);

  const [optionsPayment, setOptionsPayment] = useState([
    { label: 'Novo Cartão de Crédito', value: 0 },
    { label: 'Cartão de Crédito Cadastrado', value: 1 },
    { label: 'Dinheiro', value: 2 },
  ]);

  const [troco, setTroco] = useState('R$ 0,00');

  const [selectAddress, setSelectAddress] = useState(null);
  const [openAddress, setOpenAddress] = useState(false)

  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [parcelas, setParcelas] = useState([]);


  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const wallet = useSelector((state) => state.wallet);

  const [delivery, setDelivery] = useState(true);
  const [paymentType, setPaymentType] = useState(null); //1 cartão
  const [addressType, setAddressType] = useState(null); //1 cartão
  const [cardType, setCardType] = useState(null); //1 cartão
  const [parcelasType, setParcelasType] = useState(null);
  const [taxaType, setTaxaType] = useState(null);

  const [number, setNumber] = useState('');
  const [validity, setValidity] = useState('');
  const [ccv, setCcv] = useState('');
  const [name, setName] = useState('');

  const pickerStyle = {
    inputIOS: {
      color: 'black',
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12,
    },
    inputAndroid: {
      color: 'black',
    },
    placeholderColor: 'black',
    underline: { borderTopWidth: 0 },
    iconContainer: {
      top: 15,
      right: 10,
    }
  };

  useEffect(() => {
    setAddressType(null);
    setParcelasType(null);
    setTaxaType(null)
  }, [item]);

  function closeCart() {
    setAddressType(null);
    setSelectAddress(null);
    setParcelasType(null);
    setTaxaType(null);
    setPaymentType(null);
    setOpen(false);
  }

  useEffect(() => {
    api.get('/enderecos').then(({ data }) => {
      const aux = data.map((item) => ({
        label: `(${item.descricao}) ${item.logradouro}, nº ${item.numero}, ${item.bairro}, ${item.cidade} - ${item.estado}`,
        value: item.id,
      }));
      setAddresses([{ label: 'Cadastrar novo Endereço', value: 0 }, ...aux]);
    });

    if (wallet.cards.length == 0) {
      setOptionsPayment([
        { label: 'Novo Cartão de Crédito', value: 0 },
        { label: 'Dinheiro', value: 2 },
      ]);
    }

    const aux = wallet.cards.map((item) => ({
      label: item['4primeiros_digitos'] + ' **** **** **** (' + item.bandeira + ')',
      value: item.cartao_id,
    }));

    let parc = [];
    for (let i = 0; i < item[0]?.empresa_parcelamento_maximo; i++) {
      console.log('taxa', Number(taxaType))
      parc.push({ label: `${i + 1}x de R$ ${formatMoney((Number(somaOrder(item)) + Number(taxaType)) / (i + 1))}`, value: (i + 1) })
    }
    setParcelas(parc)

    setCards(aux);
  }, [item, open, taxaType]);

  async function payment() {
    /* console.log(item)
    console.log(delivery)
    console.log(paymentType)
    console.log(addressType)
    console.log(cardType)
    console.log(parcelasType) */

    setLoading(true);

    if (delivery) {
      if (addressType == null) {
        Alert.alert('Endereço', 'Selecione o endereço de entrega!');
        setLoading(false);
        return;
      }
      if (taxaType == null) {
        Alert.alert("Entrega", "Não há disponibilidade de entrega para o endereço selecionado")
        setLoading(false);
        return;
      }
      if (paymentType == null) {
        Alert.alert('Pagamento', 'Selecione o método de pagamento!');
        setLoading(false);
        return;
      } else {
        if (cardType == null && paymentType == 1) {
          Alert.alert('Cartão de Crédito', 'Selecione o cartão de crédito!');
          setLoading(false);
          return;
        } else {
          if (parcelasType == null && paymentType == 1) {
            Alert.alert('Parcelas', 'Selecione a quantidade de parcelas!');
            setLoading(false);
            return;
          }
        }
      }
    } else {
      if (paymentType == null) {
        Alert.alert('Pagamento', 'Selecione o método de pagamento!');
        setLoading(false);
        return;
      } else {
        if (cardType == null && paymentType == 1) {
          Alert.alert('Cartão de Crédito', 'Selecione o cartão de crédito!');
          setLoading(false);
          return;
        } else {
          if (parcelasType == null && paymentType == 1) {
            Alert.alert('Parcelas', 'Selecione a quantidade de parcelas!');
            setLoading(false);
            return;
          }
        }
      }
    }

    try {
      let response = { success: true };
      if (paymentType == 0) {
        if (parcelasType == null) {
          Alert.alert('Parcelas', 'Selecione a quantidade de parcelas!');
          setLoading(false);
          return;
        }

        let [mes_expiracao, ano_expiracao] = validity.split('/');

        if (
          !mes_expiracao ||
          !ano_expiracao ||
          ccv.length !== 3 ||
          number.length !== 19 ||
          mes_expiracao.length !== 2 ||
          ano_expiracao.length < 2 ||
          String(name).length == 0
        ) {
          Alert.alert('Novo cartão', 'Preencha corretamente os campos!');
          setLoading(false);
          return;
        }

        if (ano_expiracao.length === 2) {
          ano_expiracao = `20${ano_expiracao}`;
        }

        const data = {
          numero_cartao: number,
          mes_expiracao,
          ano_expiracao,
          titular: name,
          codigo_seguranca: ccv,
        };

        const insertCard = (WalletTypes, setCardType, data, setLoading) =>
          new Promise((resolve, reject) => {
            dispatch({
              type: WalletTypes.GET_ADD_CARD_CART_REQUEST,
              card: data,
              save: true,
              setLoading,
              setCardType,
              resolve,
            });
            //resolve();
          });

        response = await insertCard(WalletTypes, setCardType, data, setLoading);
      }

      if (response.success) {
        Alert.alert(
          'Confirme para continuar',
          'Deseja mesmo finalizar a compra?',
          [
            {
              text: 'Não',
              onPress: () => setLoading(false),
              style: 'cancel',
            },
            {
              text: 'Sim',
              onPress: () => {
                dispatch({
                  type: BagsTypes.GET_BAGS_REQUEST,
                  setLoading,
                  setOpen,
                  closeCart,
                  user,
                  bag: item,
                  carrinho: bag,
                  wallet,
                  dispatch,

                  delivery,
                  paymentType,
                  cardType: response.cardType || cardType,
                  troco,

                  taxa_entrega: taxaType,
                  empresa_id: item[0].empresa_id,
                  endereco_entrega_id: addressType,
                  numero_parcelas: parcelasType,
                });
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        throw 'Cartão não inserido';
      }
    } catch (e) {
      console.log(e)
      Alert.alert(
        'Finalizar Pedido',
        'Não foi possível finalizar o pedido, verifique seu cartão!'
      );
      setLoading(false);
    }
  }

  async function changeTaxaAddress(id) {
    console.log(id)
    if (id != null) {
      setLoading(true)
      try {
        api.get(`enderecos/${id}`).then(({ data }) => {
          const final = String(data.bairro);
          //const parsed = str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

          //const final = parsed.toLocaleLowerCase().replace(/[\s*]/g, "-");

          api.get(`/taxa-entrega/empresa/${item[0].empresa_id}/bairro/${final}`).then(({ data }) => {
            if (data == "") {
              setTaxaType(null)
              setAddressType(null)
              setSelectAddress(null)
              Alert.alert("Entrega", "Não há disponibilidade de entrega para o endereço selecionado")
            } else {
              setTaxaType(data.taxa)
            }
            setLoading(false)
          });
        });
      } catch (error) {

      } finally {

      }
    }
  }

  function setDeliveryChange(value) {
    if (!value) {
      setAddressType(null);
      setSelectAddress(null);
      setTaxaType(null)
    }
    setDelivery(value)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
    >

      <ModalAddress isVisible={openAddress}>
        <View style={{ padding: 10 }}>
          <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{ padding: 10 }}>
              <HeaderCart>
                <DownIcon name="md-basket" color={colors.primary} size={20} />
                <TextCard
                  style={{ fontFamily: 'Quicksand-Bold' }}
                  color={colors.primary}
                >
                  Selecione o Endereço
                </TextCard>
                <TouchableOpacity onPress={() => setOpenAddress(false)}>
                  <DownIcon
                    name="ios-close-circle-outline"
                    color={colors.primary}
                    size={30}
                  />
                </TouchableOpacity>
              </HeaderCart>

              <View>
                {addresses.map(item => (
                  <TouchableOpacity onPress={() => {
                    setOpenAddress(false)

                    if (item.value == 0) {
                      setAddressType(null);
                      setSelectAddress(null)
                      setOpen(false);
                      navigation.navigate('NewAddress');
                    } else {
                      setAddressType(item.value);
                      setSelectAddress(item.label);
                      changeTaxaAddress(item.value);
                    }
                  }} style={{ padding: 10, marginBottom: 10, borderRadius: 4, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.primary }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                      <TextCard
                        style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'justify', fontFamily: `${item.value == 0 ? 'Quicksand-Bold' : 'Quicksand-Regular'}` }}
                        color={colors.black}
                      >
                        {item.label}
                      </TextCard>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

            </View>
          </ScrollView>
        </View>
      </ModalAddress>

      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView style={{ backgroundColor: '#fff' }}>
          <View style={{ padding: 10, marginTop: Platform.OS === 'android' ? 10 : 30 }}>
            <HeaderCart>
              <DownIcon name="md-basket" color={colors.primary} size={20} />
              <TextCard
                style={{ fontFamily: 'Quicksand-Bold' }}
                color={colors.primary}
              >
                {item[0]?.empresa_nome}
              </TextCard>
              <TouchableOpacity onPress={() => {
                Alert.alert(
                  'Confirme para continuar',
                  "Deseja sair de sua cesta ?",
                  [
                    {
                      text: 'Não',
                      onPress: () => { },
                      style: 'cancel',
                    },
                    {
                      text: 'Sim', onPress: () => {
                        setOpen(false);
                      }
                    }],
                  { cancelable: false },
                );
              }}>
                <DownIcon
                  name="ios-close-circle-outline"
                  color={colors.primary}
                  size={30}
                />
              </TouchableOpacity>
            </HeaderCart>

            <View style={{ flexDirection: 'row' }}>
              <BasketCard>
                <TextCard
                  style={{ fontFamily: 'Quicksand-Bold' }}
                  color={colors.success}
                >
                  R$ {formatMoney(somaOrder(item))}
                </TextCard>
                <TextCard
                  style={{ fontFamily: 'Quicksand-Bold' }}
                  color={colors.black}
                >
                  Total da Cesta
                </TextCard>
              </BasketCard>

              <BasketCard>
                <TextCard
                  style={{ fontFamily: 'Quicksand-Bold' }}
                  color={colors.success}
                >
                  R$ {formatMoney(taxaType)}
                </TextCard>
                <TextCard
                  style={{ fontFamily: 'Quicksand-Bold' }}
                  color={colors.black}
                >
                  Taxa de Entrega
                </TextCard>
              </BasketCard>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <BasketDeliveryCard onPress={() => setDeliveryChange(true)}>
                <TextCard
                  style={{
                    textTransform: 'uppercase',
                    fontSize: 11,
                    fontFamily: 'Quicksand-Bold',
                  }}
                  color={delivery ? `${colors.success}` : '#CCC'}
                >
                  Entrega
                </TextCard>
                {/* <CheckIcon name="md-checkmark" color={delivery ? `${colors.success}` : "#CCC"} size={20} /> */}
              </BasketDeliveryCard>

              <BasketDeliveryCard onPress={() => setDeliveryChange(false)}>
                <TextCard
                  style={{
                    textTransform: 'uppercase',
                    fontSize: 11,
                    fontFamily: 'Quicksand-Bold',
                  }}
                  color={delivery ? '#CCC' : `${colors.success}`}
                >
                  Retirar no Local
                </TextCard>
                {/* <CheckIcon name="md-checkmark" color={delivery ? "#CCC" : `${colors.success}`} size={20} /> */}
              </BasketDeliveryCard>
            </View>

            {delivery ? (
              <>
                <View style={{ marginTop: 10 }}>
                  {/*  <TextCard
                    style={{
                      paddingHorizontal: 5,
                      fontFamily: 'Quicksand-Bold',
                    }}
                    color={colors.primary}
                  >
                    Onde Devemos Entregar?
                  </TextCard> */}
                  <View>

                    <Content>
                      <Header>
                        <Title>Endereço de entrega</Title>
                      </Header>
                      <ContentUser>
                        <MaIcon size={20} name="location-on" color="#999" />
                        <UserInformations>
                          <Address>
                            {selectAddress || `Selecione ou cadastre um novo endereço`}
                          </Address>
                        </UserInformations>
                        <ButtonChange onPress={() => setOpenAddress(true)}>Alterar</ButtonChange>
                      </ContentUser>
                    </Content>
                    {/* <RNPickerSelect
                      style={pickerStyle}
                      useNativeAndroidPickerStyle={false}
                      Icon={() => <DownIcon name="ios-arrow-down" color={colors.regular} size={20} />}
                      value={addressType}
                      placeholder={{
                        label: 'Selecione o Endereço de Entrega',
                        value: null,
                      }}
                      //onOpen={() => setOpenAddress(true)}
                      onValueChange={(value) => {
                        setAddressType(value);
                        changeTaxaAddress(value);
                        if (value == 0) {
                          setAddressType(null);
                          setOpen(false);
                          navigation.navigate('NewAddress');
                        }
                      }}
                      items={addresses}
                    /> */}
                  </View>
                </View>

                <View style={{ marginTop: 10 }}>
                  <TextCard
                    style={{
                      paddingHorizontal: 5,
                      fontFamily: 'Quicksand-Bold',
                    }}
                    color={colors.primary}
                  >
                    Como Deseja Pagar?
                  </TextCard>
                  <View>
                    <RNPickerSelect
                      style={pickerStyle}
                      useNativeAndroidPickerStyle={false}
                      Icon={() => <DownIcon name="ios-arrow-down" color={colors.regular} size={20} />}
                      value={paymentType}
                      placeholder={{
                        label: 'Selecione o Método de Pagamento',
                        value: null,
                      }}
                      onValueChange={(value) => {
                        setPaymentType(value);
                      }}
                      items={optionsPayment}
                    />
                  </View>
                </View>

                {paymentType == 0 && (
                  <>
                    <CreditCard
                      number={number}
                      setNumber={setNumber}
                      validity={validity}
                      setValidity={setValidity}
                      ccv={ccv}
                      setCcv={setCcv}
                      name={name}
                      setName={setName}
                      loading={loading}
                      setLoading={setLoading}
                    />
                    <View style={{ marginTop: 10 }}>
                      <TextCard
                        style={{
                          paddingHorizontal: 5,
                          fontFamily: 'Quicksand-Bold',
                        }}
                        color={colors.primary}
                      >
                        Parcelamento no Cartão
                      </TextCard>
                      <View>
                        <RNPickerSelect
                          style={pickerStyle}
                          useNativeAndroidPickerStyle={false}
                          Icon={() => <DownIcon name="ios-arrow-down" color={colors.regular} size={20} />}
                          value={parcelasType}
                          placeholder={{
                            label: 'Selecione a Quantidade de Parcelas',
                            value: null,
                          }}
                          onValueChange={(value) => setParcelasType(value)}
                          items={parcelas}
                        />
                      </View>
                    </View>
                  </>
                )}

                {paymentType == 1 ? (
                  <>
                    <View style={{ marginTop: 10 }}>
                      <TextCard
                        style={{
                          paddingHorizontal: 5,
                          fontFamily: 'Quicksand-Bold',
                        }}
                        color={colors.primary}
                      >
                        Selecione o Cartão
                      </TextCard>
                      <View>
                        <RNPickerSelect
                          style={pickerStyle}
                          useNativeAndroidPickerStyle={false}
                          Icon={() => <DownIcon name="ios-arrow-down" color={colors.regular} size={20} />}
                          value={cardType}
                          placeholder={{
                            label: 'Selecione o Cartão de Crédito',
                            value: null,
                          }}
                          onValueChange={(value) => setCardType(value)}
                          items={cards}
                        />
                      </View>
                    </View>

                    <View style={{ marginTop: 10 }}>
                      <TextCard
                        style={{
                          paddingHorizontal: 5,
                          fontFamily: 'Quicksand-Bold',
                        }}
                        color={colors.primary}
                      >
                        Parcelamento no Cartão
                      </TextCard>
                      <View>
                        <RNPickerSelect
                          style={pickerStyle}
                          useNativeAndroidPickerStyle={false}
                          Icon={() => <DownIcon name="ios-arrow-down" color={colors.regular} size={20} />}
                          value={parcelasType}
                          placeholder={{
                            label: 'Selecione a Quantidade de Parcelas',
                            value: null,
                          }}
                          onValueChange={(value) => setParcelasType(value)}
                          items={parcelas}
                        />
                      </View>
                    </View>
                  </>
                ) : (
                    paymentType == 2 && (
                      <View style={{ marginTop: 10 }}>
                        <TextCard
                          style={{
                            paddingHorizontal: 5,
                            fontFamily: 'Quicksand-Bold',
                          }}
                          color={colors.primary}
                        >
                          Se precisar de troco, informe aqui
                      </TextCard>
                        <InputCode
                          type={'money'}
                          options={{
                            precision: 2,
                            separator: ',',
                            delimiter: '.',
                            unit: 'R$ ',
                            suffixUnit: '',
                          }}
                          placeholder={'R$ 0,00'}
                          value={troco}
                          onChangeText={(text) => {
                            setTroco(text);
                          }}
                        />
                      </View>
                    )
                  )}
              </>
            ) : (
                <>
                  <View style={{ marginTop: 10 }}>
                    <TextCard
                      style={{
                        paddingHorizontal: 5,
                        fontFamily: 'Quicksand-Bold',
                      }}
                      color={colors.primary}
                    >
                      Como Deseja Pagar?
                  </TextCard>
                    <View>
                      <RNPickerSelect
                        style={pickerStyle}
                        useNativeAndroidPickerStyle={false}
                        Icon={() => <DownIcon name="ios-arrow-down" color={colors.regular} size={20} />}
                        value={paymentType}
                        placeholder={{
                          label: 'Selecione o Método de Pagamento',
                          value: null,
                        }}
                        onValueChange={(value) => {
                          setPaymentType(value);
                        }}
                        items={[
                          { label: 'Novo Cartão de Crédito', value: 0 },
                          { label: 'Cartão de Crédito Cadastrado', value: 1 },
                          { label: 'Dinheiro', value: 2 },
                        ]}
                      />
                    </View>
                  </View>

                  {paymentType == 0 && (
                    <>
                      <CreditCard
                        number={number}
                        setNumber={setNumber}
                        validity={validity}
                        setValidity={setValidity}
                        ccv={ccv}
                        setCcv={setCcv}
                        name={name}
                        setName={setName}
                        loading={loading}
                        setLoading={setLoading}
                      />
                      <View style={{ marginTop: 10 }}>
                        <TextCard
                          style={{
                            paddingHorizontal: 5,
                            fontFamily: 'Quicksand-Bold',
                          }}
                          color={colors.primary}
                        >
                          Parcelamento no Cartão
                      </TextCard>
                        <View>
                          <RNPickerSelect
                            style={pickerStyle}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => <DownIcon name="ios-arrow-down" color={colors.regular} size={20} />}
                            value={parcelasType}
                            placeholder={{
                              label: 'Selecione a Quantidade de Parcelas',
                              value: null,
                            }}
                            onValueChange={(value) => setParcelasType(value)}
                            items={parcelas}
                          />
                        </View>
                      </View>
                    </>
                  )}

                  {paymentType == 1 ? (
                    <>
                      <View style={{ marginTop: 10 }}>
                        <TextCard
                          style={{
                            paddingHorizontal: 5,
                            fontFamily: 'Quicksand-Bold',
                          }}
                          color={colors.primary}
                        >
                          Selecione o Cartão
                      </TextCard>
                        <View>
                          <RNPickerSelect
                            style={pickerStyle}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => <DownIcon name="ios-arrow-down" color={colors.regular} size={20} />}
                            value={cardType}
                            placeholder={{
                              label: 'Selecione o Cartão de Crédito',
                              value: null,
                            }}
                            onValueChange={(value) => setCardType(value)}
                            items={cards}
                          />
                        </View>
                      </View>

                      <View style={{ marginTop: 10 }}>
                        <TextCard
                          style={{
                            paddingHorizontal: 5,
                            fontFamily: 'Quicksand-Bold',
                          }}
                          color={colors.primary}
                        >
                          Parcelamento no Cartão
                      </TextCard>
                        <View>
                          <RNPickerSelect
                            style={pickerStyle}
                            useNativeAndroidPickerStyle={false}
                            Icon={() => <DownIcon name="ios-arrow-down" color={colors.regular} size={20} />}
                            value={parcelasType}
                            placeholder={{
                              label: 'Selecione a Quantidade de Parcelas',
                              value: null,
                            }}
                            onValueChange={(value) => setParcelasType(value)}
                            items={parcelas}
                          />
                        </View>
                      </View>
                    </>
                  ) : (
                      paymentType == 2 && (
                        <View style={{ marginTop: 10 }}>
                          <TextCard
                            style={{
                              paddingHorizontal: 5,
                              fontFamily: 'Quicksand-Bold',
                            }}
                            color={colors.primary}
                          >
                            Se precisar de troco, informe aqui
                      </TextCard>
                          <InputCode
                            type={'money'}
                            options={{
                              precision: 2,
                              separator: ',',
                              delimiter: '.',
                              unit: 'R$ ',
                              suffixUnit: '',
                            }}
                            placeholder={'R$ 0,00'}
                            value={troco}
                            onChangeText={(text) => {
                              setTroco(text);
                            }}
                          />
                        </View>
                      )
                    )}
                </>
              )}

            <ButtomBasketCard disabled={loading} onPress={() => payment()}>
              {loading ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <ActivityIndicator size="small" color={'#fff'} />
                </View>
              ) : (
                  <TextCard
                    style={{
                      textTransform: 'uppercase',
                      fontFamily: 'Quicksand-Bold',
                    }}
                    color={colors.white}
                  >
                    Comprar
                  </TextCard>
                )}
              {/* <CheckIcon name="md-checkmark" color={colors.white} size={20} /> */}
            </ButtomBasketCard>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

export default withNavigation(FinishedOrder);
