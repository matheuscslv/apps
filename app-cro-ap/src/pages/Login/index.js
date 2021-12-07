import React, { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ActivityIndicator, Alert } from "react-native";
import { useDispatch } from "react-redux";
import { StackActions, NavigationActions } from "react-navigation";
import {
  Container,
  Logo,
  Form,
  InputEmail,
  InputPassword,
  Login,
  TextButton,
  BoxBottom,
  BoxBottom2,
  Button,
  Span,
  Error,
  Header,
  BackButton
} from "./styles";
import logo from "~/assets/logo.png";
import api, { rotaDominio } from "~/services/api";
import { colors } from "~/styles";
import store from "~/services/storage";

export default function Loginn(props) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [dataSecret, setSecret] = useState({
    grant_type: "password",
    client_id: "11",
    client_secret: "APwHbGEu2UscTmHx60o0eevg08BzT42TYbTCptiH",
    scope: ""
  });
  const apiLogin = axios.create();

  async function handleLogin(values) {
    try {
      setLoading(true);

      const { data } = await apiLogin.post(`${rotaDominio}/oauth/token`, {
        ...dataSecret,
        ...values
      });
      const dadosUsuario = await api.post("/user", {
        login: values.username
      });
      store.save("User@Profile", {
        ...dadosUsuario.data,
        token: data.access_token
      });

      dispatch({
        type: "SET_DATA",
        token: `Bearer ${data.access_token}`,
        data: dadosUsuario.data
      });
      resetAction = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "User" })]
      });
      props.navigation.dispatch(resetAction);
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        Alert.alert(
          "Erro",
          data.message ? data.message : "Servidor fora do ar!"
        );
      } else {
        Alert.alert("Erro", error);
        // "Verifique sua conexão com a internet!"
      }

      setLoading(false);
    }
  }

  const Validation = Yup.object().shape({
    username: Yup.string()
      .email("E-mail inválido")
      .required("Campo obrigatório!"),
    password: Yup.string().required("Campo obrigatório!")
  });

  return (
    <Container>
      <BackButton onPress={() => props.navigation.goBack()}>
        <Icon name="arrow-left" size={24} color={colors.primary} />
      </BackButton>
      <Formik
        validationSchema={Validation}
        validateOnBlur
        validateOnChange={!false}
        initialValues={{ username: "", password: "" }}
        onSubmit={values => handleLogin(values)}
        render={({
          values,
          handleSubmit,
          handleChange,
          errors,
          isValid,
          handleBlur,
          touched
        }) => (
          <>
            <Header>
              <Logo source={logo} />
            </Header>
            <Form>
              <InputEmail
                onBlur={handleBlur("username")}
                error={errors.username && touched.username}
                autoCapitalize="none"
                onChangeText={handleChange("username")}
                value={values.username}
                placeholder="Email"
                placeholderTextColor="#8B0000"
              />
              {!!errors.username && !!touched.username && (
                <Error> {errors.username} </Error>
              )}
              <InputPassword
                onBlur={handleBlur("password")}
                error={errors.password && touched.password}
                autoCapitalize="none"
                onChangeText={handleChange("password")}
                value={values.password}
                placeholder="Senha"
                placeholderTextColor="#8B0000"
                secureTextEntry
                style={{ marginTop: 15 }}
              />

              {!!errors.password && touched.password && (
                <Error> {errors.password} </Error>
              )}
            </Form>
            <BoxBottom>
              <TextButton onPress={isValid ? handleSubmit : null}>
                {" "}
                Entrar{" "}
              </TextButton>
              <Login onPress={handleSubmit} disabled={!isValid}>
                {loading ? (
                  <ActivityIndicator size={"small"} color="#fff" />
                ) : (
                  <Icon name="arrow-right" size={22} color="#fff" />
                )}
              </Login>
            </BoxBottom>
          </>
        )}
      />
      <BoxBottom2>
        <Button>
          <Span> Esqueceu a senha? </Span>
        </Button>
      </BoxBottom2>
    </Container>
  );
}

Loginn.navigationOptions = {
  header: null
};
