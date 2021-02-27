import {createGlobalStyle} from "styled-components";

const GlobalStyles = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ul{
        margin: ${({theme}) => theme.spacing.xs}px 0;
        padding: ${({theme}) => theme.spacing.s}px ${({theme}) => theme.spacing.normal}px;
        list-style: none;
    }
    a{
      text-decoration: none;
    }
`;

export default GlobalStyles;