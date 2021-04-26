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
  
  & button{
    width: 36px;
    height: 24px;
    margin: 2px 0;
    border: none;
    outline: none;
    border-radius: 20px;
    color: white;
    background-color: ${({theme}) => theme.colors.orange.dark};
    transition: .1s;
    &:hover{
      background-color: ${({theme}) => theme.colors.orange.normal};
    }
  }

  & input:last-child{
    border: none;
    outline: none;
    color: white;
    background-color: ${({theme}) => theme.colors.orange.normal};
    border-radius: 12px;
    &::placeholder{
      color: rgba(255, 255, 255, 0.4);
    }

    &.red::placeholder{
      color: red;
    }
  }
`;

export const StyledChild = styled.li`
  display: flex;
  justify-content: space-between;
  width: 90%;
  padding-left: 10px;
  background-color: ${({theme}) => theme.colors.gray.light};
  color: ${({theme}) => theme.colors.black.normal};
  transition: all .1s;
  border-left: 3px solid black;
  border-right: 3px solid black;
  
  &:last-child{
    border-bottom: 3px solid black;
  }
  
  &:last-child button:first-child{
    position: relative;
    width: 20px;
    height: 20px;
    margin-top: 2px;
    border-radius: 10px;
    border: none;
    outline: none;
    background-color: #eee;
    line-height: 20px;
    transform: rotate(0deg);
    transition: all .4s;
  }

  & button:last-child{
    margin: 2px 0;
  }

  & input:last-child{
    border: none;
    outline: none;
    color: white;
    background-color: ${({theme}) => theme.colors.gray.light};
    
    &.red::placeholder{
      color: red;
    }
  }
  
  &:hover{
    width: 100%;
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }

  &:last-child:hover button:first-child{
    transform: rotate(-540deg);
    background-color: ${({theme}) => theme.colors.orange.normal};
  }
`;