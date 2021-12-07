import React, { Component } from "react";

import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { styles, noticia } from "./styles";

import api from "~/services/api";

import * as NoticiasActions from "~/store/actions/noticias";
import { colors } from "~/styles";

export const fetchDataNoticias = async props => {
  const { noticiasLoadingMenor, noticiasData } = props;
  try {
    noticiasData([]);
    noticiasLoadingMenor(true);

    const { data } = await api.get("/noticias_home", { timeout: 15000 });

    const teste = await noticiasData(data.slice(0, 5));
  } catch (e) {
    // console.log(e);
    showMessage({
      type: "danger",
      message: "Algo deu errado...",
      floating: true,
      description: "Verifique sua conexão com a internet",
      // duration: 3000
      autoHide: false
    });
  } finally {
    noticiasLoadingMenor(false);
  }
};

class Notices extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="newspaper-o" size={21} color={tintColor} />
    )
  };

  componentDidMount = async () => {
    fetchDataNoticias(this.props);
  };

  navigateToNoticesMain = () => {
    this.props.navigation.navigate("Notícias");
  };

  navigateToNoticesDetail = item => {
    this.props.navigation.navigate("Detail", { data: item });
  };

  render() {
    const { loadingMenor, noticias } = this.props;

    return (
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
          alignContent: "center"
        }}
      >
        <Text style={styles.cabecalho}>Notícias</Text>

        <View style={styles.container}>
          {loadingMenor && (
            <View style={{ marginBottom: 20 }}>
              <ActivityIndicator size="large" color="#8B0000" />
            </View>
          )}

          {noticias.length === 0 && !loadingMenor && (
            <View
              style={{ marginTop: 0, marginBottom: 30, alignItems: "center" }}
            >
              <Text style={styles.semNoticias}>
                {" "}
                - Não há novas notícias -{" "}
              </Text>
            </View>
          )}

          <View>
            {noticias.map(item => (
              <View key={`noticia_${item.id}`}>
                <TouchableOpacity
                  activeOpacity={0.7}
                  style={noticia.container}
                  onPress={() => this.navigateToNoticesDetail(item)}
                >
                  {item.media.length > 0 && (
                    <View syle={{ alignContent: "center" }}>
                      <Image
                        style={noticia.image}
                        source={{
                          uri: String(item.media[0].url).replace(
                            "localhost",
                            "cro.msbtec.com.br"
                          )
                        }}
                      />
                    </View>
                  )}

                  <Text style={noticia.title}>{item.titulo}</Text>
                  <View style={{ flexDirection: "row" }}>
                    <Icon name="calendar" size={20} color="#8B0000" />
                    <Text style={noticia.date}>{item.dt_publicacao}</Text>
                  </View>
                  <Text style={noticia.description}>{item.resumo}</Text>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text
                      style={noticia.verMais}
                      onPress={() => this.navigateToNoticesDetail(item)}
                    >
                      + VER MAIS
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          {noticias.length !== 0 && !loadingMenor && (
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                style={styles.botao}
                activeOpacity={0.7}
                onPress={() => this.navigateToNoticesMain()}
              >
                <Text style={{ fontSize: 17, color: "#fff" }}>
                  Ver Mais Notícias
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  noticias: state.noticias.data,
  loadingMenor: state.noticias.loadingMenor
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(NoticiasActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notices);
