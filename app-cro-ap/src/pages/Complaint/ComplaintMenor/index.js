import React, { Component } from "react";

import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import icon from "~/assets/denuncia_icon.png";

export default class ComplaintMenor extends Component {
  navigateComplaintMain = () => {
    this.props.navigation.navigate("Denuncie");
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={() => this.navigateComplaintMain()}>
          <View style={styles.image}>
            <Image style={{ width: 100, height: 100 }} source={icon} />
          </View>

          <View>
            <Text style={styles.title}>Denuncie</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
