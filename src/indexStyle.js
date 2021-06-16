import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        font-family: "Optima",sans-serif;
        font-size: 16px;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    
    body {
        background-color: ${({theme}) => theme.colors.background.normal};
    }
    
    ul{
        padding: ${({theme}) => theme.spacing.s}px ${({theme}) => theme.spacing.normal}px;
        list-style: none;
    }
    
    a{
      text-decoration: none !important;
    }
    
    a a{
      color: ${({theme}) => theme.colors.sadMac.eyes} !important;
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
    
    div.table-responsive canvas{
      min-height: 300px;
    }
    
`;

export default GlobalStyles;