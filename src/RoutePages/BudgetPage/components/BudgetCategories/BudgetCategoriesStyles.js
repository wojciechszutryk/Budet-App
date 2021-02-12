import styled from 'styled-components';

const StyledCategory = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.colors.gray.normal};
  padding: ${({theme})=> theme.spacing.s};
`;

export const StyledParentCategory = styled(StyledCategory)`
  background-color: ${({theme}) => theme.colors.gray.normal};
  color: ${({theme}) => theme.colors.black.normal};
`;

export const StyledChildrenCategory = styled(StyledCategory)`
  background-color: ${({theme}) => theme.colors.gray.light};
  color: ${({theme}) => theme.colors.black.normal};
`;

export const Money = styled.span`
  font-style: italic;
  color: ${({theme, money}) => money ? theme.colors.green.dark : theme.colors.red.normal};
`;
