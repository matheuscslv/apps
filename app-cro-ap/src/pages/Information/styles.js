import { StyleSheet, Dimensions } from 'react-native';
import { colors, metrics } from '~/styles';

const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: metrics.basePadding,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    marginBottom: 10,
    padding: 18,
    borderColor: colors.border,
    borderWidth: 1,
    marginTop: 0,
    // alignContent: 'center'
    // justifyContent: 'center'
    alignItems: 'center',
    borderRadius: metrics.baseRadius,
  },
});

export default styles;
