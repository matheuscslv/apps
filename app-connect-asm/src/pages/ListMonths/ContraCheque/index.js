import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  Linking,
  ActivityIndicator,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import { connect_service } from '~/services/api';
import store from '~/services/storage';

import responseData from './data';

import Toast from 'react-native-simple-toast';
const downloadManager = require('react-native-simple-download-manager');

export default function ContraCheque(props) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const [completeData, setCompleteData] = useState([]);
  const [isDecimoTerceiro, setIsDecimoTerceiro] = useState(false);
  const [selected, setSelected] = useState(0); //0 nenhum 1 normal 2 13º

  async function componenetDidMount() {
    const user = await store.get('User');

    const cc = {
      year: String(props.data)
        .split('/')[2]
        .trim(),
      month: String(props.data)
        .split('/')[0]
        .trim(),
    };

    try {
      const { data } = await connect_service.post(
        `/workers/${user.cpf}/events`,
        cc,
      );

      if (data?.length > 1) {
        setIsDecimoTerceiro(true)
        setCompleteData(data)
      } else {
        setData(data[0])
      }

      setLoading(false);
    } catch (error) {
      Alert.alert(
        'Erro de validação',
        'Não foi possível obter os dados do contra cheque!',
        [
          {
            text: 'OK',
            onPress: () => {
              props.setModalVisible(false);
              setLoading(false);
            },
          },
        ],
        { cancelable: false },
      );
    }
  }

  async function generatePDF() {
    //const base_url = 'http://192.168.1.104:3337';
    const base_url = 'https://connect-service.msbtec.com.br';

    Toast.show('O download do contra-cheque será iniciado!', Toast.LONG);

    const pdf = await connect_service.post(`/generate`, {
      contra: {
        periodo:
          String(props.data).split('/')[1] +
          '/' +
          String(props.data).split('/')[2],
        data,
      },
    });

    if (Platform.OS === 'android') {
      const url = `${base_url}/generate/${pdf.data.value}`;
      const headers = { Authorization: 'Bearer token' };
      const config = {
        downloadTitle: pdf.data.value,
        downloadDescription: 'Contra-Cheque',
        saveAsName: pdf.data.value,
        allowedInRoaming: true,
        allowedInMetered: true,
        showInDownloads: true,
        external: false,
        path: `Download/gente`,
      };

      downloadManager
        .download(url, headers, config)
        .then(response => {
          console.log('Finalizado');
        })
        .catch(err => { });
    } else {
      try {
        Linking.openURL(`${base_url}/generate/${pdf.data.value}`);
      } catch (err) {
        Alert.alert(String(err));
      }
    }
  }

  useEffect(() => {
    componenetDidMount();
  }, []);

  function mCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return cpf;
  }

  function formatMoney(
    amount,
    decimalCount = 2,
    decimal = ',',
    thousands = '.',
  ) {
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? '-' : '';

      let i = parseInt(
        (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)),
      ).toString();
      let j = i.length > 3 ? i.length % 3 : 0;

      return (
        negativeSign +
        (j ? i.substr(0, j) + thousands : '') +
        i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
        (decimalCount
          ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
          : '')
      );
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator
            style={{ marginTop: 10 }}
            size="large"
            color={'#000'}
          />
        </View>
      ) : (
          <>
            {isDecimoTerceiro && selected == 0 ? (
              <View style={{ flex: 1, padding: 10 }}>
                <View style={{ borderRadius: 10, marginTop: 10 }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (isDecimoTerceiro && selected != 0) {
                        setSelected(0)
                      } else {
                        props.setModalVisible(false);
                      }
                    }}>
                    <View
                      style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                      <Icon name="closecircle" color={'#000'} size={30} />
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={{ flex: 1, justifyContent: "center", }}>
                  <TouchableOpacity style={{ alignItems: 'center', marginBottom: 10, minWidth: 200, padding: 10, backgroundColor: "#eee", borderRadius: 10 }} onPress={() => { setSelected(1); setData(completeData[0]) }}>
                    <Text style={{
                      textTransform: 'uppercase',
                      fontFamily: 'Quicksand-Bold',
                    }}>Contracheque{' '}
                      {String(props.data).split('/')[1] +
                        '/' +
                        String(props.data).split('/')[2]}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={{ alignItems: 'center', minWidth: 200, padding: 10, backgroundColor: "#eee", borderRadius: 10 }} onPress={() => { setSelected(2); setData(completeData[1]) }}>
                    <Text style={{
                      textTransform: 'uppercase',
                      fontFamily: 'Quicksand-Bold',
                    }}>13º Salário{' '}{String(props.data).split('/')[1] +
                      '/' +
                      String(props.data).split('/')[2]}</Text>
                  </TouchableOpacity>
                </View>

              </View>
            ) : (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={{ flex: 1, backgroundColor: '#eee' }}>
                  <View style={{ marginTop: Platform.OS === 'android' ? 0 : 30 }}>
                    <View style={{ backgroundColor: '#eee', margin: 10 }}>
                      <View
                        style={{
                          backgroundColor: '#eee',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <TouchableOpacity
                            onPress={() => generatePDF()}
                            style={{
                              flexDirection: 'row',
                              margin: 10,
                              justifyContent: 'flex-end',
                            }}>
                            <Icon name="download" color={'#000'} size={30} />
                          </TouchableOpacity>
                          <Text
                            style={{
                              textTransform: 'uppercase',
                              fontFamily: 'Quicksand-Bold',
                            }}>
                            Contracheque{' '}{isDecimoTerceiro && selected == 2 && '13º Salário '}
                            {String(props.data).split('/')[1] +
                              '/' +
                              String(props.data).split('/')[2]}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => {
                            if (isDecimoTerceiro && selected != 0) {
                              setSelected(0)
                            } else {
                              props.setModalVisible(false);
                            }
                          }}>
                          <View
                            style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Icon name="closecircle" color={'#000'} size={30} />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View>
                      <View
                        style={{
                          borderRadius: 10,
                          backgroundColor: '#fff',
                          padding: 10,
                          margin: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Quicksand-Bold',
                            textTransform: 'uppercase',
                          }}>
                          {data?.establishment?.nomefantasia}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Quicksand-Regular',
                            textTransform: 'uppercase',
                          }}>
                          CNPJ:{' '}
                          {data?.establishment &&
                            String(data?.establishment?.cnpj).replace(
                              /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
                              '$1.$2.$3/$4-$5',
                            )}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Quicksand-Regular',
                            textTransform: 'uppercase',
                          }}>
                          Período:{' '} {String(props.data).split('/')[1] + '/' + String(props.data).split('/')[2]}
                        </Text>
                      </View>

                      <View
                        style={{
                          borderRadius: 10,
                          backgroundColor: '#fff',
                          padding: 10,
                          margin: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Quicksand-Bold',
                            textTransform: 'uppercase',
                          }}>
                          {data?.nome}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Quicksand-Regular',
                            textTransform: 'uppercase',
                          }}>
                          CPF: {data?.cpf && mCPF(data?.cpf)}
                        </Text>
                        <Text
                          style={{
                            fontFamily: 'Quicksand-Regular',
                            textTransform: 'uppercase',
                          }}>
                          Departamento: {data?.departament?.nome}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        padding: 10,
                        margin: 10,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <Icon
                          style={{ marginRight: 10 }}
                          name="pluscircle"
                          size={20}
                          color={'#080'}
                        />
                        <Text
                          style={{
                            textTransform: 'uppercase',
                            fontFamily: 'Quicksand-Bold',
                          }}>
                          Rendimentos
                </Text>
                      </View>

                      <View>
                        {data?.maturities &&
                          data?.maturities.values.map(item => (
                            <View
                              style={{
                                borderColor: '#CED0CE',
                                borderBottomWidth: 1,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                backgroundColor: '#fff',
                                padding: 10,
                              }}>
                              <Text
                                style={{
                                  flex: 1,
                                  fontFamily: 'Quicksand-Regular',
                                  textTransform: 'uppercase',
                                }}>
                                {String(item.nome).toUpperCase()}
                              </Text>
                              <Text
                                style={{
                                  fontFamily: 'Quicksand-Regular',
                                  textTransform: 'uppercase',
                                }}>
                                R$ {formatMoney(item.pivot?.valor)}
                              </Text>
                            </View>
                          ))}
                      </View>
                    </View>

                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        padding: 10,
                        margin: 10,
                      }}>
                      <View
                        style={{
                          justifyContent: 'center',
                          flexDirection: 'row',
                          marginBottom: 10,
                        }}>
                        <Icon
                          style={{ marginRight: 10 }}
                          name="minuscircle"
                          size={20}
                          color={'#f00'}
                        />
                        <Text
                          style={{
                            textTransform: 'uppercase',
                            fontFamily: 'Quicksand-Bold',
                          }}>
                          Descontos
                </Text>
                      </View>

                      {data?.discounts &&
                        data?.discounts.values.map(item => (
                          <View
                            style={{
                              borderColor: '#CED0CE',
                              borderBottomWidth: 1,
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                              backgroundColor: '#fff',
                              padding: 10,
                            }}>
                            <Text
                              style={{
                                flex: 1,
                                fontFamily: 'Quicksand-Regular',
                                textTransform: 'uppercase',
                              }}>
                              {String(item.nome).toUpperCase()}
                            </Text>
                            <Text
                              style={{
                                fontFamily: 'Quicksand-Regular',
                                textTransform: 'uppercase',
                              }}>
                              R$ {formatMoney(item.pivot?.valor)}
                            </Text>
                          </View>
                        ))}
                    </View>

                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        padding: 10,
                        margin: 10,
                      }}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 10,
                        }}>
                        <Text
                          style={{
                            fontFamily: 'Quicksand-Bold',
                            textTransform: 'uppercase',
                          }}>
                          total
                </Text>
                      </View>

                      <View style={{ backgroundColor: '#fff' }}>
                        <View
                          style={{
                            borderColor: '#CED0CE',
                            borderTopWidth: 1,
                            borderBottomWidth: 1,
                            padding: 10,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}>
                          <View
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                              style={{
                                fontFamily: 'Quicksand-Bold',
                                textTransform: 'uppercase',
                              }}>
                              Bruto
                    </Text>
                            <Text style={{ fontFamily: 'Quicksand-Regular' }}>
                              R$ {formatMoney(data?.salariobruto)}
                            </Text>
                          </View>

                          <View
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                              style={{
                                fontFamily: 'Quicksand-Bold',
                                textTransform: 'uppercase',
                              }}>
                              Desconto
                    </Text>
                            <Text style={{ fontFamily: 'Quicksand-Regular' }}>
                              R$ {formatMoney(data?.discounts?.total)}
                            </Text>
                          </View>

                          <View
                            style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text
                              style={{
                                fontFamily: 'Quicksand-Bold',
                                textTransform: 'uppercase',
                              }}>
                              Líquido
                    </Text>
                            <Text style={{ fontFamily: 'Quicksand-Regular' }}>
                              R$ {formatMoney(data?.salarioliquido)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        borderRadius: 10,
                        backgroundColor: '#fff',
                        padding: 10,
                        margin: 10,
                      }}>
                      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text
                          style={{
                            textTransform: 'uppercase',
                            fontFamily: 'Quicksand-Bold',
                            fontSize: 16,
                            marginBottom: 10,
                          }}>
                          Informações Adicionais
                </Text>
                      </View>

                      <View>
                        {[
                          { key: "base_inss", name: 'Base INSS' },
                          { key: "base_fgts", name: 'Base Calc. FGTS' },
                          { key: "fgts_mes", name: 'FGTS do Mês' },
                          { key: "base_irrf", name: 'Base Calc. IRRF' }].map(item => (
                            <View
                              style={{
                                borderColor: '#CED0CE',
                                borderBottomWidth: 1,
                                padding: 10,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                              }}>
                              <Text style={{ flex: 1, fontFamily: 'Quicksand-Regular' }}>
                                {String(item.name).toUpperCase()}
                              </Text>
                              <Text style={{ fontFamily: 'Quicksand-Regular' }}>
                                R$ {data && formatMoney(data[item.key])}
                              </Text>
                            </View>
                          ))}
                      </View>

                    </View>
                  </View>
                </ScrollView>
              )}
          </>
        )}
    </>
  );
}
