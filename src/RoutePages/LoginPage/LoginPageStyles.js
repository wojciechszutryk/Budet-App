import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  
  section:nth-child(1){
    position: relative;
    flex: 3;
    padding: ${({theme})=> theme.spacing.xl}px ${({theme})=> theme.spacing.normal}px;
  }
  section:nth-child(2){
    position: relative;
    flex: 6;
    padding: 0 100px;
  }
  @media only screen and (max-width: 900px) {
    flex-direction: column;
    section:nth-child(2){
      padding: 0 ${({theme})=> theme.spacing.xl}px;
    }
  }
`;

export const ButtonsStyle = styled.div`
    display: flex;
    justify-content: center;
`;