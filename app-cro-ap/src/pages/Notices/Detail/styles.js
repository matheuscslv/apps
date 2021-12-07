import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignContent: 'center',
    padding: 13,
    paddingBottom: 0,
    paddingTop: 0,
  },

  cabecalho: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 13,
  },
});

export const noticia = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    // elevation: 2,
    padding: 18,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: metrics.baseRadius,
    marginTop: 13,
  },

  image: {
    borderColor: '#000',
    width: '100%',
    height: 150,
    marginTop: 15,
  },

  title: {
    fontSize: 21,
    color: '#000',
    fontWeight: 'bold',
    marginTop: -4,
    marginBottom: 7,
  },

  date: {
    fontSize: 15,
    // color: "#8B0000",
    color: '#888',
    marginBottom: 5,
    // fontWeight: "bold",
    marginLeft: 6,
    marginBottom: 35,
  },

  description: {
    fontSize: 30,
    color: '#666',
    marginBottom: 30,
    textAlign: 'justify',
  },
});
