import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  
  section:nth-child(1){
    position: relative;
    flex: 4;
    margin-bottom: ${({theme})=> theme.spacing.normal}px;
  }
  section:nth-child(2){
    position: relative;
    flex: 8;
    margin: 0 ${({theme})=> theme.spacing.xs}px;
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    section:nth-child(2){
      margin: 0 -${({theme})=> theme.spacing.xs}px;
    }
  }
`;