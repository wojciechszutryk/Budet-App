import styled from 'styled-components';

export const CategoriesHeader = styled.span`
  font-weight: 600;
  color: ${({theme}) => theme.colors.orange.dark};
`;

export const StyledParent = styled.li`
  width: 100%;
  background-color: black;
  color: white;
`;

export const StyledChild = styled.li`
  width: 70%;
  background-color: grey;
  color: white;
`;

export const OtherMoney = styled.div`
  color: red;
  margin-top: ${({theme}) => theme.spacing.normal}px;
`;