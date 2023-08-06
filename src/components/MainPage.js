import React, { useState } from 'react';
import { SearchBar, SearchButton, SearchContainer, ResultsContainer, ResultCard, ResultTitle, ResultDetails, ResultItem, PaginationContainer, PageButton } from './Styled';

function MainPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isCorrected, setIsCorrected] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:8080/cartoons/fuzzySearch/${searchTerm}`);
    const data = await response.json();
    setSearchResults(data.results);
    setIsCorrected(data.corrected);
    setCurrentPage(1); // Reset to first page after new search
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = searchResults.slice(indexOfFirstResult, indexOfLastResult);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(searchResults.length / resultsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
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
        {currentResults.map((result, index) => (
          <ResultCard key={index}>
            <ResultTitle>{result.transliterationTitle}</ResultTitle>
            <ResultDetails>
                <ResultItem><strong>Japanese Title:</strong> {result.japaneseTitle}</ResultItem>
                <ResultItem><strong>Cartoon ID:</strong> {result.cartoonId}</ResultItem>
                <ResultItem><strong>社團:</strong> {result.社團.join(', ')}</ResultItem>
                <ResultItem><strong>作者:</strong> {result.作者.join(', ')}</ResultItem>
                <ResultItem><strong>角色:</strong> {result.角色.join(', ')}</ResultItem>
                <ResultItem><strong>同人:</strong> {result.同人.join(', ')}</ResultItem>
                <ResultItem><strong>分類:</strong> {result.分類.join(', ')}</ResultItem>
                <ResultItem><strong>語言:</strong> {result.語言.join(', ')}</ResultItem>
                <ResultItem><strong>頁數:</strong> {result.頁數.join(', ')}</ResultItem>
                <ResultItem><strong>標籤:</strong> {result.標籤.join(', ')}</ResultItem>
            </ResultDetails>
          </ResultCard>
        ))}
      </ResultsContainer>
      <PaginationContainer>
        {pageNumbers.map(number => (
          <PageButton key={number} onClick={() => handlePageChange(number)}>
            {number}
          </PageButton>
        ))}
      </PaginationContainer>
    </div>
  );
}

export default MainPage;