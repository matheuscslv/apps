import { StyleSheet, Dimensions } from "react-native";
import { colors, metrics } from "~/styles";

const { width, height } = Dimensions.get("screen");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 13
  },

  card: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    padding: 18,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: metrics.baseRadius,
    marginTop: 0,
    // alignContent: 'center'
    // justifyContent: 'center'
    alignItems: "center"
  },

  image: {
    marginBottom: 10,
    marginTop: 10
  },

  title: {
    color: "#8B0000",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5
  }
});

export default styles;
