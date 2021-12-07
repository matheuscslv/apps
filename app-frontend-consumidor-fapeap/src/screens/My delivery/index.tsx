import * as React from 'react';
import { Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

import { useTheme } from 'styled-components';

import Close from './Close';
import Open from './Open';

const initialLayout = { width: Dimensions.get('window').width };

const TabViewExample: React.FC = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Abertos' },
    { key: 'second', title: 'Finalizados' },
  ]);

  const renderScene = SceneMap({
    first: Open,
    second: Close,
  });

  const { colors } = useTheme();

  return (
    <TabView
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: 'white' }}
          style={{ backgroundColor: colors.primary }}
        />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default TabViewExample;
