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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // Added shadow for a technological appearance
  border: 1px solid #ccc; // Added border
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
  border: 2px solid #007BFF; // Enhanced border
  border-radius: 10px; // Rounded corners
  cursor: pointer;
  background-color: ${props => (props.active ? '#007BFF' : 'transparent')}; // Change background based on active prop
  color: ${props => (props.active ? '#ffffff' : '#007BFF')}; // Change text color
  font-weight: bold;
  font-size: 16px; // Increased font size
  transition: all 0.3s ease; // Smooth transition

  &:hover {
    background-color: ${props => (props.active ? '#0056b3' : '#e2e6ea')}; // Change hover color based on active prop
    color: #ffffff; // Change text color on hover
  }
`;

export const InstructionalText = styled.p`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  color: #555;
  user-select: none; /* Add this line */
  -webkit-user-select: none; /* Add this line */
  -moz-user-select: none; /* Add this line */
  -ms-user-select: none; /* Add this line */
`;

export const JumpToPageInput = styled.input`
  margin-left: 10px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const ConfirmButton = styled.button`
  padding: 5px 10px;
  margin-left: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: pointer;
  background-color: #007BFF;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

export const AttributeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  max-height: 200px;
  overflow-y: scroll;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // Added shadow for depth
`;

export const AttributeGroup = styled.div`
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); // Added shadow for a technological appearance
`;
export const ToggleSearchButton = styled.button`
  padding: 10px 20px;
  border-radius: 5px;
  border: none;
  background-color: #007BFF;
  color: white;
  cursor: pointer;
  margin: 10px 0;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;
export const SelectedAttributesContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px; // Fixed height to enable scrolling
  overflow-y: scroll; // Vertical scroll bar
  border: 2px solid #007BFF;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
`;

export const AttributeItem = styled.span`
  display: inline-block;
  border: 1px solid ${props => (props.type === 'include' ? '#28a745' : props.type === 'exclude' ? '#FF0000' : '#ccc')};
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  background-color: ${props => (props.type === 'include' ? '#28a745' : props.type === 'exclude' ? '#FF0000' : '#f8f9fa')}; // Same color for border and fill
  cursor: pointer;

  &:hover {
    background-color: #e2e6ea;
  }
`;

export const SelectedAttributeItem = styled.span`
  display: inline-block;
  border: 1px solid ${props => (props.type === 'include' ? '#28a745' : '#dc3545')};
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  background-color: ${props => (props.type === 'include' ? '#28a745' : '#dc3545')}; // Same color for border and fill
  color: ${props => (props.type === 'include' ? '#155724' : '#721c24')};
  cursor: pointer; // Hand cursor
  transition: all 0.3s ease; // Added transition

  &:hover {
    transform: scale(1.05); // Slight enlargement
  }
`;

export const SelectedAttributesWindow = styled.div`
  position: fixed;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  padding: 20px;
  overflow-y: scroll;
  z-index: 1000; // Ensure it's above other elements
  display: ${props => (props.show ? 'block' : 'none')}; // Show or hide based on prop
`;

export const ShowSelectedButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }
`;
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const Legend = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const LegendButton = styled.button`
  background-color: #f39c12;
  color: white;
  padding: 10px 20px;
  margin: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;

  &:hover {
    background-color: #e67e22;
  }
`;

export const LegendWindow = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 2;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

export const UnselectableText = styled.h3`
  user-select: none;
`;

export const EmptyListMessage = styled.p`
  font-style: italic;
  color: #7f8c8d;
`;