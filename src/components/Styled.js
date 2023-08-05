import styled from 'styled-components';

export const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 20px;
`;

export const SearchBar = styled.input`
  flex: 1;
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
`;

export const ResultsContainer = styled.div`
  padding: 20px;
`;

export const ResultCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

export const ResultTitle = styled.h2`
  margin: 0;
  margin-bottom: 10px;
  color: #007BFF;
`;

export const ResultDetails = styled.div`
  padding-left: 10px;
`;

export const ResultItem = styled.p`
  margin: 0;
  margin-bottom: 5px;
`;