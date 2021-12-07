import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  FlatList,
  TextInput,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import PropTypes from 'prop-types';

import Button from './lib/Button';
import TagItem from './lib/TagItem';
import utilities from './lib/utilities';
import styles from './styles';

const { height } = Dimensions.get('window');
const INIT_HEIGHT = height * 0.6;

export default function PickerOptions(props) {
  const [defaultState, setDefaulState] = useState({
    show: false,
    preSelectedItem: [],
    selectedItem: [],
    data: [],
  });
  const [keyword, setKeyword] = useState('');

  const [animatedHeight] = useState(new Animated.Value(INIT_HEIGHT));

  useEffect(() => {
    const preSelectedItem = [];
    const { data } = props;

    data.forEach(item => {
      if (item.checked) {
        preSelectedItem.push(item);
      }
    });
    setDefaulState(oldData => ({ ...oldData, data, preSelectedItem }));
  }, [props]);

  function dataRender() {
    const { data } = defaultState;
    const listMappingKeyword = [];
    data.forEach(item => {
      if (
        utilities
          .changeAlias(item.name)
          .includes(utilities.changeAlias(keyword))
      ) {
        listMappingKeyword.push(item);
      }
    });
    return listMappingKeyword;
  }

  function defaultFont() {
    const { defaultFontName } = props;
    return defaultFontName ? { fontFamily: defaultFontName } : {};
  }

  function cancelSelection() {
    const { data, preSelectedItem } = defaultState;
    data.forEach(item => {
      item.checked = false;
      for (const _selectedItem of preSelectedItem) {
        if (item.id === _selectedItem.id) {
          item.checked = true;
          break;
        }
      }
    });
    setDefaulState(oldData => ({
      ...oldData,
      data,
      show: false,
      selectedItem: preSelectedItem,
    }));
    setKeyword('');
  }

  function onItemSelected(item, isSelectSingle) {
    const selectedItem = [];
    const { data } = defaultState;
    item.checked = !item.checked;
    for (const index in data) {
      if (data[index].id === item.id) {
        data[index] = item;
      } else if (isSelectSingle) {
        data[index].checked = false;
      }
    }
    data.forEach(item => {
      if (item.checked) selectedItem.push(item);
    });
    setDefaulState(oldData => ({
      ...oldData,
      data,
      selectedItem,
    }));
  }

  function keyExtractor(item, idx) {
    return idx.toString();
  }

  function renderItem({ item, idx }) {
    const {
      colorTheme,
      isSelectSingle,
      itemWrapperStyle,
      itemTextWrapperStyle,
      iconColorItemSected,
    } = props;
    return (
      <TouchableOpacity
        key={idx}
        onPress={() => onItemSelected(item, isSelectSingle)}
        activeOpacity={0.7}
        style={[styles.itemWrapper, itemWrapperStyle]}
      >
        <Text style={[styles.itemText, defaultFont(), itemTextWrapperStyle]}>
          {item.name}
        </Text>
        <Icon
          style={styles.itemIcon}
          name={item.checked ? 'check-circle-outline' : 'radiobox-blank'}
          color={item.checked ? iconColorItemSected : colorTheme}
          size={22}
        />
      </TouchableOpacity>
    );
  }

  function renderEmpty() {
    const { listEmptyTitle } = props;
    return <Text style={[styles.empty, defaultFont()]}>{listEmptyTitle}</Text>;
  }

  function closeModal() {
    setDefaulState(oldData => ({ ...oldData, show: false }));
  }

  function showModal() {
    setDefaulState(oldData => ({ ...oldData, show: true }));
  }

  const {
    style,
    modalStyle,
    title,
    disabled,
    onSelect,
    onRemoveItem,
    popupTitle,
    colorTheme,
    isSelectSingle,
    cancelButtonText,
    selectButtonText,
    searchPlaceHolderText,
    searchInputStyle,
    selectedTitleStyle,
    buttonTextStyle,
    buttonStyle,
    showSearchBox,
  } = props;
  const { show, selectedItem, preSelectedItem } = defaultState;

  return (
    <TouchableOpacity
      onPress={showModal}
      activeOpacity={0.7}
      style={[styles.container, style]}
      disabled={disabled}
    >
      <Modal
        onBackdropPress={closeModal}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        useNativeDriver
        animationInTiming={300}
        animationOutTiming={300}
        hideModalContentWhileAnimating
        isVisible={show}
      >
        <Animated.View
          style={[
            styles.modalContainer,
            modalStyle,
            { height: animatedHeight },
          ]}
        >
          <View>
            <Text style={[styles.title, defaultFont(), { color: colorTheme }]}>
              {popupTitle || title}
            </Text>
          </View>
          <View style={styles.line} />
          {showSearchBox ? (
            <TextInput
              underlineColorAndroid="transparent"
              returnKeyType="done"
              placeholderTextColor="#777"
              style={[styles.inputKeyword, defaultFont(), searchInputStyle]}
              placeholder={searchPlaceHolderText}
              selectionColor={colorTheme}
              onChangeText={setKeyword}
              onFocus={() => {
                Animated.spring(animatedHeight, {
                  toValue:
                    INIT_HEIGHT + (Platform.OS === 'ios' ? height * 0.2 : 0),
                  friction: 7,
                }).start();
              }}
              onBlur={() => {
                Animated.spring(animatedHeight, {
                  toValue: INIT_HEIGHT,
                  friction: 7,
                }).start();
              }}
            />
          ) : null}
          <FlatList
            style={styles.listOption}
            data={dataRender() || []}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={renderEmpty}
          />

          <View style={styles.buttonWrapper}>
            <Button
              defaultFont={defaultFont()}
              onPress={cancelSelection}
              title={cancelButtonText}
              textColor={colorTheme}
              backgroundColor="#fff"
              textStyle={buttonTextStyle}
              style={[
                styles.button,
                buttonStyle,
                {
                  marginRight: 5,
                  marginLeft: 10,
                  borderWidth: 1,
                  borderColor: colorTheme,
                },
              ]}
            />
            <Button
              defaultFont={defaultFont()}
              onPress={() => {
                const selectedIds = [];
                const selectedObjectItems = [];
                selectedItem.forEach(item => {
                  selectedIds.push(item.id);
                  selectedObjectItems.push(item);
                });
                onSelect && onSelect(selectedIds, selectedObjectItems);
                setDefaulState(oldData => ({
                  ...oldData,
                  show: false,

                  preSelectedItem: selectedItem,
                }));
              }}
              title={selectButtonText}
              backgroundColor={colorTheme}
              textStyle={buttonTextStyle}
              style={[
                styles.button,
                buttonStyle,
                { marginLeft: 5, marginRight: 10 },
              ]}
            />
          </View>
        </Animated.View>
      </Modal>
      {preSelectedItem.length > 0 ? (
        isSelectSingle ? (
          <Text
            style={[
              styles.selectedTitlte,
              defaultFont(),
              selectedTitleStyle,
              { color: '#333' },
            ]}
          >
            {preSelectedItem[0].name}
          </Text>
        ) : (
          <View style={styles.tagWrapper}>
            {preSelectedItem.map((tag, index) => {
              return (
                <TagItem
                  key={index}
                  onRemoveTag={() => {
                    const preSelectedItem = [];
                    const selectedIds = [];
                    const selectedObjectItems = [];
                    const { data } = defaultState;
                    data.map(item => {
                      if (item.id === tag.id) {
                        item.checked = false;
                      }
                      if (item.checked) {
                        preSelectedItem.push(item);
                        selectedIds.push(item.id);
                        selectedObjectItems.push(item);
                      }
                    });
                    setDefaulState(oldState => ({
                      ...oldState,
                      data,
                      preSelectedItem,
                    }));
                    onRemoveItem &&
                      onRemoveItem(selectedIds, selectedObjectItems);
                  }}
                  tagName={tag.name}
                />
              );
            })}
          </View>
        )
      ) : (
        <Text
          style={[styles.selectedTitlte, defaultFont(), selectedTitleStyle]}
        >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

PickerOptions.propTypes = {
  data: PropTypes.array.isRequired,
  style: PropTypes.object,
  defaultFontName: PropTypes.string,
  selectedTitleStyle: PropTypes.object,
  buttonTextStyle: PropTypes.object,
  buttonStyle: PropTypes.object,
  itemWrapperStyle: PropTypes.object,
  itemTextWrapperStyle: PropTypes.object,
  iconColorItemSected: PropTypes.string,
  title: PropTypes.string,
  onSelect: PropTypes.func,
  onRemoveItem: PropTypes.func,
  popupTitle: PropTypes.string,
  colorTheme: PropTypes.string,
  isSelectSingle: PropTypes.bool,
  disabled: PropTypes.bool,
  showSearchBox: PropTypes.bool,
  cancelButtonText: PropTypes.string,
  selectButtonText: PropTypes.string,
  searchPlaceHolderText: PropTypes.string,
  searchInputStyle: PropTypes.object,
  listEmptyTitle: PropTypes.string,
};

PickerOptions.defaultProps = {
  cancelButtonText: 'Cancel',
  selectButtonText: 'Select',
  searchPlaceHolderText: 'Find item',
  listEmptyTitle: 'No options found',
  colorTheme: '#000',
  buttonTextStyle: {},
  itemWrapperStyle: {},
  itemTextWrapperStyle: {},
  buttonStyle: {},
  showSearchBox: true,
  isSelectSingle: false,
  disabled: false,
};
