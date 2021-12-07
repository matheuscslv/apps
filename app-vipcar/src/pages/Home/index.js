import React, { useState, useEffect } from 'react';
import {
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  View,
  ScrollView,
  Image,
} from 'react-native';
import api from '~/services/api';

import logo from '~/assets/logo.png';

import Car from '~/components/Car';

import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StackActions, NavigationActions } from 'react-navigation';

import store from '~/services/storage';

import { Searchbar } from 'react-native-paper';

export default function Home(props) {
  const [cars, setCars] = useState([]);
  const [carsAll, setCarsAll] = useState([]);

  const [confirmLogout, setLogout] = useState(false);
  const [loading, setLoading] = useState(false);

  const [query, setQuery] = useState('');

  async function getCars() {
    setQuery('');
    setLoading(true);
    const { token } = await store.get('User');
    const cars = await api.get(`/entries/estoque?token=${token}`);
    setCars(cars.data.data);
    setCarsAll(cars.data.data);

    const ativo = await store.get('Ativo');
    props.navigation.setParams({ ativo: ativo.ativo });

    /*let carros = [];
    for (let i = 0; i < cars.data.data.length; i++) {
      const images = await api.get(`/entries/media/${cars.data.data[i].id}?token=${token}`);
      if (images.data.data.length > 0) {
        carros.push(cars.data.data[i]);
        //console.log(images.data.data[0].image);
      }
    }
    setCars(carros);
    setCarsAll(carros);*/

    setLoading(false);
  }

  useEffect(() => {
    getCars();

    props.navigation.setParams({
      changeLogout: () => changeLogout(),
      getCars: () => getCars(),
    });
  }, []);

  async function clear() {
    await store.save('User', null);
  }

  function changeLogout() {
    setLogout(true);
  }

  function logout() {
    clear();
    props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: 'Login' })],
      }),
    );
  }

  function busca(text) {
    setQuery(text);
    setLoading(true);

    var filter = carsAll.filter(value => {
      return (
        String(value.full_name)
          .toUpperCase()
          .includes(String(text).toUpperCase()) ||
        String(value.brand)
          .toUpperCase()
          .includes(String(text).toUpperCase()) ||
        String(value.tenant_fancy_name)
          .toUpperCase()
          .includes(String(text).toUpperCase())
      );
    });

    setCars(filter);

    setTimeout(() => {
      setLoading(false);
    }, 250);
  }

  return (
    <>
      <Searchbar
        placeholder="Buscar veículo"
        onChangeText={query => busca(query)}
        value={query}
      />

      {loading ? (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color="#000" />
        </View>
      ) : (
          <ScrollView>
            {cars.map(item => (
              <Car data={item} />
            ))}
          </ScrollView>
        )}

      <AwesomeAlert
        show={confirmLogout}
        //showProgress={true}
        title="Deseja sair?"
        progressColor="#000"
        //message="Esta ação não pode ser revertida!"
        closeOnTouchOutside={false}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        cancelText="Cancelar"
        confirmText="   Sair   "
        confirmButtonColor="#f80000"
        cancelButtonColor="#080"
        onCancelPressed={() => {
          setLogout(false);
        }}
        onConfirmPressed={logout}
      />
    </>
  );
}

Home.navigationOptions = ({ navigation }) => ({
  headerStyle: { backgroundColor: '#414a69' },
  headerTintColor: '#fff',
  headerTitle: 'Estoque',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center',
  },
  headerLeft: (
    <Image
      resizeMode="contain"
      style={{
        flex: 1,
        width: 80,
        height: 80,
        marginLeft: 10,
      }}
      source={logo}
    />
  ),
  headerRight: (
    <>
      <TouchableOpacity
        style={{ marginRight: 15 }}
        onPress={() => navigation.state.params.getCars()}>
        <Icon name="refresh" size={25} color="#fff" />
      </TouchableOpacity>

      {!navigation.state.params?.ativo &&
        <TouchableOpacity
          onPress={() => navigation.state.params.changeLogout()}
          style={{ marginRight: 10 }}>
          <Icon name="sign-out" size={25} color="#fff" />
        </TouchableOpacity>
      }

    </>
  ),
});
