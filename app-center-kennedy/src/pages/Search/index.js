import React from 'react';
import {
  Dimensions,
  AppRegistry,
  StyleSheet,
  View,
  Text,
  Button,
  StatusBar,
} from 'react-native';
import SearchHeader from 'react-native-search-header';
import {colors} from '~/styles';

const DEVICE_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
  status: {
    zIndex: 1,
    elevation: 2,
    width: DEVICE_WIDTH,
    height: 21,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: DEVICE_WIDTH,
    height: 56,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: colors.primary,
    paddingHorizontal: 10,
  },
  label: {
    flexGrow: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    marginVertical: 8,
    paddingVertical: 3,
    color: '#f5fcff',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 40,
    marginTop: 40,
    borderRadius: 2,
    backgroundColor: '#ff5722',
  },
  suggestion: {
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingHorizontal: 15,
  },
});

export default function Search({navigation}) {
  const searchHeaderRef = React.useRef(null);

  function searchItem(text) {
    console.log(text);
    navigation.navigate('Results', {name: text});
  }

  return (
    <>
      <SearchHeader
        ref={searchHeaderRef}
        visibleInitially={true}
        placeholder="Ex: Geladeira"
        placeholderColor="#999"
        style={styles}
        onClear={() => {
          navigation.navigate('Home');
        }}
        onSearch={e => {
          const {text} = e.nativeEvent;
          searchItem(text);
        }}
        onGetAutocompletions={async text => {
          if (text) {
            const response = await fetch(
              `http://suggestqueries.google.com/complete/search?client=firefox&q=${text}`,
              {
                method: 'get',
              },
            );
            const data = await response.json();
            return data[1];
          } else {
            return [];
          }
        }}
        onHide={() => {
          navigation.navigate('Home');
        }}
      />
    </>
  );
}

Search.navigationOptions = {
  header: null,
};
