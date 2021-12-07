import React, { Component } from "react";

import { View, ScrollView, Text } from "react-native";
import Header from "~/components/Header";
import styles from "./styles";
import Icon from "react-native-vector-icons/Octicons";

import api from '~/services/api';
import HTMLView from 'react-native-htmlview';

export default class Information extends Component {

  state = {
    information: {
      texto: ''
    }
  }

  static navigationOptions = {
    drawerIcon: ({ tintColor }) => <Icon name="info" size={24} color={tintColor} />
  };

  componentDidMount = async () => {
    const { data } = await api.get(`/informacos`);
    this.setState({ information: data.data[0] });
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#eeee", alignContent: "center" }}>
        <Header title="CONHEÇA O CRO" />

        <ScrollView style={styles.container}>
          <View style={styles.card}>
            <HTMLView
              value={this.state.information.texto}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
