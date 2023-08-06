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

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const PageButton = styled.button`
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: #f8f9fa;

  &:hover {
    background-color: #e2e6ea;
  }
`;

export const ModeButtons = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const ModeButton = styled.button`
  padding: 10px 20px;
  margin: 0 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${props => (props.active ? '#e2e6ea' : '#f8f9fa')}; // Change background based on active prop
  font-weight: bold;
  transition: background-color 0.3s ease; // Smooth transition

  &:hover {
    background-color: ${props => (props.active ? '#d1d5d9' : '#e2e6ea')}; // Change hover color based on active prop
  }
`;