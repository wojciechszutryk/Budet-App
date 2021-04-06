import styled from 'styled-components'

export const StyledImportedTransactionsList = styled.ul`
  margin-left: 23px;
  & li::before {
    content: "\\2022";
    color: ${({theme}) => theme.colors.orange.dark};
    font-weight: bold;
    display: inline-block;
    width: 1em;
    margin-left: -1em;
  }
`;

export const StyledImportedTransactionsNumber = styled.span`
  font-weight: 600;
  color: ${({theme}) => theme.colors.orange.dark};
`;

export const StyledLabel = styled.label`
  position:absolute;
  min-width:200px;
  text-align:center;
  top: 19px;
  left: 80px;
  font-weight: 600;
`;

export const StyledInputTransactionFile = styled.input`
  margin-top: 25px;
  margin-left: 14px;
  width: 262px;
  height: 100px;
  border: 2px solid black;
  background-color: #ccc;
`;

export const StyledRead =styled.span`
  display: block;
  width: 290px;
  text-align: center
`;

export const StyledInfo = styled.div`
  position: absolute;
  left: 30px;
  top: 20px;
  height: 16px;
  width: 40px;
  background-color: #ddd;
  border: 2px solid black;
  border-radius: 4px;
  line-height:12px;
  font-size: 12px;
  & div{
    display: none;
  }
  & div p{
    margin-top: 5px;
  }
  & div p:last-child{
    font-weight: 600;
  }
  
  &:hover div {
    z-index: 1;
    display: block;
    margin-top: 11px;
    margin-left: -13px;
    width: 262px;
    height: 100px;
    padding: 10px;
    border: 2px solid black;
    background-color: #fff;
  }
`;