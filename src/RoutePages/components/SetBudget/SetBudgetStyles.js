import styled from "styled-components";

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

export const StyledParentBudget = styled(StyledCategory)`
  padding: ${({theme}) => theme.spacing.xs}px;
  margin-top: ${({theme}) => theme.spacing.xs}px;
  border: 2px solid  ${({theme}) => theme.colors.gray.dark};
  border-bottom: 1px solid  ${({theme}) => theme.colors.gray.dark};
  border-radius: ${({theme}) => theme.spacing.l}px ${({theme}) => theme.spacing.l}px 0 0;
  background-color: ${({theme}) => theme.colors.gray.normal};
  color: ${({theme}) => theme.colors.white.normal};
  line-height: 100%;
  cursor: pointer;
  transition: .1s;
  &:hover{
    color: ${({theme}) => theme.colors.black.normal};
    background-color: ${({theme}) => theme.colors.gray.white};
  }
`;

export const StyledChildrenBudget = styled(StyledCategory)`
  display: flex;
  padding: ${({theme}) => theme.spacing.xs}px;
  background-color: ${({theme}) => theme.colors.gray.light};
  color: ${({theme}) => theme.colors.black.normal};
  border-left: 2px solid  ${({theme}) => theme.colors.gray.dark};
  border-right: 2px solid  ${({theme}) => theme.colors.gray.dark};
  &:hover{
    cursor: pointer;
    color: ${({theme}) => theme.colors.black.normal};
    background-color: ${({theme}) => theme.colors.white.normal};
  }
  &.disabled{
    cursor: default;
    color: ${({theme}) => theme.colors.black.normal};
    background-color: ${({theme}) => theme.colors.gray.white};
  }
  &.disabled span{
    font-weight: 600;
  }
  & span:first-child{
    flex-grow: 1;
  }
`;