import React, { Component } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import icon from "~/assets/profissionais_icon.png";

export default class ProfessionalsMenor extends Component {
  navigateProfissionalsMain = () => {
    this.props.navigation.navigate("Profissionais");
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => this.navigateProfissionalsMain()}>
          <View style={styles.image}>
            <Image style={{ width: 100, height: 100 }} source={icon} />
          </View>

          <View>
            <Text style={styles.title}>Profissionais</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
