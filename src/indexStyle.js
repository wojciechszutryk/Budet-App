import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }
    ul{
        padding: ${({theme}) => theme.spacing.s}px ${({theme}) => theme.spacing.normal}px;
        list-style: none;
    }
    a{
      text-decoration: none;
    }
    a.selected button::after{
      left: 0;
      color: ${({theme}) => theme.colors.black.normal};
    }
    a.selected button{
      color: ${({theme}) => theme.colors.black.normal};
    }
`;

export default GlobalStyles;