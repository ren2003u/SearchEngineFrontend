import React, { useState } from 'react';
import { SearchBar, SearchButton, SearchContainer, ResultsContainer, ResultCard, ResultTitle, ResultDetails, ResultItem } from './Styled';

function MainPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isCorrected, setIsCorrected] = useState(false);

  const handleSearch = async () => {
    const response = await fetch(`http://localhost:8080/cartoons/fuzzySearch/${searchTerm}`);
    const data = await response.json();
    setSearchResults(data.results);
    setIsCorrected(data.corrected);
  };

  return (
    <div>
      <SearchContainer>
        <SearchBar 
          type="text" 
          placeholder="Search..." 
          onChange={event => setSearchTerm(event.target.value)}
        />
        <SearchButton onClick={handleSearch}>Search</SearchButton>
      </SearchContainer>
      {isCorrected && <p>Your search term was corrected.</p>}
      <ResultsContainer>
        {searchResults.map((result, index) => (
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
    </div>
  );
}

export default MainPage;