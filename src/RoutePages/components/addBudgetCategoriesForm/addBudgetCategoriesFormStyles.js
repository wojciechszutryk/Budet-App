import styled from 'styled-components';

export const BudgetName = styled.span`
  font-weight: 600;
  color: ${({theme}) => theme.colors.orange.dark};;
`;
export const BudgetAmount = styled.span`
  font-weight: 600;
  color: ${({theme}) => theme.colors.black.normal};;
`;
export const OtherMoney = styled.div`
  color: red;
  margin-top: ${({theme}) => theme.spacing.normal}px;
`;