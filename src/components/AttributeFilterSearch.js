import React, { useState, useEffect } from 'react';
import { SearchBar, SearchButton, SearchContainer,AttributeContainer, AttributeGroup, AttributeItem } from './Styled'; // Import styled components

function AttributeFilterSearch() {
  // Define state variables here
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

  return (
    <div>
      {Object.keys(attributes).map((attributeKey) => (
        <AttributeGroup key={attributeKey}>
          <h3>{attributeKey}</h3>
          <SearchContainer>
            <SearchBar
              type="text"
              placeholder={`Search ${attributeKey}...`}
              value={searchQueries[attributeKey]}
              onChange={(e) => setSearchQueries({ ...searchQueries, [attributeKey]: e.target.value })}
            />
            <SearchButton onClick={() => handleAttributeSearch(attributeKey)}>Search</SearchButton>
          </SearchContainer>
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