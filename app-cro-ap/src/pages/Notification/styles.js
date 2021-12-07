import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

export const styles = StyleSheet.create({
  header: {
    flex: 1,
    backgroundColor: colors.background
  },

  container: {
    backgroundColor: colors.background,
    padding: 0,
    paddingBottom: 38,
    paddingTop: 0
  },

  busca: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  cabecalho: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 10
  },

  botao: {
    backgroundColor: colors.primary,
    height: 40,
    width: 190,
    alignItems: "center",
    textAlignVertical: "center",
    borderRadius: 7,
    paddingTop: 9,
    marginTop: 5,
    marginBottom: 20
  },

  botaoFrase: {
    fontSize: 16,
    color: "#fff"
  },

  semEventos: {
    color: "#777",
    fontSize: 16,
    fontWeight: "bold",
    position: "absolute",
    marginTop: 30
  }
});

export const agenda = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 18,
    borderColor: colors.border,
    borderRadius: metrics.baseRadius,
    borderWidth: 1,
    marginTop: 13,
    paddingTop: 0,
    marginHorizontal: 13
  },

  title: {
    fontSize: 19,
    color: "#000",
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 7
  },

  evento: {
    padding: 5,
    backgroundColor: "#efefef",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
    borderRadius: 2
  },

  textEvento: {
    color: "#000",
    paddingLeft: 5,
    paddingRight: 10,
  },

  textData: {
    fontSize:14,
    color: "#000",
    marginLeft: 0,
  },

  faixaVermelha: {
    marginTop: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 40,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },

  faixaVermelhaText: {
    color: "#fff",
    fontSize: 15
  }
});
