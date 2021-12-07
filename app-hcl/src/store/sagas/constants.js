import { Alert } from 'react-native';

import { call, put, select } from 'redux-saga/effects';

import api from '~/services/api';

import ConstantsActions from '../ducks/constants';

export function* getConstants() {
  try {
    const {
      data: {
        pakito_crash,
        payment_released,
        diarist_crash,
        soccer_days,
        weekdays,
      },
    } = yield call(api.get, '/constants');

    const soccer_days_formatted = soccer_days.split(',');
    const daysSoccer = [];

    soccer_days_formatted.forEach((item, index) => {
      daysSoccer.push({ id: item, day: weekdays[index] });
    });

    yield put(
      ConstantsActions.setConstants({
        soccer_days: daysSoccer,
        pakito_crash,
        payment_released,
        diarist_crash,
      })
    );
  } catch (err) {
    Alert.alert('Error', err);
    // Alert.alert('Error', 'Erro ao carregar os dados, tente mais tarde!');
  }
}
