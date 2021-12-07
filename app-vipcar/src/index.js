import React from 'react';

import '~/config/ReactotronConfig';
import createNavigator from '~/routes';
import store2 from '~/services/storage';
import { YellowBox, StatusBar } from 'react-native';

import api from '~/services/api';

YellowBox.ignoreWarnings(['Warning:', 'Possible', 'VirtualizedList']);

export default class App extends React.Component {
  state = {
    userLogged: false,
  };

  async componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    let data = {
      data: {
        ativo: false
      }
    };

    try {
      data = await api.get(`https://vipcar-api.herokuapp.com/api/v1/validation`);
    } catch (error) { }

    if (data.data.ativo) {
      const user = await store2.get('User');
      if (!!user) {
        await store2.save('User', user);
      } else {
        const userAtivo = await api.post(`/auth/login`, {
          email: '05.paulotarso@gmail.com',
          password: '123456',
        });
        await store2.save('User', userAtivo.data);
      }

      await store2.save('Ativo', { ativo: true });

      this.setState({
        userLogged: true,
      });
    } else {
      await store2.save('Ativo', { ativo: false });
      const user = await store2.get('User');
      this.setState({
        userLogged: !!user,
      });
    }
  };

  render() {
    const { userLogged } = this.state;
    const Routes = createNavigator(userLogged);

    return (
      <>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Routes />
      </>
    );
  }
}
