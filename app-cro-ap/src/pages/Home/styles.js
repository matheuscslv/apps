import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignContent: "center"
  },

  slider: {
    // borderWidth: 1,
    // borderRadius: 2,
    // borderColor: '#ddd',
    // borderBottomWidth: 0,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 3,
    // marginLeft: 5,
    // marginRight: 5,
    // marginTop: 10,
    margin: 10,
    paddingBottom: 25
  },

  titulo: {
    color: "#8B0000",
    fontSize: 26,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 9,
  },

  dotStyle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    padding: 0,
    margin: 0
  },

  botao: {
    backgroundColor: "#8B0000",
    height: 40,
    width: 210,
    alignItems: "center",
    textAlignVertical: "center",
    borderRadius: 4,
    paddingTop: 9,
    marginTop: 5,
    marginBottom: 30
  },

  botaoFrase: {
    fontSize: 17,
    color: "#fff",
    // fontWeight: "bold"
  }
});

export default styles;