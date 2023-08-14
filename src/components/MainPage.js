import React, { useState } from 'react';
import { MainContent,LanguageButton,NavBar, NavButtons,Logo,SearchBar, SearchButton, SearchContainer, ResultsContainer, ResultCard, ResultTitle, ResultDetails, ResultItem, PaginationContainer, PageButton, ModeButtons, ModeButton, InstructionalText, JumpToPageInput, ConfirmButton } from './Styled';
import AttributeFilterSearch from './AttributeFilterSearch';
function MainPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isCorrected, setIsCorrected] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [mode, setMode] = useState('nameSearch'); // Added mode state
    const resultsPerPage = 5;
    const [jumpToPage, setJumpToPage] = useState(''); // State for jump to page input
    const [language, setLanguage] = useState('english');
    const toggleLanguage = () => {
      if (language === 'english') {
          setLanguage('chinese');
      } else {
          setLanguage('english');
      }
    };
    const translations = {
      english: {
          nameSearch: "Name Search",
          attributeSearch: "Attribute Filter Search",
          changeLanguage: "Change Language",
          enterCartoonName: "Please enter a cartoon name to search.",
          correctedSearch: "Your search term was corrected.",
          noResults: "No results found. Please try another name."
      },
      chinese: {
          nameSearch: "名称搜索",
          attributeSearch: "属性筛选搜索",
          changeLanguage: "更改语言",
          enterCartoonName: "请输入要搜索的动画名称。",
          correctedSearch: "您的搜索词已被更正。",
          noResults: "未找到结果。 请尝试其他名称。"
      }
  };
  
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

  const handleJumpToPage = (event) => {
    const pageNumber = parseInt(event.target.value);
    if (pageNumber >= 1 && pageNumber <= pageNumbers.length) {
      setCurrentPage(pageNumber);
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

  const maxPageNumbersToShow = 5; // You can adjust this number
  const startPage = Math.max(1, currentPage - Math.floor(maxPageNumbersToShow / 2));
  const endPage = Math.min(pageNumbers.length, startPage + maxPageNumbersToShow - 1);



  return (
    <div>
            <NavBar>
                <Logo src="path_to_your_logo_image.png" alt="Your Logo" />
                <NavButtons>
                    <ModeButton active={mode === 'nameSearch'} onClick={() => setMode('nameSearch')}>{translations[language].nameSearch}</ModeButton>
                    <ModeButton active={mode === 'attributeSearch'} onClick={() => setMode('attributeSearch')}>{translations[language].attributeSearch}</ModeButton>
                    <LanguageButton onClick={toggleLanguage}>{translations[language].changeLanguage}</LanguageButton>
                </NavButtons>
            </NavBar>
            <MainContent>
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
          {isCorrected && <p>{translations[language].correctedSearch}</p>}
          <ResultsContainer>
          {searchResults === null ? (
          <InstructionalText>{translations[language].enterCartoonName}</InstructionalText> // Updated instructional text
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
              <InstructionalText>{translations[language].noResults}</InstructionalText> // Updated instructional text
            )}
          </ResultsContainer>
          <PaginationContainer>
            {totalResults > 0 && (
                <PaginationContainer>
                    <PageButton onClick={handlePreviousPage}>Previous</PageButton>
                    {startPage > 1 && <span>...</span>}
                    {pageNumbers.slice(startPage - 1, endPage).map(number => (
                    <PageButton key={number} onClick={() => handlePageChange(number)}>
                        {number}
                    </PageButton>
                    ))}
                    {endPage < pageNumbers.length && <span>...</span>}
                    <PageButton onClick={handleNextPage}>Next</PageButton>
                    <JumpToPageInput type="number" placeholder="Jump to page..." value={jumpToPage} onChange={handleJumpToPageChange} />
                    <ConfirmButton onClick={handleJumpToPageConfirm}>Confirm</ConfirmButton> {/* Confirm button */}
                </PaginationContainer>
            )}
          </PaginationContainer>
        </>
      )}
      {mode === 'attributeSearch' && <AttributeFilterSearch language={language} />}
            </MainContent>
    </div>
  );
}

export default MainPage;