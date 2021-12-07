import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {FlatList} from 'react-native';

import {Container, Content, Title, Info} from './styles';
import {colors} from '~/styles';

export default function Doubts() {
  const [data, setData] = useState([
    {
      id: 1,
      titulo: 'É possivel alterar meu CPF cadastrado no APP?',
      info:
        'fkjhsfdkhfkjsd fjkh sdfksdh fkjsdh fkjsdh fkjsdhf kjsd fhskjdfh skdfh skdfh ksdfh ksdh fksdhf ksjd fhksf hskdf sf skdhf skdfjhsf skdjf hsjkdfh skdfh sjkdfh skjdfh skjdfh skjdfh skdfh skjdfhoawe weh fwe f shdfsd  fsdfh',
      isOpen: false,
    },
    {
      id: 2,
      titulo: 'É possivel alterar meu CPF cadastrado no APP?',
      info:
        'fkjhsfdkhfkjsd fjkh sdfksdh fkjsdh fkjsdh fkjsdhf kjsd fhskjdfh skdfh skdfh ksdfh ksdh fksdhf ksjd fhksf hskdf sf skdhf skdfjhsf skdjf hsjkdfh skdfh sjkdfh skjdfh skjdfh skjdfh skdfh skjdfhoawe weh fwe f shdfsd  fsdfh',
      isOpen: false,
    },
  ]);

  return (
    <Container>
      <FlatList
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => (
          <>
            <Content
              onPress={() =>
                setData(
                  data.map(topico =>
                    topico.id === item.id
                      ? {...topico, isOpen: !item.isOpen}
                      : topico,
                  ),
                )
              }>
              <Title>{item.titulo}</Title>
              <Icon
                color={colors.primary}
                size={22}
                name={item.isOpen ? 'up' : 'down'}
              />
            </Content>
            {item.isOpen && <Info>{item.info}</Info>}
          </>
        )}
      />
    </Container>
  );
}

Doubts.navigationOptions = {
  headerTitle: 'Dúvidas frequêntes',
};
