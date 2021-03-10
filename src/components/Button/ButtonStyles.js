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
    padding: 3px ${({theme}) => theme.spacing.xs}px;
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
        background-color: ${({theme}) => theme.colors.orange.normal};
    }

    &:nth-of-type(2)::before{
        background-color: ${({theme}) => theme.colors.green.dark};
    }
    
    &:nth-of-type(4)::before{
        background-color: ${({theme}) => theme.colors.red.normal};
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
    color: ${({theme}) => theme.colors.gray.normalDark};
    font-weight: 700;
    z-index: 2;
    position: relative;
    padding: ${({theme}) => theme.spacing.xs}px ${({theme}) => theme.spacing.sm}px;
    margin: 0 ${({theme}) => theme.spacing.xs}px;
    border-radius: ${({theme}) => theme.spacing.xs}px;
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
        transition: .3s cubic-bezier(0.61, 0.01, 0.87, 1.01);
    }
    
    &:hover::after{
        left: 0;
    }
`;

export const TransactionButton = styled(ParentButton)`
    position: relative;
    width: 100%;
    height: 100%;
    padding: ${({theme}) => theme.spacing.xs}px ${({theme}) => theme.spacing.sm}px;
    border: 1px solid ${({theme}) => theme.colors.black.normal};
    background-color: transparent;
    text-align: center;
    cursor: pointer;
    transition: .1s .1s;
    text-decoration: none;
    font-size: .7em;
    font-family: sans-serif;
    text-transform: uppercase;
    letter-spacing: .3px;
    font-weight: 600;
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

    &:nth-child(3)::before, &:nth-child(3)::after{
      background-color: ${({theme}) => theme.colors.purple.dark};
    }
`;

export const SubmitButton = styled(ParentButton)`
    display: inline;
    margin-top: ${({theme}) => theme.spacing.l}px;
    padding: ${({theme}) => theme.spacing.xs}px ${({theme}) => theme.spacing.normal}px;
    border: none;
    line-height: 1.25;
    background-color: ${({theme}) => theme.colors.orange.dark};
    text-decoration: none;
    color: white;
    font-size: 16px;
    letter-spacing: .08em;
    text-transform: uppercase;
    position: relative;
    transition: background-color .6s ease;
    overflow: hidden;
    &:after {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        transform-style: flat;
        transform: translate3d(-50%,-50%,0);
        background: rgba(255,2555,255,.1);
        border-radius: 100%;
        transition: width .3s ease, height .3s ease;
    }
    &:focus,
        &:hover {
            background: ${({theme}) => theme.colors.orange.normal};
    }
    &:active {
        &:after {
                width: 200px;
                height: 200px;
            }
    }
`;

export const ResetButton = styled(SubmitButton)`
    background-color: ${({theme}) => theme.colors.gray.dark};
      &:focus,
          &:hover {
            background: ${({theme}) => theme.colors.gray.normalDark};
      }

`;