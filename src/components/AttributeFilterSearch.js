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
    JumpToPageInput, 
    ConfirmButton,
    PaginationContainer, 
    PageButton
  } from './Styled';

function AttributeFilterSearch({ language }) {
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
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpToPage, setJumpToPage] = useState('');
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
  const translations = {
    english: {
        legend: "Legend",
        showSelectedAttributes: "Show Selected Attributes",
        includedAttributes: "Included Attributes:",
        excludedAttributes: "Excluded Attributes:",
        noIncludedAttributes: "No included attributes selected.",
        noExcludedAttributes: "No excluded attributes selected.",
        searchCartoons: "Search Cartoons by Attributes",
        noCartoonsFound: "No cartoons found based on selected attributes.",
        searchAttribute: "Search"
    },
    chinese: {
        legend: "图例",
        showSelectedAttributes: "显示选定的属性",
        includedAttributes: "包括的属性：",
        excludedAttributes: "排除的属性：",
        noIncludedAttributes: "未选择包括的属性。",
        noExcludedAttributes: "未选择排除的属性。",
        searchCartoons: "按属性搜索动画",
        noCartoonsFound: "未根据选定的属性找到动画。",
        searchAttribute: "搜索"
    }
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
const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
};

const handleNextPage = () => {
    if (currentPage < pageNumbers.length) {
        setCurrentPage(currentPage + 1);
    }
};

const handlePreviousPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
};

const handleJumpToPageChange = (event) => {
    setJumpToPage(event.target.value);
};

const handleJumpToPageConfirm = () => {
    const pageNumber = parseInt(jumpToPage);
    if (pageNumber >= 1 && pageNumber <= pageNumbers.length) {
        setCurrentPage(pageNumber);
    }
};

const resultsPerPage = 5;
const indexOfLastResult = currentPage * resultsPerPage;
const indexOfFirstResult = indexOfLastResult - resultsPerPage;
const currentCartoonResults = cartoons.slice(indexOfFirstResult, indexOfLastResult);

const totalNumberOfPages = Math.ceil(cartoons.length / resultsPerPage);
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(cartoons.length / resultsPerPage); i++) {
    pageNumbers.push(i);
}

const maxPageNumbersToShow = 5;
const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
const endPage = Math.min(totalNumberOfPages, startPage + maxPageNumbersToShow - 1);

  return (
    <div>
      <LegendButton onClick={() => setShowLegendWindow(!showLegendWindow)}>{translations[language].legend}</LegendButton>
      {showLegendWindow && <Overlay onClick={() => setShowLegendWindow(false)} />}
      <LegendWindow show={showLegendWindow}>
        <AttributeItem type="include">Included</AttributeItem>
        <AttributeItem type="exclude">Excluded</AttributeItem>
        <AttributeItem type="unselected">Unselected</AttributeItem>
      </LegendWindow>
      <ShowSelectedButton onClick={() => setShowSelectedWindow(!showSelectedWindow)}>{translations[language].showSelectedAttributes}</ShowSelectedButton>
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
                    {currentCartoonResults.length > 0 ? (
                        currentCartoonResults.map((result, index) => (
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
                <PaginationContainer>
                    {cartoons.length > 0 && (
                        <>
                            <PageButton onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</PageButton>
                            {startPage > 1 && <span>...</span>}
                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(number => (
                                <PageButton key={number} onClick={() => handlePageChange(number)}>
                                    {number}
                                </PageButton>
                            ))}
                            {endPage < totalNumberOfPages && <span>...</span>}
                            <PageButton onClick={handleNextPage} disabled={currentPage === totalNumberOfPages}>Next</PageButton>
                            <JumpToPageInput type="number" placeholder="Jump to page..." value={jumpToPage} onChange={handleJumpToPageChange} />
                            <ConfirmButton onClick={handleJumpToPageConfirm}>Confirm</ConfirmButton>
                        </>
                    )}
                </PaginationContainer>
      </SelectedAttributesWindow>
      {Object.keys(attributes).map((attributeKey) => ( 
        <AttributeGroup key={attributeKey}>
          <h3>{attributeKey}</h3>
          <ToggleSearchButton onClick={() => toggleSearchBar(attributeKey)}>{translations[language].searchAttribute} {attributeKey}</ToggleSearchButton>
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