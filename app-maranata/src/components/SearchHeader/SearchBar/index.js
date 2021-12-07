import React, { useEffect, useState, useMemo } from 'react';
import { Animated, Dimensions } from 'react-native';

import ActionIcon from '../ActionIcon';
import { HeaderContent, Input } from './styles';

export default function SearchBar({
  setText,
  text,
  onSubmit,
  onClear,
  onHide,
  ...rest
}) {
  const DEVICE_WIDTH = Dimensions.get(`window`).width;

  const [timingHeader] = useState(new Animated.Value(0));

  const lengthText = useMemo(() => text.length, [text.length]);

  useEffect(() => {
    Animated.timing(timingHeader, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start();

    return () => {
      Animated.timing(timingHeader, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    };
  }, [timingHeader]);

  return (
    <HeaderContent
      style={{
        transform: [
          {
            translateX: timingHeader.interpolate({
              inputRange: [0, 100],
              outputRange: [DEVICE_WIDTH, 0],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      <ActionIcon name="chevron-left" onPress={onHide} />
      <Input
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Search..."
        value={text}
        onChangeText={setText}
        returnKeyType="search"
        onSubmitEditing={() => onSubmit(text)}
        {...rest}
      />
      {lengthText > 0 && (
        <ActionIcon
          name="x"
          onPress={() => {
            setText('');
            onClear();
          }}
        />
      )}
    </HeaderContent>
  );
}
