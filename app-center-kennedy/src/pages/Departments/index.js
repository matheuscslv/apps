import React, {useState} from 'react';
import {ScrollView} from 'react-native';

import {
  Container,
  DepartmentContainer,
  DepartmentIcon,
  DepartmentText,
} from './styles';
import {FlatList} from 'react-native-gesture-handler';

export default function Departments({navigation}) {
  const [colors, setColors] = useState([
    '#f324',
    '#f36',
    '#C3C',
    '#FC6',
    '#9C0',
    '#1E90FF',
    '#4682B4',
    '#708090',
    '#008B8B',
    '#66CDAA',
    '#2F4F4F',
    '#808000',
    '#A0522D',
    '#DEB887',
    '#7B68EE',
    '#DA70D6',
    '#DB7093',
    '#CD5C5C',
    '#A52A2A',
    '#D8BFD8',
  ]);

  const [departments, setDepartiments] = useState([
    {
      id: 1,
      icon: 'cellphone-iphone',
      name: 'Celular e Smartphone',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 2,
      icon: 'washing-machine',
      name: 'Eletrodomésticos',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 3,
      icon: 'monitor',
      name: 'TV e Vídeo',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 4,
      icon: 'laptop-mac',
      name: 'Informática',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 5,
      icon: 'sofa',
      name: 'Móveis',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 6,
      icon: 'bed-empty',
      name: 'Colchões',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 7,
      icon: 'printer-wireless',
      name: 'Acessórios e Tecnologia',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 8,
      icon: 'baby-buggy',
      name: 'Bebês',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 9,
      icon: 'bike',
      name: 'Esporte e Lazer',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 10,
      icon: 'pipe-leak',
      name: 'Casa e Construção',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 11,
      icon: 'tshirt-crew-outline',
      name: 'Moda',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 12,
      icon: 'bed-empty',
      name: 'Colchões',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
    {
      id: 13,
      icon: 'bed-empty',
      name: 'Colchões',
      subDepartments: [
        {
          id: 1,
          name: 'Smartphone',
        },
        {
          id: 2,
          name: 'iPhone',
        },
        {
          id: 3,
          name: 'Samsung Galaxy',
        },
        {
          id: 4,
          name: 'Motorola',
        },
        {
          id: 5,
          name: 'Xiaomi',
        },
        {
          id: 6,
          name: 'LG',
        },
      ],
    },
  ]);

  function renderItem({item}) {
    return (
      <DepartmentContainer
        onPress={() =>
          navigation.navigate('SubDepartments', {
            name: item.name,
            data: item.subDepartments,
          })
        }>
        <DepartmentIcon
          name={item.icon}
          size={25}
          color={colors[Math.floor(Math.random() * colors.length)]}
        />
        <DepartmentText> {item.name} </DepartmentText>
      </DepartmentContainer>
    );
  }

  return (
    <Container>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={departments}
        keyExtractor={item => String(item.id)}
        renderItem={renderItem}
      />
    </Container>
  );
}

Departments.navigationOptions = ({navigation}) => ({
  headerRight: null,
});
