import React from 'react';
import {Image} from 'react-native';
import {withNavigation} from 'react-navigation';

import {Card, CardImage, CardText} from './styles';

function ButtonCompany({item, navigation}) {
  return (
    <Card onPress={() => navigation.navigate('Results', {name: item.name})}>
      <CardImage>
        <Image
          style={{height: 70, width: 70, borderRadius: 90}}
          resizeMode="contain"
          source={{
            uri:
              'https://electrolux.vteximg.com.br/arquivos/electrolux-facebook-shared.jpg?v=637062505004970000',
          }}
        />
      </CardImage>
      <CardText>{item.name}</CardText>
    </Card>
  );
}

export default withNavigation(ButtonCompany);
