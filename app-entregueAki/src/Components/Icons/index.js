import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation from 'react-native-vector-icons/Foundation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Zocial from 'react-native-vector-icons/Zocial';
import { colors } from '~/styles';

export default function Icon(type, name, size, color) {
  switch (type.toUpperCase()) {
    case 'ANTDESIGN':
      return <AntDesign name={name} size={size} color={color} />;
    case 'ENTYPO':
      return <Entypo name={name} size={size} color={color} />;
    case 'EVILICONS':
      return <EvilIcons name={name} size={size} color={color} />;
    case 'FEATHER':
      return <Feather name={name} size={size} color={color} />;
    case 'FONTAWESOME':
      return <FontAwesome name={name} size={size} color={color} />;
    case 'FONTAWESOME5':
      return <FontAwesome5 name={name} size={size} color={color} />;
    case 'FONTAWESOME5PRO':
      return <FontAwesome5Pro name={name} size={size} color={color} />;
    case 'FONTISTO':
      return <Fontisto name={name} size={size} color={color} />;
    case 'FOUNDATION':
      return <Foundation name={name} size={size} color={color} />;
    case 'IONICONS':
      return <Ionicons name={name} size={size} color={color} />;
    case 'MATERIALCOMMUNITYICONS':
      return <MaterialCommunityIcons name={name} size={size} color={color} />;
    case 'MATERIALICONS':
      return <MaterialIcons name={name} size={size} color={color} />;
    case 'OCTICONS':
      return <Octicons name={name} size={size} color={color} />;
    case 'SIMPLELINEICONS':
      return <SimpleLineIcons name={name} size={size} color={color} />;
    case 'ZOCIAL':
      return <Zocial name={name} size={size} color={color} />;
    default:
      return <MaterialCommunityIcons name="store" size={30} color={colors.primary} />;
  }
}
