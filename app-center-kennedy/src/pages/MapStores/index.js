import React, {useState} from 'react';
import {View} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
// import { Container } from './styles';

export default function MapStores() {
  const [stores, setStores] = useState([
    {
      id: 1,
      latitude: '0.0354009',
      longitude: '-51.0741595',
      title: 'Center Kennedy Matriz',
      description:
        'Av. Padre Júlio Maria Lombaerd, 2353 - Santa Rita, Macapá - AP, 68901-283',
    },

    {
      id: 4,
      latitude: '0.0379144',
      longitude: '-51.0571125',
      title: 'Center Kennedy Comércio',
      description: 'R. São José, 1699 - Central, Macapá - AP, 68900-110',
    },
  ]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <MapView
        style={{flex: 1}}
        initialRegion={{
          latitude: parseFloat(stores[0].latitude),
          longitude: parseFloat(stores[0].longitude),
          latitudeDelta: 0.0134,
          longitudeDelta: 0.0134,
        }}
        loadingEnabled
        showsUserLocation>
        {stores &&
          stores.map(store => (
            <Marker
              key={store.id}
              title={store.title}
              description={store.description}
              coordinate={{
                latitude: parseFloat(store.latitude),
                longitude: parseFloat(store.longitude),
              }}
            />
          ))}
      </MapView>
    </View>
  );
}

MapStores.navigationOptions = {
  headerTitle: 'Nossas lojas',
};
