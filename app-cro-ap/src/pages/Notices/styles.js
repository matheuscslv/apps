import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

export const styles = StyleSheet.create({
  container: {
    padding: 0,
    paddingBottom: 0,
    marginBottom: 0,
    paddingTop: 0,
  },

  busca: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  carregar: {
    marginBottom: 15,
    marginTop: 10,
    backgroundColor: colors.primary,
    borderRadius: 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    width: '65%',
  },

  carregarText: {
    color: '#FFF',
    fontSize: 15,
    // fontWeight: "bold",
  },

  cabecalho: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 13,
    marginLeft: 13,
  },

  botao: {
    backgroundColor: colors.primary,
    height: 40,
    width: 180,
    alignItems: 'center',
    textAlignVertical: 'center',
    borderRadius: 7,
    paddingTop: 9,
    marginTop: 5,
    marginBottom: 0,
  },

  botaoFrase: {
    fontSize: 16,
    color: '#fff',
  },

  semNoticias: {
    color: '#777',
    fontSize: 16,
    fontWeight: 'bold',
  },

  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    elevation: 8,
  },
});

export const noticia = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 13,
    marginBottom: -3,
    marginHorizontal: 13,
    padding: 18,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: metrics.baseRadius,
  },

  image: {
    width: '100%',
    height: 150,
    marginBottom: 13,
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
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'justify',
    // marginBottom: 3,
  },

  verMais: {
    marginTop: 8,
    fontSize: 15,
    color: '#0000EE',
  },

  searchBar: {
    width: '100%',
    marginVertical: 15,
    // marginLeft: 10,
    // marginRight: 10
  },
});
