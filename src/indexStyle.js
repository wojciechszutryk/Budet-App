import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,400;0,500;0,700;1,400&display=swap');
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Roboto', sans-serif;
    }
    body {
        background-color: ${({theme}) => theme.colors.background.normal};
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
      color: black;
    }
    a.selected button{
      color: black;
    }

    .Toastify__toast--info{
      background: ${({theme}) => theme.colors.gray.dark};
      color: ${({theme}) => theme.colors.white.normal};
    }
    .Toastify__progress-bar--dark {
      background: ${({theme}) => theme.colors.white.normal};
    }
`;

export default GlobalStyles;