import React, { useState } from 'react';
import { SearchBar, SearchButton, SearchContainer, ResultsContainer, ResultCard, ResultTitle, ResultDetails, ResultItem, PaginationContainer, PageButton, ModeButtons, ModeButton } from './Styled';

function MainPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isCorrected, setIsCorrected] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [mode, setMode] = useState('nameSearch'); // Added mode state
    const resultsPerPage = 5;
  
    const handleSearch = async () => {
        if (!searchTerm.trim()) {
            setSearchResults(null); // Set to null for empty search term
            return;
          }
        const response = await fetch(`http://localhost:8080/cartoons/fuzzySearch/${searchTerm}`);
        const data = await response.json();
        setSearchResults(data.results || []); // Ensure results are an array
        setIsCorrected(data.corrected);
        setCurrentPage(1);
      };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults ? searchResults.slice(indexOfFirstResult, indexOfLastResult) : []; // Use correct variables
  const totalResults = searchResults ? searchResults.length : 0; // Handle null value

  const pageNumbers = [];
  if (searchResults) { // Check if searchResults is not null
    for (let i = 1; i <= Math.ceil(searchResults.length / resultsPerPage); i++) {
      pageNumbers.push(i);
    }
  }

  return (
    <div>
      <ModeButtons>
        <ModeButton active={mode === 'nameSearch'} onClick={() => setMode('nameSearch')}>Name Search</ModeButton>
        <ModeButton active={mode === 'attributeSearch'} onClick={() => setMode('attributeSearch')}>Attribute Filter Search</ModeButton>
      </ModeButtons>
      {mode === 'nameSearch' && ( // Added conditional rendering based on mode
        <>
          <SearchContainer>
            <SearchBar 
            type="text" 
            placeholder="Enter cartoon name to search..." 
            onChange={event => setSearchTerm(event.target.value)}
            />
            <SearchButton onClick={handleSearch}>Search</SearchButton>
          </SearchContainer>
          {isCorrected && <p>Your search term was corrected.</p>}
          <ResultsContainer>
          {searchResults === null ? (
              <p>Please enter a cartoon name to search.</p> // Message for empty search term
            ) : currentResults.length > 0 ? (
                currentResults.map((result, index) => (
                    <ResultCard key={index}>
                      <ResultTitle>{result.transliterationTitle}</ResultTitle>
                      <ResultDetails>
                        <ResultItem><strong>Japanese Title:</strong> {result.japaneseTitle}</ResultItem>
                        <ResultItem><strong>Cartoon ID:</strong> {result.cartoonId}</ResultItem>
                        {/* Check for null or undefined attributes before calling join */}
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
              <p>No results found. Please try another name.</p> // Message for no results
            )}
          </ResultsContainer>
          <PaginationContainer>
            {totalResults > 0 && ( // Only show pagination if there are results
                <PaginationContainer>
                {pageNumbers.map(number => (
                    <PageButton key={number} onClick={() => handlePageChange(number)}>
                    {number}
                    </PageButton>
                ))}
                </PaginationContainer>
            )}
          </PaginationContainer>
        </>
      )}
      {mode === 'attributeSearch' && (
        <p>Attribute Filter Search coming soon!</p> // Placeholder for attribute filter search
      )}
    </div>
  );
}

export default MainPage;