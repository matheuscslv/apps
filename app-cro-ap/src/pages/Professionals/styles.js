import { StyleSheet, Dimensions } from "react-native";
import { colors, metrics } from "~/styles";

const { width, height } = Dimensions.get("screen");

export const styles = StyleSheet.create({
  header: {
    flex: 1
  },

  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: metrics.basePadding
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 18,
    borderColor: colors.border,
    borderRadius: metrics.baseRadius,
    borderWidth: 1,
    marginTop: 0
  },

  title: {
    color: "#111",
    fontSize: 16,
    marginTop: -8,
    marginBottom: 5,
    fontWeight: "bold"
  },

  picker: {
    fontSize: 10,
    height: 35,
    width: "100%",
    marginTop: -5,
    marginBottom: -5
  },

  dropdownBorder: {
    // borderTopColor: "#333",
    // borderColor: "#ddd",
    // borderWidth: 1,
    marginTop: -30,
    marginBottom: 10
    // padding: 0
  },

  textInput: {
    height: 30,
    borderColor: colors.regular,
    borderRadius: metrics.baseRadius,
    borderWidth: 1,
    margin: 0,
    padding: -5,
    paddingHorizontal: 10
  },

  button: {
    marginBottom: 0,
    marginTop: 20,
    backgroundColor: colors.primary,
    borderRadius: metrics.baseRadius,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    width: "60%"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 15
  }
});

export const results = StyleSheet.create({
  title: {
    height: 34,
    backgroundColor: colors.background,
    marginTop: 0,
    marginBottom: 15,
    borderRadius: metrics.baseRadius,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 7
  },

  titleText: {
    color: "#8B0000",
    fontSize: 18,
    // fontWeight: "bold",
    paddingRight: 10
  },

  titleTextMenor: {
    color: "#888",
    fontSize: 13,
    marginBottom: -3
  },

  listItemContainer: {
    marginTop: 10,
    marginBottom: -10,
    paddingTop: -10,
    padding: 8,
    marginLeft: 8
  },

  listItem: {
    fontSize: 14,
    color: "#000",
    marginTop: -10,
    marginBottom: 20
  },

  empty: {
    marginBottom: 13,
    color: "#999",
    fontSize: 16
  }
});
