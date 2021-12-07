import React, { Component } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import Spinner from "react-native-loading-spinner-overlay";
import { styles, noticia } from "./styles";
import Header from "~/components/Header";

import api, { rotaDominio } from "~/services/api";
import { metrics, colors } from "~/styles";

export default class Notices extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="newspaper-o" size={21} color={tintColor} />
    )
  };

  state = {
    noticias: [],

    refreshing: false,
    refreshing2: false,

    loading: false,
    loadingMenor: false,

    page: 2,

    lastPageReached: false,
    erroLazyLoad: false,

    iconVisible: false
  };

  componentDidMount = async () => {
    this.fetchData();
  };

  _onRefresh = () => {
    this.setState({ refreshing2: false });
    this.fetchData().then(() => {
      this.setState({ refreshing2: false });
    });
  };

  fetchData = async () => {
    try {
      this.setState({ loading: true, noticias: [] });

      const { data } = await api.get("/noticias/1", { timeout: 15000 });
      this.setState(
        {
          noticias: data,
          page: 2,
          lastPageReached: false,
          erroLazyLoad: false,
          iconVisible: true
        },
        () => {}
      );
    } catch (e) {
      // console.log(e);
      showMessage({
        type: "danger",
        message: "Algo deu errado...",
        floating: true,
        description: "Verifique sua conexão com a internet",
        // duration: 3000,
        autoHide: false
      });
      this.setState({ noticias: [], iconVisible: false }, () => {});
    } finally {
      this.setState({ loading: false });
    }
  };

  loadMore = async () => {
    const { loadingMenor, lastPageReached, erroLazyLoad } = this.state;
    if (loadingMenor || lastPageReached || erroLazyLoad) return;
    this.setState({ loadingMenor: true });

    try {
      // console.log('page: ' + this.state.page);

      const { data } = await api.get(`/noticias/${this.state.page}`, {
        timeout: 15000
      });

      if (data.length === 0) {
        this.setState({ lastPageReached: true, loadingMenor: false }, () => {});
      }

      this.setState(
        {
          noticias: [...this.state.noticias, ...data],
          page: this.state.page + 1
        },
        () => {}
      );
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
      this.setState({ erroLazyLoad: true }, () => {});
    } finally {
      this.setState({ loadingMenor: false });
    }
  };

  navigateToNoticesDetail = item => {
    this.props.navigation.navigate("Detail", { data: item });
  };

  footer = () => (
    <View style={{ marginVertical: 10 }}>
      {this.state.loadingMenor && (
        <View style={{ marginVertical: 5 }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );

  scrollToIndex = () => {
    this.flatListRef.scrollToIndex({ animated: true, index: 0 });
  };

  emptyList = () => {
    const ScreenHeight = Dimensions.get("window").height;
    return (
      <View
        style={{ /* backgroundColor: "#ff0", */ height: ScreenHeight * 0.8 }}
      >
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Text style={styles.semNoticias}> - Não há novas notícias - </Text>
        </View>
      </View>
    );
  };

  render() {
    const { noticias, loading } = this.state;

    return (
      <View
        style={[
          styles.container,
          { flex: 1, backgroundColor: colors.background }
        ]}
      >
        <Header title="Notícias" />

        {/* <View style={styles.container}> */}
        <Spinner
          visible={loading}
          color={colors.primary}
          size="large"
          overlayColor="rgba(0, 0, 0, 0)"
        />

        {!loading && (
          <FlatList
            style={{ paddingBottom: 30 }}
            ref={ref => {
              this.flatListRef = ref;
            }}
            data={noticias}
            onRefresh={() => this.fetchData()}
            refreshing={this.state.refreshing}
            onEndReached={this.loadMore}
            onEndReachedThreshold={0.7}
            keyExtractor={(item, index) => `noticia${index}`}
            ListFooterComponent={this.footer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={this.emptyList}
            renderItem={({ item }) => (
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
                  <Icon name="calendar" size={20} color={colors.primary} />
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
            )}
          />
        )}
        {/* </View> */}

        {this.state.iconVisible && (
          <TouchableOpacity onPress={this.scrollToIndex} style={styles.fab}>
            <Icon2 name="arrow-upward" size={25} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
