import React from 'react';
import { View, FlatList, TouchableOpacity, Linking } from 'react-native';

import { Image } from './styles';
import banner from '~/assets/banner.jpeg';

export default function Banners({ data }) {
  return (
    <View style={{ paddingHorizontal: 5, paddingVertical: 5 }}>
      <FlatList
        key={data.id}
        //showsHorizontalScrollIndicator={false}
        data={data}
        horizontal={true}
        renderItem={({ item }) =>
          <TouchableOpacity onPress={() => { Linking.openURL(`${item.url}`) }}>
            <Image source={{ uri: `${item.image}` }} resizeMode={'stretch'} />
          </TouchableOpacity>
        }
      />
    </View>
  );
}
