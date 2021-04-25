import styled from 'styled-components';

export const CategoriesHeader = styled.span`
  font-weight: 600;
  color: ${({theme}) => theme.colors.orange.dark};
`;

export const StyledCategoryBox = styled.ol`
  margin-bottom: 7px;
`;

export const StyledChildrenCategoriesBox = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const StyledParent = styled.li`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 2px 5px 2px 10px;
  background-color: ${({theme}) => theme.colors.orange.dark};
  color: white;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  
  & button:last-child{
    margin: 2px 0;
    background-color: ${({theme}) => theme.colors.orange.dark};
  }
`;

export const StyledChild = styled.li`
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding-left: 10px;
  background-color: ${({theme}) => theme.colors.gray.light};
  color: white;
  transition: all .1s;
  border-left: 3px solid black;
  border-right: 3px solid black;
  
  &:last-child{
    border-bottom: 3px solid black;
  }

  & button:last-child{
    margin: 2px 0;
  }

  & input:last-child{
    border: none;
    outline: none;
    color: white;
    background-color: ${({theme}) => theme.colors.gray.light};
  }
  
  &:hover{
    width: 100%;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
`;

export const OtherMoney = styled.div`
  color: red;
  margin-top: ${({theme}) => theme.spacing.normal}px;
`;