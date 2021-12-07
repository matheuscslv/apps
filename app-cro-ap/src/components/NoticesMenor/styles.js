import { StyleSheet } from "react-native";
import { colors, metrics } from "~/styles";

export const styles = StyleSheet.create({
  container: {
    padding: 13,
    paddingBottom: 0,
    marginBottom: 0,
    paddingTop: 0
  },

  busca: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  lista: {
    // marginHorizontal: 10,
  },

  carregar: {
    marginBottom: 15,
    marginTop: 10,
    backgroundColor: "#8B0000",
    borderRadius: 7,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    width: "65%"
  },

  carregarText: {
    color: "#FFF",
    fontSize: 15
    // fontWeight: "bold",
  },

  cabecalho: {
    color: "#8B0000",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 13,
    marginLeft: 13
  },

  botao: {
    backgroundColor: "#8B0000",
    height: 40,
    paddingHorizontal: 10,
    alignItems: "center",
    textAlignVertical: "center",
    justifyContent: "center",
    borderRadius: 7,
    marginTop: 5,
    marginBottom: 0
  },

  botaoFrase: {
    fontSize: 16,
    color: "#fff"
  },

  semNoticias: {
    color: "#777",
    fontSize: 16,
    fontWeight: "bold"
  }
});

export const noticia = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    // elevation: 2,
    padding: 18,
    borderColor: colors.border,
    borderRadius: metrics.baseRadius,
    borderWidth: 1
  },

  image: {
    width: "100%",
    height: 150,
    marginBottom: 13
  },

  title: {
    fontSize: 21,
    color: "#000",
    fontWeight: "bold",
    marginTop: -4,
    marginBottom: 7
  },

  date: {
    fontSize: 15,
    // color: "#8B0000",
    color: "#888",
    marginBottom: 5,
    // fontWeight: "bold",
    marginLeft: 6,
    marginBottom: 10
  },

  description: {
    fontSize: 14,
    color: "#666"
    // marginBottom: 3,
  },

  verMais: {
    marginTop: 8,
    fontSize: 15,

    color: "#0000EE"
  },

  searchBar: {
    width: "100%",
    marginVertical: 15
    // marginLeft: 10,
    // marginRight: 10
  }
});
