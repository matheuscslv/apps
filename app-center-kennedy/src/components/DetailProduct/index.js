import React, {useState} from 'react';
import {Container} from './styles';
import {View, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import Overview from './Overview';
import Informations from './Informations';
import {colors} from '~/styles';

export default function DetailProduct() {
  const [navigationState, setNavigationState] = useState({
    index: 0,
    routes: [
      {key: 'first', title: 'VISÃO GERAL'},
      {key: 'second', title: 'INFORMAÇÕES'},
    ],
  });

  return (
    <TabView
      navigationState={navigationState}
      renderScene={SceneMap({
        first: Overview,
        second: Informations,
      })}
      onIndexChange={index => setNavigationState({...navigationState, index})}
      initialLayout={{width: Dimensions.get('window').width}}
      renderTabBar={props => (
        <TabBar
          {...props}
          indicatorStyle={{backgroundColor: '#A8E599', height: 4}}
          style={{backgroundColor: colors.primary}}
          labelStyle={{fontWeight: 'bold'}}
        />
      )}
    />
  );
}

DetailProduct.navigationOptions = ({navigation}) => ({
  headerTitle: 'Detalhes',
  headerStyle: {
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
    elevation: 0,
    backgroundColor: colors.primary,
  },
  headerRight: (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={{marginRight: 15}}>
      <Icon name="cart-outline" size={28} color="#fff" />
    </TouchableOpacity>
  ),
});
