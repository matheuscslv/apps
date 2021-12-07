import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {
  Container,
  Button,
  CardContainer,
  InfoAdress,
  Street,
  Neighborhood,
  Zip,
} from './styles';
import {colors} from '~/styles';
import FormAdresse from './FormAdresse';

export default function Adresses() {
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [adress, setAdress] = useState([
    {
      id: 1,
      street: 'Avenida rio branco',
      zipcode: '68925153',
      neighborhood: 'hospitalidade',
      state: 'AP',
      city: 'Macapa',
      isDefault: false,
    },
    {
      id: 2,
      street: 'R. Jovino Dinoá',
      zipcode: '68900-075',
      neighborhood: 'Central',
      state: 'AP',
      city: 'Macapa',
      isDefault: true,
    },
  ]);

  function renderItem({item}) {
    return (
      <CardContainer isDefault={item.isDefault}>
        <InfoAdress>
          <Street>{item.street}</Street>
          <Neighborhood>{item.neighborhood}</Neighborhood>
          <Zip>{item.zipcode}</Zip>
        </InfoAdress>
        <TouchableOpacity onPress={() => editAderess(item)}>
          <Icon name="edit" size={28} color={colors.primary} />
        </TouchableOpacity>
      </CardContainer>
    );
  }

  function editAderess(adrss) {
    setEditing(adrss);
    setModal(true);
  }

  return (
    <Container>
      <Modal transparent animationType="fade" visible={modal}>
        <FormAdresse
          setEditing={setEditing}
          editForm={editing}
          setModal={setModal}
        />
      </Modal>
      <FlatList data={adress} renderItem={renderItem} />
      <Button
        onPress={() => {
          setModal(true);
        }}>
        <Icon name="plus" color="#fff" size={40} />
      </Button>
    </Container>
  );
}

Adresses.navigationOptions = ({navigation}) => ({
  headerTitle: 'Seus endereços',
  headerStyle: {
    shadowOpacity: 0,
    shadowOffset: {
      height: 0,
    },
    shadowRadius: 0,
    elevation: 0,
    backgroundColor: colors.primary,
  },
});
