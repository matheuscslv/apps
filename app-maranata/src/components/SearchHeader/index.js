import React, { useState, useEffect, useCallback } from 'react';

import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import { Container } from './styles';
import SuggestionView from './SuggestionView';

export default function SearchHeader({
  onGetSuggestions,
  onClear,
  onSearch,
  suggestions: enableSuggestion,
  autoFocus,
  onHide,
  placeholder,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    async function getSuggestions() {
      const list = await onGetSuggestions(text);
      setSuggestions(list);
    }

    getSuggestions();
  }, [onGetSuggestions, text]);

  const handleSubmit = useCallback(
    (suggestion = null) => {
      onSearch(suggestion || text);
    },
    [onSearch, text],
  );

  return (
    <Container>
      <SearchBar
        text={text}
        setText={setText}
        onSubmit={handleSubmit}
        onHide={onHide}
        onClear={onClear}
        autoFocus={autoFocus}
        placeholder={placeholder}
      />
      {suggestions && enableSuggestion && (
        <SuggestionView
          onSubmit={handleSubmit}
          setText={setText}
          suggestions={suggestions}
        />
      )}
    </Container>
  );
}

SearchHeader.defaultProps = {
  onClear: () => {},
  suggestions: true,
  autoFocus: true,
  placeholder: 'Search ...',
};

SearchHeader.propTypes = {
  onGetSuggestions: PropTypes.func.isRequired,
  onClear: PropTypes.func,
  onHide: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  suggestions: PropTypes.bool,
  autoFocus: PropTypes.bool,
  placeholder: PropTypes.string,
};
