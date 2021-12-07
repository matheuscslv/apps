import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 45,
    borderRadius: 2,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cacaca',
    paddingVertical: 4,
  },
  modalContainer: {
    paddingTop: 16,
    backgroundColor: '#fff',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
    width: '100%',
    textAlign: 'center',
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#cacaca',
  },
  inputKeyword: {
    height: 40,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#cacaca',
    paddingLeft: 8,
    marginHorizontal: 24,
    marginTop: 16,
  },
  buttonWrapper: {
    marginVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    height: 36,
    flex: 1,
  },
  selectedTitlte: {
    fontSize: 14,
    color: 'gray',
    flex: 1,
  },
  tagWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  listOption: {
    paddingHorizontal: 24,
    paddingTop: 1,
    marginTop: 16,
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#eaeaea',
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  itemIcon: {
    width: 30,
    textAlign: 'right',
  },
  empty: {
    fontSize: 16,
    color: 'gray',
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 16,
  },
});

export default styles;
