import React from 'react';
import { Dimensions, Image, View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import api from '@services/api';
import Axios from 'axios';
import { useTheme } from 'styled-components';

import destinyios from '../../assets/house.png';
import destiny from '../../assets/house2.png';
import origin from '../../assets/icone512x512_escuro_sem_bordas.png';
import originios from '../../assets/sale.png';
import authContext from '../../contexts/auth';

const GOOGLE_MAPS_APIKEY = 'AIzaSyAJLnjbwqDj7XpSoB7MORWcQMePWUPQ99c';

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

interface IProps {
  route: {
    params: {
      item: IPedido;
    };
  };
}

interface ICEPResponse {
  localidade: string;
  uf: string;
}

const Route: React.FC<IProps> = (props) => {
  const { colors } = useTheme();
  const { user } = React.useContext(authContext);

  const [order, setOrder] = React.useState<IPedido>({} as IPedido);

  const [initial, setInitial] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.09,
    longitudeDelta: 0.02,
  });

  const [final, setFinal] = React.useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.09,
    longitudeDelta: 0.02,
  });

  React.useEffect(() => {
    const pedido = props?.route?.params?.item;

    if (pedido?.fornecedor && user?.cep) {
      setOrder(pedido);
      try {
        setInitial({
          latitude: Number(pedido.fornecedor.latitude),
          longitude: Number(pedido.fornecedor.longitude),
          latitudeDelta: 0.00522,
          longitudeDelta:
            (Dimensions.get('window').width / Dimensions.get('window').height) *
            0.00522,
        });

        Axios.get<ICEPResponse>(
          `https://viacep.com.br/ws/${user?.cep}/json/`,
        ).then((response) => {
          const { localidade, uf } = response.data;
          api
            .get(
              `https://maps.googleapis.com/maps/api/geocode/json?address=${user?.numero_local}+${user?.logradouro},+${localidade},+${uf}&key=AIzaSyAJLnjbwqDj7XpSoB7MORWcQMePWUPQ99c`,
            )
            .then(({ data }) => {
              console.log(data.results[0].geometry.location);

              setFinal({
                latitude: Number(data.results[0].geometry.location.lat),
                longitude: Number(data.results[0].geometry.location.lng),
                latitudeDelta: 0.00522,
                longitudeDelta:
                  (Dimensions.get('window').width /
                    Dimensions.get('window').height) *
                  0.00522,
              });
            });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [user, props]);

  const mapStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{ color: '#263c3f' }],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#6b9a76' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#38414e' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#212a37' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#9ca5b3' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{ color: '#746855' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{ color: '#1f2835' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#f3d19c' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{ color: '#2f3948' }],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#d59563' }],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{ color: '#17263c' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{ color: '#515c6d' }],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#17263c' }],
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        initialRegion={initial}
        region={initial}
        style={styles.map}
        zoomEnabled
        customMapStyle={mapStyle}
      >
        <MapViewDirections
          origin={initial}
          destination={final}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor={colors.primary}
        />

        <Marker coordinate={initial} title={order?.fornecedor?.nome_fantasia}>
          <Image
            resizeMode="center"
            resizeMethod="resize"
            source={
              props?.route?.params?.item?.arqFornecedor?.url
                ? { uri: props?.route?.params?.item?.arqFornecedor?.url }
                : Platform.OS === 'ios'
                ? originios
                : origin
            }
            style={{ width: 60, height: 60, borderRadius: 15 }}
          />
        </Marker>

        <Marker coordinate={final} title={user?.nome}>
          <Image
            resizeMode="center"
            resizeMethod="resize"
            source={Platform.OS === 'ios' ? destinyios : destiny}
            style={{ width: 60, height: 60, borderRadius: 15 }}
          />
        </Marker>
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default Route;
