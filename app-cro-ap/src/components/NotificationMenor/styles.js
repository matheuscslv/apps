import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

export const styles = StyleSheet.create({
  header: {
    flex: 1
  },

  container: {
    backgroundColor: "#eeee",
    alignContent: "center",
    padding: 13,
    paddingBottom: 0,
    paddingTop: 0
  },

  busca: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  cabecalho: {
    color: "#8B0000",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 0,
    marginTop: 10
  },
  // 186.216.174.37
  botao: {
    backgroundColor: "#8B0000",
    height: 40,
    paddingHorizontal: 10,
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    borderRadius: 7,
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
    fontWeight: "bold"
  }
});

export const agenda = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 18,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: metrics.baseRadius,
    marginTop: 13,
    paddingTop: 0
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
    paddingRight: 10
  },

  textData: {
    fontSize: 14,
    color: "#000",
    marginLeft: 0
  },

  faixaVermelha: {
    marginTop: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: 40,
    backgroundColor: "#8B0000",
    justifyContent: "center",
    alignItems: "center"
  },

  faixaVermelhaText: {
    color: "#fff",
    fontSize: 15
  }
});
