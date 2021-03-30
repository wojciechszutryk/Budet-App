import styled from 'styled-components'

export const StyledList = styled.ul`
  margin-bottom: ${({theme})=> theme.spacing.xs}px;
`;

export const StyledListItem = styled.li`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.colors.gray.dark};
  background-color: ${({theme}) => theme.colors.gray.light};
  color: ${({theme}) => theme.colors.black.normal};
  padding: ${({theme})=> theme.spacing.xs}px;
  > *:nth-child(1){
    flex:6;
  }
  > *:nth-child(2){
    flex:3;
  }
  > *:nth-child(3){
    flex:3;
  }
  > *:nth-child(4){
    flex:3;
  }
  > *:nth-child(5){
    flex:0.9;
  }
  &:nth-child(odd){
    background-color: ${({theme}) => theme.colors.gray.white};
  }
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: start;
  }

  @media only screen and (max-width: 600px) {
    > *:nth-child(1){
      order: 1;
      flex-grow: 0;
      flex-basis: 65%;
    }
    > *:nth-child(2){
      order: 2;
      flex-grow: 0;
      flex-basis: 25%;
    }
    > *:nth-child(3){
      order: 5;
      flex-grow: 0;
      flex-basis: 25%;
    }
    > *:nth-child(4){
      order: 4;
      flex-grow: 0;
      flex-basis: 65%;
    }
    > *:nth-child(5){
      order: 3;
      flex-basis: 10%;
    }
  }
`

export const StyledOrderBar = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${({theme}) => theme.colors.gray.dark};
  background-color: ${({theme}) => theme.colors.gray.light};
  padding: ${({theme})=> theme.spacing.xs}px;
  > *:nth-child(1){
    flex:6;
  }
  > *:nth-child(2){
    flex:3;
  }
  > *:nth-child(3){
    flex:3;
  }
  > *:nth-child(4){
    flex:3;
  }
  > *:nth-child(5){
    flex:1;
  }
  
  @media only screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: start;
  }

  @media only screen and (max-width: 600px) {
    flex-wrap: wrap;
    justify-content: start;
    > *:nth-child(1){
      order: 1;
      flex: 6;
      flex-basis: 40%;
      margin-bottom: ${({theme})=> theme.spacing.xs}px;
    }
    > *:nth-child(2){
      order: 2;
      flex: 6;
      flex-basis: 40%;
      margin-bottom: ${({theme})=> theme.spacing.xs}px;
    }
    > *:nth-child(3){
      order: 4;
      flex: 6;
      flex-basis: 40%;
    }
    > *:nth-child(4){
      order: 3;
      flex: 6;
      flex-basis: 40%;
    }
    > *:nth-child(5){
      display: none;
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