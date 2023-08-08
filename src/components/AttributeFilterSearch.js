import React, { useState, useEffect } from 'react';
import { SearchBar, SearchButton, AttributeContainer, AttributeGroup, AttributeItem, SearchContainer, ToggleSearchButton } from './Styled'; // Import styled components

function AttributeFilterSearch() {
  const [attributes, setAttributes] = useState({
    社團: [],
    作者: [],
    角色: [],
    同人: [],
    標籤: [],
  });
  const [searchQueries, setSearchQueries] = useState({
    社團: '',
    作者: '',
    角色: '',
    同人: '',
    標籤: '',
  });
  const [showSearch, setShowSearch] = useState({
    社團: false,
    作者: false,
    角色: false,
    同人: false,
    標籤: false,
  });

  useEffect(() => {
    const fetchAttributes = async () => {
      const attributeKeys = ['社團', '作者', '角色', '同人', '標籤'];
      const newAttributes = {};

      for (const key of attributeKeys) {
        const response = await fetch(`http://localhost:8080/cartoons/listAttributeAllValues/${key}`);
        const data = await response.json();
        newAttributes[key] = data;
      }

      setAttributes(newAttributes);
    };

    fetchAttributes();
  }, []);

  const handleAttributeSearch = async (attribute) => {
    const query = searchQueries[attribute];
    const response = await fetch(`http://localhost:8080/cartoons/fuzzySearchAttributeValues/${attribute}/${query}`);
    const data = await response.json();
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: data,
    }));
  };

  const toggleSearchBar = (attribute) => {
    setShowSearch((prevShowSearch) => ({
      ...prevShowSearch,
      [attribute]: !prevShowSearch[attribute],
    }));
  };

  return (
    <div>
      {Object.keys(attributes).map((attributeKey) => (
        <AttributeGroup key={attributeKey}>
          <h3>{attributeKey}</h3>
          <ToggleSearchButton onClick={() => toggleSearchBar(attributeKey)}>Search {attributeKey}</ToggleSearchButton>
          {showSearch[attributeKey] && (
            <SearchContainer>
              <SearchBar
                type="text"
                placeholder={`Search ${attributeKey}...`}
                value={searchQueries[attributeKey]}
                onChange={(e) => setSearchQueries({ ...searchQueries, [attributeKey]: e.target.value })}
              />
              <SearchButton onClick={() => handleAttributeSearch(attributeKey)}>Search</SearchButton>
            </SearchContainer>
          )}
          <AttributeContainer>
            {attributes[attributeKey].map((item, index) => (
              <AttributeItem key={index}>{item}</AttributeItem>
            ))}
          </AttributeContainer>
        </AttributeGroup>
      ))}
    </div>
  );
}

export default AttributeFilterSearch;