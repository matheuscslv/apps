import axios from 'axios';
import { call, put } from 'redux-saga/effects';

import TruckageActions from '../ducks/truckage';

export function* handleTruckage({ payload }) {
  try {
    const { address, numero } = payload;

    console.log(address);

    const response = yield call(
      axios.get,
      'https://maps.googleapis.com/maps/api/distancematrix/json?',
      {
        params: {
          key: 'AIzaSyDkUI2f5wkf8MuAV_BgLjfsqbYfIlulJfQ',
          destinations: `${address?.logradouro}, ${numero}, ${address?.bairro}`,
          origins: '0.0347839,-51.068695',
          mode: 'driving',
        },
      }
    );

    const [destination_addresses, origin_addresses, [rows]] = response.data;

    const [distance] = rows.elements;

    const formmatedDistance = String(distance.value)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    yield put(
      TruckageActions.getTruckageFailure({
        origin: origin_addresses,
        destination: destination_addresses,
        distance: formmatedDistance,
        value: Number(formmatedDistance) * 15,
      })
    );
  } catch (err) {
    yield put(TruckageActions.getTruckageFailure(err));
  }
}
