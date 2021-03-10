import styled from 'styled-components'

export const StyledList = styled.ul`
  margin-bottom: ${({theme})=> theme.spacing.xs}px;
`;

export const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.colors.gray.dark};
  padding: ${({theme})=> theme.spacing.xs}px;
  > *:nth-child(1){
    flex:4;
  }
  > *:nth-child(2){
    flex:2;
  }
  > *:nth-child(3){
    flex:2;
  }
  > *:nth-child(4){
    flex:2;
  }
`

export const StyledOrderBar = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.colors.gray.dark};
  background-color: ${({theme}) => theme.colors.gray.light};
  padding: ${({theme})=> theme.spacing.xs}px;
  > *:nth-child(1){
    flex:4;
  }
  > *:nth-child(2){
    flex:2;
  }
  > *:nth-child(3){
    flex:2;
  }
  > *:nth-child(4){
    flex:2;
  }
`;

export const OperationGrid = styled.div`
  display: flex;
  > *:nth-child(1){
    display: block;
    flex:3;
  }
  > *:nth-child(2){
    display: block;
    flex:4;
  }
  > *:nth-child(3){
    display: block;
    flex:3;
  }
`;