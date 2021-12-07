import React, { Component } from "react";
import { ScrollView, RefreshControl } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import styles from "./styles";

import NotificationMenor from "~/components/NotificationMenor";
import ProfessionalsMenor from "~/pages/Professionals/ProfessionalsMenor";
import NoticesMenor from "~/components/NoticesMenor";
import ComplaintMenor from "~/pages/Complaint/ComplaintMenor";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as NoticiasActions from "~/store/actions/noticias";
import * as AgendaActions from "~/store/actions/agenda";

import { fetchDataNoticias } from "~/components/NoticesMenor";
import { fetchDataAgenda } from "~/components/NotificationMenor";

class Home extends Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="home" size={22} color={tintColor} />
    )
  };

  onLayout = e => {
    this.setState({
      width: e.nativeEvent.layout.width
    });
  };

  state = { refreshing: false };

  _onRefresh = () => {
    this.setState({ refreshing: true });
    this.fetchData().then(() => {
      this.setState({ refreshing: false });
    });
  };

  fetchData = async () => {
    fetchDataNoticias(this.props);
    fetchDataAgenda(this.props);
  };

  render() {
    return (
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
          />
        }
      >
        <NoticesMenor navigation={this.props.navigation} />
        <NotificationMenor navigation={this.props.navigation} />
        <ProfessionalsMenor navigation={this.props.navigation} />
        <ComplaintMenor navigation={this.props.navigation} />
      </ScrollView>
    );
  }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...NoticiasActions, ...AgendaActions }, dispatch);

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(Home);
