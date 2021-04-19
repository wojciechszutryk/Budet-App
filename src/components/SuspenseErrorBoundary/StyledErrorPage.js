import styled from "styled-components";

export const StyledErrorPage = styled.div`
  position: relative;
  margin-left: auto;
  margin-right: auto;
  width: 80vw;
  height: 80vh;

  span.errorMessage{
    display: block;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 30px;
    height: 50px;
    text-align: center;
    text-transform: uppercase;
  }
  
  button{
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
  }

  figure {
    font-size: 6px;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100vw;
  }

  figcaption {
    color:  ${({theme}) => theme.colors.black.normal};
    display: flex;
    align-content: space-between;
    flex-wrap: wrap;
    height: 17em;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
  
  @media screen and (min-width: 540px) {
    figure {
      font-size: 7px;
    }
  }
  @media screen and (min-width: 1440px) {
    figure {
      font-size: 8px;
    }
  }
`;