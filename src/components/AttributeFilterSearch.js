import React, { useState, useEffect } from 'react';
import {
    SearchBar,
    SearchButton,
    AttributeContainer,
    AttributeGroup,
    AttributeItem,
    SearchContainer,
    ToggleSearchButton,
    SelectedAttributesWindow,
    ShowSelectedButton,
    Overlay,
    Legend,
  } from './Styled';

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
  const [selectedAttributes, setSelectedAttributes] = useState({
    include: {},
    exclude: {},
  });
  const [showSelectedWindow, setShowSelectedWindow] = useState(false);
  useEffect(() => {
    fetchAllAttributes();
  }, []);

  const fetchAllAttributes = async () => {
    const attributeKeys = ['社團', '作者', '角色', '同人', '標籤'];
    const newAttributes = {};

    for (const key of attributeKeys) {
      const response = await fetch(`http://localhost:8080/cartoons/listAttributeAllValues/${key}`);
      const data = await response.json();
      newAttributes[key] = data;
    }

    setAttributes(newAttributes);
  };

  const handleAttributeSearch = async (attribute) => {
    const query = searchQueries[attribute];
    if (query === '') {
      fetchAllAttributes(); // Fetch all attributes if the search bar is empty
      return;
    }
    const response = await fetch(`http://localhost:8080/cartoons/fuzzySearchAttributeValues/${attribute}/${query}`);
    const data = await response.json();
    setAttributes((prevAttributes) => ({
      ...prevAttributes,
      [attribute]: data,
    }));
  };
  const handleAttributeSelect = (attributeKey, item, action) => {
    // Prevent duplicate selection
    if (selectedAttributes.include[attributeKey]?.includes(item) || selectedAttributes.exclude[attributeKey]?.includes(item)) return;

    setSelectedAttributes((prevSelected) => {
      const updatedAttributes = { ...prevSelected[action], [attributeKey]: [...(prevSelected[action][attributeKey] || []), item] };
      return { ...prevSelected, [action]: updatedAttributes };
    });
  };
  const toggleSearchBar = (attribute) => {
    setShowSearch((prevShowSearch) => ({
      ...prevShowSearch,
      [attribute]: !prevShowSearch[attribute],
    }));
  };

  const handleAttributeToggle = (attributeKey, item, action) => {
    // Remove the item from the selected attributes
    setSelectedAttributes((prevSelected) => {
      const updatedAttributes = { ...prevSelected[action], [attributeKey]: (prevSelected[action][attributeKey] || []).filter((i) => i !== item) };
      return { ...prevSelected, [action]: updatedAttributes };
    });
  };

  return (
    <div>
      <Legend>
        <AttributeItem type="include">Included</AttributeItem>
        <AttributeItem type="exclude">Excluded</AttributeItem>
        <AttributeItem type="unselected">Unselected</AttributeItem>
      </Legend>
      <ShowSelectedButton onClick={() => setShowSelectedWindow(!showSelectedWindow)}>Show Selected Attributes</ShowSelectedButton>
      {showSelectedWindow && <Overlay onClick={() => setShowSelectedWindow(false)} />}
      <SelectedAttributesWindow show={showSelectedWindow}>
        <h3>Included Attributes:</h3>
        {Object.keys(selectedAttributes.include).map((key) => (
          <div>
            <h4>{key}</h4>
            {selectedAttributes.include[key].map((item, index) => (
              <AttributeItem key={index} type="include" onClick={() => handleAttributeToggle(key, item, 'include')}>
                {item}
              </AttributeItem>
            ))}
          </div>
        ))}
        <h3>Excluded Attributes:</h3>
        {Object.keys(selectedAttributes.exclude).map((key) => (
          <div>
            <h4>{key}</h4>
            {selectedAttributes.exclude[key].map((item, index) => (
              <AttributeItem key={index} type="exclude" onClick={() => handleAttributeToggle(key, item, 'exclude')}>
                {item}
              </AttributeItem>
            ))}
          </div>
        ))}
      </SelectedAttributesWindow>
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
              <AttributeItem
                key={index}
                type={selectedAttributes.include[attributeKey]?.includes(item) ? 'include' : selectedAttributes.exclude[attributeKey]?.includes(item) ? 'exclude' : 'unselected'}
                onClick={() => handleAttributeSelect(attributeKey, item, 'include')}
                onContextMenu={(e) => { e.preventDefault(); handleAttributeSelect(attributeKey, item, 'exclude'); }}
              >
                {item}
              </AttributeItem>
            ))}
          </AttributeContainer>
        </AttributeGroup>
      ))}
    </div>
  );
}


export default AttributeFilterSearch;