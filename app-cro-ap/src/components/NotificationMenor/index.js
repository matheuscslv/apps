import React, { Component } from "react";

import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  FlatList
} from "react-native";

import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { styles, agenda } from "./styles";
import Header from "~/components/Header";

import * as AgendaActions from "~/store/actions/agenda";

import api from "~/services/api";

import { showMessage } from "react-native-flash-message";

export const fetchDataAgenda = async props => {
  const { agendaLoadingMenor, agendaData } = props;
  try {
    agendaData([]);
    agendaLoadingMenor(true);
    const { data } = await api.get("/eventos", { timeout: 15000 });
    const teste = await agendaData(data.slice(0, 2));
    console.log(data);
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
    agendaLoadingMenor(false);
  }
};

class Notification extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="calendar-check-o" size={21} color={tintColor} />
    )
  };

  state = {
    data: [],
    meses: [
      { id: "01", name: "Janeiro" },
      { id: "02", name: "Fevereiro" },
      { id: "03", name: "Março" },
      { id: "04", name: "Abril" },
      { id: "05", name: "Maio" },
      { id: "06", name: "Junho" },
      { id: "07", name: "Julho" },
      { id: "08", name: "Agosto" },
      { id: "09", name: "Setembro" },
      { id: "10", name: "Outubro" },
      { id: "11", name: "Novembro" },
      { id: "12", name: "Dezembro" }
    ]
  };

  navigateToNotificationMain = () => {
    this.props.navigation.navigate("Agenda");
  };

  componentDidMount = async () => {
    fetchDataAgenda(this.props);
  };

  nomeMuitoGrande = s =>
    s.split("").length > 35
      ? s
          .split("")
          .slice(0, 35)
          .join("") + "..."
      : s;

  getMonth = id =>
    this.state.meses.map(v => (id === v.id ? v.name : "")).join("");

  footer = () => (
    <View style={{ alignItems: "flex-end" }}>
      <TouchableOpacity
        style={styles.botao}
        activeOpacity={0.7}
        onPress={() => this.navigateToNotificationMain()}
      >
        <Text style={{ fontSize: 17, color: "#fff" }}>Ver Agenda Completa</Text>
      </TouchableOpacity>
    </View>
  );

  emptyList = () => {
    this.setState({ emptyList: true });
    return null;
  };

  render() {
    const { data, loadingMenor } = this.props;
    let mesComparacao = "";
    let mesAtual = "";
    let anoComparacao = "";
    let anoAtual = "";

    return (
      <View style={styles.header}>
        <View style={styles.container}>
          <Text style={styles.cabecalho}>Agenda</Text>
          {loadingMenor && (
            <View style={{ marginBottom: 20, marginTop: 10 }}>
              <ActivityIndicator size="large" color="#8B0000" />
            </View>
          )}
          {!loadingMenor && (
            <>
              {data.length === 0 ? (
                <View
                  style={{
                    marginTop: 10,
                    marginBottom: 40,
                    alignItems: "center"
                  }}
                >
                  <Text style={styles.semEventos}>
                    {" "}
                    - Não há novos eventos -{" "}
                  </Text>
                </View>
              ) : (
                <>
                  <View style={agenda.container}>
                    {data.map(item => {
                      if (
                        item.data.slice(3, 5) !== mesComparacao ||
                        item.data.slice(6) !== anoComparacao
                      ) {
                        mesComparacao = item.data.slice(3, 5);
                        anoComparacao = item.data.slice(6);
                        mesAtual = this.getMonth(`${item.data.slice(3, 5)}`);
                        anoAtual = anoComparacao;
                        return (
                          <View key={item.id}>
                            <Text style={agenda.title}>
                              {`${mesAtual}, ${anoAtual}`}
                            </Text>
                            <View style={agenda.evento}>
                              <View style={{ width: "85%" }}>
                                <Text
                                  numberOfLines={3}
                                  style={agenda.textEvento}
                                >
                                  {item.title}
                                </Text>
                              </View>
                              <View style={{ width: "15%" }}>
                                <Text style={agenda.textData} numberOfLines={1}>
                                  {item.data.slice(0, 5)}
                                </Text>
                              </View>
                            </View>
                          </View>
                        );
                      }
                      return (
                        <View key={item.id} style={agenda.evento}>
                          <View style={{ width: "85%" }}>
                            <Text numberOfLines={2} style={agenda.textEvento}>
                              {item.title}
                            </Text>
                          </View>
                          <View style={{ width: "15%" }}>
                            <Text style={agenda.textData} numberOfLines={1}>
                              {item.data.slice(0, 5)}
                            </Text>
                          </View>
                        </View>
                      );
                    })}
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity
                      style={styles.botao}
                      activeOpacity={0.7}
                      onPress={() => this.navigateToNotificationMain()}
                    >
                      <Text style={{ fontSize: 17, color: "#fff" }}>
                        Ver Agenda Completa
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  data: state.agenda.data,
  loadingMenor: state.agenda.loadingMenor
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AgendaActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
