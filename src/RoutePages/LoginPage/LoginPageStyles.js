import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  
  section:nth-child(1){
    position: relative;
    flex: 1;
  }
  section:nth-child(2){
    position: relative;
    flex: 7;
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

export const StyledHeader = styled.h1`
    display: block;
    width: 100%;
    color: ${({theme}) => theme.colors.black.normal};
    text-align: center;
`;