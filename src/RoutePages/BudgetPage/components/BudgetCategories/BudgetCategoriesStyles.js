import styled from 'styled-components';

const StyledCategory = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.colors.gray.dark};
  padding: ${({theme})=> theme.spacing.s};
  & span{
    flex: 1;
    font-weight: 400;
  }
  & div{
    flex: 1;
    text-align: center;
  }
`;

export const StyledBudgetMoney = styled(StyledCategory)`
  padding: ${({theme}) => theme.spacing.sm}px;
  border-radius: ${({theme}) => theme.spacing.l}px;
  border: 2px solid  ${({theme}) => theme.colors.gray.dark};
  background-color: ${({theme}) => theme.colors.white.normal};
  color: ${({theme}) => theme.colors.black.normal};
  & div{
    border-radius: ${({theme}) => theme.spacing.sm}px;
    background-color: ${({theme}) => theme.colors.gray.light} !important;
  }
`;

export const StyledParentCategory = styled(StyledCategory)`
  padding: ${({theme}) => theme.spacing.xs}px;
  margin-top: ${({theme}) => theme.spacing.xs}px;
  border: 2px solid  ${({theme}) => theme.colors.gray.dark};
  border-radius: ${({theme}) => theme.spacing.l}px ${({theme}) => theme.spacing.l}px 0 0;
  background-color: ${({theme}) => theme.colors.gray.normal};
  color: ${({theme}) => theme.colors.white.normal};
  line-height: 100%;
  cursor: pointer;
  transition: .1s;
  & span:first-child{
    margin-top: 3px;
    margin-left: 3px;
  }
  & div{
    border-radius: 0 ${({theme}) => theme.spacing.sm}px 0 0;
    background-color: ${({theme}) => theme.colors.gray.light} !important;
  }
  &:hover{
    color: ${({theme}) => theme.colors.black.normal};
    background-color: ${({theme}) => theme.colors.white.normal};
  }
`;

export const StyledChildrenCategory = styled(StyledCategory)`
  padding: ${({theme}) => theme.spacing.xs}px;
  background-color: ${({theme}) => theme.colors.gray.light};
  color: ${({theme}) => theme.colors.black.normal};
  border-left: 2px solid  ${({theme}) => theme.colors.gray.dark};
  border-right: 2px solid  ${({theme}) => theme.colors.gray.dark};
  &:last-child{
    border-radius:  0 0 ${({theme}) => theme.spacing.l}px ${({theme}) => theme.spacing.l}px;
    border-bottom: 2px solid  ${({theme}) => theme.colors.gray.dark};
  }
  &:last-child div{
    border-radius:  0 0 ${({theme}) => theme.spacing.sm}px ${({theme}) => theme.spacing.sm}px;
  }
  & div{
    border-radius: 0;
  }
`;

export const MoneyWrapper = styled.div`
  background-color: white;
  padding: ${({theme}) => theme.spacing.xs}px;
`;

export const Money = styled.span`
  color: ${({theme}) =>  theme.colors.black.normal};
  font-weight: 600;
`;

export const MoneyLeft = styled.span`
  font-style: italic;
  color: ${({theme, money}) => money ? theme.colors.green.dark : theme.colors.red.normal};
`;
