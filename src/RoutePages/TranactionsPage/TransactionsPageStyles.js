import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  
  section:nth-child(1){
    position: relative;
    flex: 4;
  }
  section:nth-child(2){
    position: relative;
    flex: 8;
    margin: 0 ${({theme})=> theme.spacing.xs}px;
  }
`;