import React, { useState, useEffect, useMemo } from 'react';
import { Dimensions, Animated } from 'react-native';

import ActionIcon from '../ActionIcon';
import { Icon, SuggestionContent, SuggestionItem, Name } from './styles';

export default function SuggestionView({ suggestions, onSubmit, setText }) {
  const DEVICE_HEIGHT = Dimensions.get(`window`).height;
  const [timing] = useState(new Animated.Value(0));

  useEffect(() => {
    if (suggestions.length > 0) {
      Animated.timing(timing, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(timing, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [suggestions, timing]);

  const renderSuggestions = useMemo(
    () =>
      suggestions.map((s) => (
        <SuggestionItem onPress={() => onSubmit(s)} key={s}>
          <Icon name="chevron-right" />
          <Name numberOfLines={2}>{s}</Name>
          <ActionIcon onPress={() => setText(s)} name="arrow-up-left" />
        </SuggestionItem>
      )),
    [onSubmit, setText, suggestions],
  );

  return (
    <SuggestionContent
      style={{
        opacity: timing.interpolate({
          inputRange: [0, 100],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),

        transform: [
          {
            translateY: timing.interpolate({
              inputRange: [0, 100],
              outputRange: [DEVICE_HEIGHT, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      {renderSuggestions}
    </SuggestionContent>
  );
}
