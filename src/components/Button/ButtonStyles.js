import styled from 'styled-components';

const ParentButton = styled.button`
    text-decoration: none;
    cursor: pointer;
    &:focus {
      outline: none;
    }
`;

export const NormalButton = styled(ParentButton)`
    color: red;  
`;

export const SortButton = styled(ParentButton)`
    position: relative;
    padding: 3px 5px;
    margin: 0 3px;
    font-size: 1em;
    border: 1px solid ${({theme}) => theme.colors.black.normal};
    background-color: transparent;
    overflow: hidden;
    color: black;
    transition: .25s .05s linear;
    text-align: left;
    z-index: 1;

    &::before{
        content: "";
        position: absolute;
        width: 100%;
        height: 0;
        bottom: 0;
        left: 0;
        background-color: ${({theme}) => theme.colors.blue.normal};
        transition: .3s;
        z-index: -1;
    }

    &:nth-of-type(4){
        border-right: 1px solid ${({theme}) => theme.colors.black.normal};
    }
  
    &:nth-of-type(1)::before{
        background-color: ${({theme}) => theme.colors.red.normal};
    }

    &:nth-of-type(2)::before{
        background-color: ${({theme}) => theme.colors.orange.dark};
    }
    
    &:nth-of-type(4)::before{
        background-color: ${({theme}) => theme.colors.green.dark};
    }
  
    &:hover::before{
        height: 100%;
    }
  
    &:hover{
        color: ${({theme}) => theme.colors.white.normal};
    }

    & span{
        float: right;
    }
`;

export const InlineButton = styled(ParentButton)`
    color: ${({theme}) => theme.colors.black.normal};
    font-weight: 700;
    z-index: 2;
    position: relative;
    padding: 5px 10px;
    font-size: 1em;
    border-style: none;
    background-color: #fff;
    overflow: hidden;
    
    &::after{
        content: "";
        position: absolute;
        width: 100%;
        height: 3px;
        bottom: 0;
        left: -100%;
        background-color: #000;
        transition: 1s cubic-bezier(0, 1.8, 1, 1);
    }
    
    &:hover::after{
        left: 0;
    }
`;

export const TransactionButton = styled(ParentButton)`
    display: inline-block;
    position: relative;
    padding: 5px 10px;
    border: 2px solid ${({theme}) => theme.colors.black.normal};
    background-color: transparent;
    text-align: center;
    cursor: pointer;
    transition: .1s .1s;
    text-decoration: none;
    font-size: .7em;
    font-family: sans-serif;
    text-transform: uppercase;
    letter-spacing: .3px;
    font-weight: 700;
    z-index: 3;
  
    &:hover{
        color: ${({theme}) => theme.colors.white.normal};
    }
    
    &::before{
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 0;
        height: 0;
        background-color: ${({theme}) => theme.colors.green.normal};
        line-height: 100%;
        transition: width .15s linear, height .25s .17s;
        z-index: -1;
    }
  
    &:hover::before{
        width: 100%;
        height: 50%;
    }

    &:after{
        content: "";
        position: absolute;
        bottom: 50%;
        left: 0;
        width: 0;
        height: 0;
        background-color: ${({theme}) => theme.colors.green.normal};
        transition: width .15s linear, height .25s .17s;
        z-index: -1;
    }
  
    &:hover:after{
        height: 50%;
        width: 100%;
    }
`;