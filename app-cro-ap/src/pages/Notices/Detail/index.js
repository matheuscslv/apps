import React, { Component } from "react";

import {
  View,
  ScrollView,
  Text,
  Dimensions,
  TextInput,
  FlatList,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import HTMLView from "react-native-htmlview";
import Header from "~/components/Header";
import { styles, noticia } from "./styles";

import { colors } from "~/styles";

export default class Detail extends Component {
  state = {
    data: this.props.navigation.getParam("data"),
    refreshing: false,
    busca: ""
  };

  componentDidMount = () => {
    // const data = this.state.data;
    // console.log(data);
    // if (String(data.image) !== "null" || String(data.image).trim() !== "") {
    //   this.setState({ image: true });
    // }
  };

  render() {
    // console.log(data);
    // console.log(!data);
    // console.log(!!data);
    const { data } = this.state;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignContent: "center"
        }}
      >
        <Header title="Notícias" />

        <ScrollView style={styles.container}>
          <View style={noticia.container}>
            <Text style={noticia.title}>{data.titulo}</Text>

            <View style={{ flexDirection: "row" }}>
              <Icon name="calendar" size={20} color={colors.primary} />
              <Text style={noticia.date}>{data.dt_publicacao}</Text>
            </View>

            <HTMLView value={data.texto} stylesheet={noticia.description} />
            <View styles={noticia.description} />

            {data.media.length > 0 &&
              data.media.map(item => (
                <View syle={{ alignContent: "center" }}>
                  <Image
                    style={noticia.image}
                    source={{
                      uri: String(item.url).replace(
                        "localhost",
                        "cro.msbtec.com.br"
                      )
                    }}
                  />
                </View>
              ))}
            <View style={{ marginBottom: 15 }} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
