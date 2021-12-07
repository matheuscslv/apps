import React, {useEffect} from 'react';
import {View} from 'react-native';
import {
  Container,
  DepartmentContainer,
  DepartmentText,
  DepartmentIcon,
} from './styles';

export default function SubDepartments({navigation}) {
  const data = navigation.getParam('data');
  return (
    <Container>
      {data.map(({id, name}) => (
        <DepartmentContainer
          key={id}
          onPress={() => navigation.navigate('Results', {name, id})}>
          <DepartmentText>{name}</DepartmentText>
          <DepartmentIcon color="#999" size={25} />
        </DepartmentContainer>
      ))}
    </Container>
  );
}

SubDepartments.navigationOptions = ({navigation}) => ({
  headerTitle: navigation.getParam('name'),
  headerRight: null,
});
