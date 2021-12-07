import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';

// import { Container } from './styles';
import ZoomImage from 'react-native-zoom-image';
import {Easing} from 'react-native'; // import Easing if you want to customize easing function

const {width, height} = Dimensions.get('window');

import AwesomeAlert from 'react-native-awesome-alerts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StackActions, NavigationActions} from 'react-navigation';

import api from '~/services/api';

import store from '~/services/storage';

export default function Detail(props) {
  const [car, setCar] = useState(props.navigation.getParam('item'));
  const [confirmLogout, setLogout] = useState(false);

  const [images, setImages] = useState([]);

  async function getImages() {
    const {token} = await store.get('User');
    const images = await api.get(`/entries/media/${car.id}?token=${token}`);

    let imagens = [];
    for (let i = 0; i < images.data.data.length; i++) {
      imagens.push(images.data.data[i]); //.image
    }

    //let imagens = [];
    //imagens.push(images.data.data[0]);

    setImages(imagens);
  }

  useEffect(() => {
    getImages();

    props.navigation.setParams({
      changeLogout: () => changeLogout(),
    });
  }, []);

  function changeLogout() {
    setLogout(true);
  }

  async function clear() {
    await store.save('User', null);
  }

  function logout() {
    clear();
    props.navigation.dispatch(
      StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({routeName: 'Login'})],
      }),
    );
  }

  return (
    <ScrollView>
      <View style={{margin: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            fabricante:
          </Text>
          <Text style={{textTransform: 'uppercase'}}>{car.brand}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            Veículo:
          </Text>
          <Text style={{flex: 1, textTransform: 'uppercase'}}>
            {car.full_name}
          </Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            Placa:
          </Text>
          <Text style={{textTransform: 'uppercase'}}>{car.plate}</Text>
        </View>

        {/* <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            Km:
          </Text>
          <Text style={{ textTransform: 'uppercase' }}>{car.km}</Text>
        </View> */}

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            Cor:
          </Text>
          <Text style={{textTransform: 'uppercase'}}>{car.color}</Text>
        </View>

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            ano mod/fab:
          </Text>
          <Text style={{textTransform: 'uppercase'}}>
            {car.fabrication_year}
          </Text>
        </View>

        {/* <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            renavam:
          </Text>
          <Text style={{ textTransform: 'uppercase' }}>{car.renavam}</Text>
        </View> */}

        {/* <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            chassi:
          </Text>
          <Text style={{ textTransform: 'uppercase' }}>{car.chassi}</Text>
        </View> */}

        <View style={{flexDirection: 'row'}}>
          <Text
            style={{
              fontWeight: 'bold',
              marginRight: 10,
              textTransform: 'uppercase',
            }}>
            preço:
          </Text>
          <Text style={{textTransform: 'uppercase'}}>{car.sale_price}</Text>
        </View>
      </View>

      {/* <Image
          style={{ width: 200, height: 200 }}
          resizeMode={"contain"}
          source={{ uri: item.file }}
        /> */}

      {/* <ZoomImage
            source={{ uri: item.image }}
            imgStyle={{ width: width / 2 - 10, margin: 5, height: 100 }}
            duration={200}
            enableScaling={false}
            easingFunc={Easing.ease}
          /> */}

      <FlatList
        data={images}
        numColumns={2}
        renderItem={({item}) => (
          <ZoomImage
            source={{uri: item.image}}
            imgStyle={{width: width / 2 - 10, margin: 5, height: 100}}
            duration={200}
            enableScaling={false}
            easingFunc={Easing.ease}
          />
        )}
      />

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
    </ScrollView>
  );
}

Detail.navigationOptions = ({navigation}) => ({
  headerStyle: {backgroundColor: '#414a69'},
  headerTintColor: '#fff',
  headerTitle: 'Veículo',
  headerTitleStyle: {
    textAlign: 'center',
    flexGrow: 1,
    alignSelf: 'center',
    marginRight: Platform.OS === 'ios' ? 0 : 45,
  },
  /* headerRight: (
    <TouchableOpacity
      onPress={() => navigation.state.params.changeLogout()}
      style={{ marginRight: 10 }}>
      <Icon name="sign-out" size={25} color="#fff" />
    </TouchableOpacity>
  ), */
});
