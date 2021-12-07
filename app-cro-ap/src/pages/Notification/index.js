import React, { Component } from "react";

import {
  View,
  ScrollView,
  Text,
  RefreshControl,
  Dimensions
} from "react-native";

import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/FontAwesome";
import { showMessage } from "react-native-flash-message";
import { styles, agenda } from "./styles";
import Header from "~/components/Header";

import api from "~/services/api";

const ScreenHeight = Dimensions.get("window").height;

export default class Notification extends Component {
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
    ],
    refreshing: false,
    refreshing2: false,
    loadingMenor: false
  };

  fetchDataAgenda = async () => {
    try {
      this.setState({ data: [], loadingMenor: true });

      const { data } = await api.get("/eventos", { timeout: 15000 });
      this.setState({ data }, () => {});
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
      this.setState({ loadingMenor: false });
    }
  };

  componentDidMount = async () => {
    this.fetchDataAgenda();
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

  _onRefresh = () => {
    /* this.setState({ refreshing2: false }); */
    this.fetchDataAgenda() /* .then(() => {
      this.setState({ refreshing2: false });
    }) */;
  };

  render() {
    const { data, loadingMenor } = this.state;
    let mesComparacao = "";
    let mesAtual = "";
    let anoComparacao = "";
    let anoAtual = "";

    return (
      <View style={styles.header}>
        <Header title="Agenda" />

        <View style={styles.container}>
          <Spinner
            visible={loadingMenor}
            color="#8B0000"
            size="large"
            overlayColor="rgba(0, 0, 0, 0)"
          />

          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing2}
                onRefresh={this._onRefresh}
              />
            }
          >
            {data.length === 0 && !loadingMenor && (
              <View
                style={{
                  /* backgroundColor: "#d00", */ alignItems: "center",
                  paddingVertical: "80%"
                }}
              >
                <Text style={styles.semEventos}>
                  {" "}
                  - Não há novos eventos -{" "}
                </Text>
              </View>
            )}

            {data.length > 0 && (
              <View style={agenda.container}>
                {data.map(evento => {
                  if (
                    evento.data.slice(3, 5) !== mesComparacao ||
                    evento.data.slice(6) !== anoComparacao
                  ) {
                    mesComparacao = evento.data.slice(3, 5);
                    anoComparacao = evento.data.slice(6);
                    mesAtual = this.getMonth(`${evento.data.slice(3, 5)}`);
                    anoAtual = anoComparacao;
                    return (
                      <View key={evento.id}>
                        <Text style={agenda.title}>
                          {`${mesAtual}, ${anoAtual}`}
                        </Text>
                        <View style={agenda.evento}>
                          <View style={{ width: "85%" }}>
                            <Text numberOfLines={3} style={agenda.textEvento}>
                              {evento.title}
                            </Text>
                          </View>
                          <View style={{ width: "15%" }}>
                            <Text style={agenda.textData} numberOfLines={1}>
                              {evento.data.slice(0, 5)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    );
                  }
                  return (
                    <View key={evento.id} style={agenda.evento}>
                      <View style={{ width: "85%" }}>
                        <Text numberOfLines={2} style={agenda.textEvento}>
                          {evento.title}
                        </Text>
                      </View>
                      <View style={{ width: "15%" }}>
                        <Text style={agenda.textData} numberOfLines={1}>
                          {evento.data.slice(0, 5)}
                        </Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    );
  }
}
