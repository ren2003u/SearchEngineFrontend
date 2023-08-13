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
    LegendButton,
    LegendWindow,
    UnselectableText,
    EmptyListMessage,
    SelectedAttributeItem,
    ResultsContainer,
    ResultCard,
    ResultTitle,
    ResultDetails,
    ResultItem,
    InstructionalText,
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
  const [showLegendWindow, setShowLegendWindow] = useState(false);
  const [cartoons, setCartoons] = useState([]);
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

  const handleAttributeToggle = (attributeKey, item) => {
    // Determine if the item is in the include or exclude list
    const action = selectedAttributes.include[attributeKey]?.includes(item) ? 'include' : 'exclude';
  
    // Remove the item from the selected attributes
    setSelectedAttributes((prevSelected) => {
      const updatedList = (prevSelected[action][attributeKey] || []).filter((i) => i !== item);
      const updatedAttributes = { ...prevSelected[action], [attributeKey]: updatedList };
      if (updatedList.length === 0) delete updatedAttributes[attributeKey]; // Remove attribute key if list is empty
      return { ...prevSelected, [action]: updatedAttributes };
    });
  };
  const handleSearchByAttributes = async () => {
    // Clear previous results
    setCartoons([]);

    // Check if both include and exclude lists are empty
    if (Object.keys(selectedAttributes.include).length === 0 && Object.keys(selectedAttributes.exclude).length === 0) {
        return; // Exit the function if both lists are empty
    }

    // Construct the request body
    const requestBody = {
        includeAttributes: selectedAttributes.include,
        excludeAttributes: selectedAttributes.exclude,
    };

    try {
        const response = await fetch('http://localhost:8080/cartoons/attributeSearch', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();
        setCartoons(data);
    } catch (error) {
        console.error("Error fetching cartoons:", error);
    }
};

  return (
    <div>
      <LegendButton onClick={() => setShowLegendWindow(!showLegendWindow)}>Legend</LegendButton>
      {showLegendWindow && <Overlay onClick={() => setShowLegendWindow(false)} />}
      <LegendWindow show={showLegendWindow}>
        <AttributeItem type="include">Included</AttributeItem>
        <AttributeItem type="exclude">Excluded</AttributeItem>
        <AttributeItem type="unselected">Unselected</AttributeItem>
      </LegendWindow>
      <ShowSelectedButton onClick={() => setShowSelectedWindow(!showSelectedWindow)}>Show Selected Attributes</ShowSelectedButton>
      {showSelectedWindow && <Overlay onClick={() => setShowSelectedWindow(false)} />}
      <SelectedAttributesWindow show={showSelectedWindow}>
        <UnselectableText>Included Attributes:</UnselectableText>
            {Object.keys(selectedAttributes.include).length > 0 ? (
            Object.keys(selectedAttributes.include).map((key) => (
                <div>
                <h4>{key}</h4>
                {selectedAttributes.include[key].map((item, index) => (
                    <SelectedAttributeItem key={index} type="include" onClick={() => handleAttributeToggle(key, item)}>{item}</SelectedAttributeItem> // Added onClick
                ))}
                </div>
            ))
            ) : (
            <EmptyListMessage>No included attributes selected.</EmptyListMessage>
            )}
            <UnselectableText>Excluded Attributes:</UnselectableText>
                {Object.keys(selectedAttributes.exclude).length > 0 ? (
                    Object.keys(selectedAttributes.exclude).map((key) => (
                    <div>
                    <h4>{key}</h4>
                    {selectedAttributes.exclude[key].map((item, index) => (
                        <SelectedAttributeItem key={index} type="exclude" onClick={() => handleAttributeToggle(key, item)}>{item}</SelectedAttributeItem> // Added onClick
                    ))}
                    </div>
                ))
                ) : (
            <EmptyListMessage>No excluded attributes selected.</EmptyListMessage>
            )}
            <button onClick={handleSearchByAttributes}>Search Cartoons by Attributes</button>
                <ResultsContainer>
                    {cartoons.length > 0 ? (
                        cartoons.map((result, index) => (
                            <ResultCard key={index}>
                                <ResultTitle>{result.transliterationTitle}</ResultTitle>
                                <ResultDetails>
                                    <ResultItem><strong>Japanese Title:</strong> {result.japaneseTitle}</ResultItem>
                                    <ResultItem><strong>Cartoon ID:</strong> {result.cartoonId}</ResultItem>
                                    <ResultItem><strong>社團:</strong> {result.社團 ? result.社團.join(', ') : 'N/A'}</ResultItem>
                                    <ResultItem><strong>作者:</strong> {result.作者 ? result.作者.join(', ') : 'N/A'}</ResultItem>
                                    <ResultItem><strong>角色:</strong> {result.角色 ? result.角色.join(', ') : 'N/A'}</ResultItem>
                                    <ResultItem><strong>同人:</strong> {result.同人 ? result.同人.join(', ') : 'N/A'}</ResultItem>
                                    <ResultItem><strong>分類:</strong> {result.分類 ? result.分類.join(', ') : 'N/A'}</ResultItem>
                                    <ResultItem><strong>語言:</strong> {result.語言 ? result.語言.join(', ') : 'N/A'}</ResultItem>
                                    <ResultItem><strong>頁數:</strong> {result.頁數 ? result.頁數.join(', ') : 'N/A'}</ResultItem>
                                    <ResultItem><strong>標籤:</strong> {result.標籤 ? result.標籤.join(', ') : 'N/A'}</ResultItem>
                                </ResultDetails>
                            </ResultCard>
                        ))
                    ) : (
                        <InstructionalText>No cartoons found based on selected attributes.</InstructionalText>
                    )}
                </ResultsContainer>
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