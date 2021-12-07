import React, { Component } from 'react';

import {
  View, ScrollView, TouchableHighlight, Text, Linking, Dimensions, Image, FlatList, Button, TouchableOpacity,
} from 'react-native';
import { Searchbar } from 'react-native-paper';
import CheckBox from 'react-native-check-box';

import Modal from 'react-native-modal';

import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import styles from './ProfessionalsMenor/styles';
import Header from '~/components/Header';


const { width, height } = Dimensions.get('screen');

export default class Professionals extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon
        name="vcard-o"
        size={21}
        color={tintColor}
      />
    ),
  }

  state = {
    data: [
      {
        id: 1, logo: '', titulo: 'A C IMAGEM LTDA', cro: '2443', cidade: 'SERRINHA (AP)', telefone: '(75) 92205 - 4321',
      },
      {
        id: 2, logo: '', titulo: 'A C IMAGEM LTDA', cro: '2443', cidade: 'SERRINHA (AP)', telefone: '(75) 92205 - 4321',
      },
      {
        id: 3, logo: '', titulo: 'A C IMAGEM LTDA', cro: '2443', cidade: 'SERRINHA (AP)', telefone: '(75) 92205 - 4321',
      },
      {
        id: 4, logo: '', titulo: 'A C IMAGEM LTDA', cro: '2443', cidade: 'SERRINHA (AP)', telefone: '(75) 92205 - 4321',
      },
      {
        id: 5, logo: '', titulo: 'A C IMAGEM LTDA', cro: '2443', cidade: 'SERRINHA (AP)', telefone: '(75) 92205 - 4321',
      },
      {
        id: 6, logo: '', titulo: 'A C IMAGEM LTDA', cro: '2443', cidade: 'SERRINHA (AP)', telefone: '(75) 92205 - 4321',
      },
    ],
    refreshing: false,
    busca: '',
    loading: false,
    modalVisibleCidade: false,
    modalVisibleEspecialidade: false,

    isCheckedMacapa: true,
    isCheckedSantana: false,
  }

  buscar = () => { }

  loadData = () => { }

  carregar = () => {
    this.setState({ loading: true });
    this.setState({ data: [...this.state.data, ...this.state.data] });
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000);
  }

  render() {
    return (
      <View style={styles.container}>

        <Spinner
          visible={this.state.loading}
          textStyle={{ color: '#8B0000' }}
          textContent="Carregando..."
        />

        <Header title="Profissionais" />

        <Searchbar
          placeholder="Buscar"
          onPress={() => this.buscar()}
          onChangeText={(busca) => { this.setState({ busca }); }}
          value={this.state.busca}
          style={{ marginBottom: 10, marginHorizontal: 10, marginVertical: 10 }}
        />

        <View style={{ alignItems: 'center' }}>
          <View style={styles.busca}>
            <Button color="#8B0000" title="Cidades" onPress={() => { this.setState({ modalVisibleCidade: true }); }} />
          </View>

          <View style={styles.busca}>
            <Button color="#8B0000" title="Especialidades" onPress={() => { this.setState({ modalVisibleEspecialidade: true }); }} />
          </View>
        </View>

        <Modal isVisible={this.state.modalVisibleCidade}>
          <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View style={{ padding: 20, backgroundColor: '#ccc' }}>
              <Text>Escolha a(s) cidade(s)</Text>
            </View>

            <CheckBox
              style={{ padding: 10 }}
              onClick={() => {
                this.setState({
                  isCheckedMacapa: !this.state.isCheckedMacapa,
                });
              }}
              isChecked={this.state.isCheckedMacapa}
              rightText="Macapá"
            />

            <CheckBox
              style={{ padding: 10 }}
              onClick={() => {
                this.setState({
                  isCheckedSantana: !this.state.isCheckedSantana,
                });
              }}
              isChecked={this.state.isCheckedSantana}
              rightText="Santana"
            />

            <Button color="#8B0000" title="Filtrar" onPress={() => { this.setState({ modalVisibleCidade: false }); }} />
          </View>

        </Modal>

        <Modal isVisible={this.state.modalVisibleEspecialidade}>
          <View style={{ backgroundColor: '#fff', flex: 1 }}>
            <View>

              <View style={{ padding: 20, backgroundColor: '#ccc' }}>
                <Text>Escolha a(s) especialidade(s)</Text>
              </View>

              <CheckBox
                style={{ padding: 10 }}
                onClick={() => {
                  this.setState({
                    isCheckedMacapa: !this.state.isCheckedMacapa,
                  });
                }}
                isChecked={this.state.isCheckedMacapa}
                rightText="Cirurgião"
              />

              <View style={{ justifyContent: 'flex-end' }}>
                <Button color="#8B0000" title="Filtrar" onPress={() => { this.setState({ modalVisibleEspecialidade: false }); }} />
              </View>

            </View>

          </View>
        </Modal>

        <ScrollView style={styles.lista}>
          <FlatList
            data={this.state.data}
            onRefresh={() => this.loadData()}
            refreshing={this.state.refreshing}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <TouchableOpacity style={{
                borderWidth: 2,
                borderRadius: 5,
                borderColor: 'rgba(0,0,0,.1)',
                padding: 15,
                marginBottom: 5,
              }}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>

                  <Image
                    style={{ width: 50, height: 50, borderRadius: 100 }}
                    source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
                  />

                  <View>
                    <Text>{item.titulo}</Text>
                    <Text>CRO {item.cro}</Text>
                    <Text>{item.cidade} - {item.telefone}</Text>
                  </View>

                  <TouchableOpacity onPress={() => Linking.openURL(`tel:${item.telefone}`)}>
                    <Icon name="phone" size={30} color="#000" />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />

          <View style={styles.carregar}>
            <Button color="#8B0000" title="Carregar mais" onPress={() => this.carregar()} />
          </View>
        </ScrollView>

      </View>
    );
  }
}
