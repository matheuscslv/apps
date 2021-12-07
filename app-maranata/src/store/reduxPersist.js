import AsyncStorage from '@react-native-community/async-storage';

import ImmutablePersistenceTransform from './ImmutablePersistenceTransform';

export default {
  key: '@Maranata',
  storage: AsyncStorage,
  whitelist: ['user'],
  transforms: [ImmutablePersistenceTransform],
};
