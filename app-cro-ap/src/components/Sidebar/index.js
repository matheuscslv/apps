import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Alert
} from "react-native";
import { DrawerItems, StackActions, NavigationActions } from "react-navigation";
import { View } from "react-native";
import { Header, User, Email, Avatar, Login, LogoutView } from "./styles";
import AwesomeAlert from "react-native-awesome-alerts";
import store from "~/services/storage";
import api from "~/services/api";
import { colors } from "~/styles";

export default function Sidebar(props) {
  const dispatch = useDispatch();
  const logged = useSelector(state => state.user.data);
  const { items, ...rest } = props;
  const [confirmLogout, setLogout] = useState(false);
  const [itemsSideBar, setItems] = useState(items);

  function profile() {
    if (!logged) {
      props.navigation.navigate("Login");
    } else {
      Alert.alert("Deseja mesmo sair?", "Esta ação não pode ser revertida!", [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sair",
          onPress: async () => {
            await store.delete("User@Profile");
            props.navigation.dispatch(
              StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: "User" })]
              })
            );
            dispatch({
              type: "SET_DATA",
              token: "user.token",
              data: false
            });
          }
        }
      ]);
    }
  }

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (!logged) {
      setItems(items);
      setItems(items.filter(item => item.key !== "Parcerias"));
    } else {
      setItems(items);
    }
  }, [logged]);

  async function checkUser() {
    const user = await store.get("User@Profile");
    if (user) {
      try {
        const { data } = await api.post("/user", { login: user.email });
        //console.log(user);
        if (user) {
          dispatch({
            type: "SET_DATA",
            token: user.token,
            data
          });
        }
      } catch (error) {
        if (error.response) {
          const { data } = error.response;
          Alert.alert(
            "Erro",
            data.message ? data.message : "Servidor fora do ar!"
          );
        } else {
          console.tron.log(error);
          Alert.alert("Erro", "Verifique sua conexão com a internet!");
        }
      }
    }
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableOpacity onPress={profile}>
          <Header>
            {logged ? (
              <LogoutView style={{ marginHorizontal: 25 }}>
                {/* <Avatar source={{ uri: 'https://avatars1.githubusercontent.com/u/38564520?v=4' }} /> */}
                <View style={{ paddingRight: 30 }}>
                  <User>{logged ? logged.name : "Indefinido!"} </User>
                  <Email numberOfLines={2}>
                    {logged ? logged.email : "Indefinido!"}
                  </Email>
                </View>
                <Icon size={22} name="logout" color={colors.primary} />
              </LogoutView>
            ) : (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Avatar
                  source={{
                    uri:
                      "https://t3.ftcdn.net/jpg/01/44/52/94/240_F_144529471_9LhgvhXAYfy50nDjir1aadtMuiMiYUDX.jpg"
                  }}
                />
                <Login> Entrar </Login>
              </View>
            )}
          </Header>
        </TouchableOpacity>
        <ScrollView>
          <DrawerItems items={itemsSideBar} {...rest} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
