import styled from "styled-components";

export const NavigationWrapper = styled.div`
  background-color: ${({theme}) => theme.colors.gray.light};
  border-bottom: 2px solid  ${({theme}) => theme.colors.gray.dark};
`;

export const NavigationContainer = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

export const NavList = styled.div`
  display: flex;
  margin: ${({theme}) => theme.spacing.sm}px 0;
`;

export const Toggler = styled.button`
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 16px;
    background-color: ${({theme}) => theme.colors.gray.light} !important;
    border: 2px solid ${({theme}) => theme.colors.gray.normalDark} !important;
    border-radius: 7px;
    transition: .2s;

    & *{
      display: none;
    }
    
    &:active, &:focus {
      outline: 0;
    }
    
    &:before, &:after {
        content: "";
        display: block;
        width: 22px;
        height: 2px;
        border-radius: 1px;
        margin: 5px 0;
        transition: all 0.2s;
        background: ${({theme}) => theme.colors.gray.dark};
    }

    &:before {
        transform: rotate(45deg);
        transform-origin: 27% 50%;
    }

    &:after {
        transform: rotate(-45deg);
        transform-origin: 27% 50%;
    }

    &.collapsed{
        background-color: ${({theme}) => theme.colors.gray.white} !important;
        padding-left: 12px;
    }
    
    &.collapsed:before{
        transform: rotate(0);
    }
    
    &.collapsed:after{
        transform: rotate(0);
    }
`;

export const UserActionsButtons = styled.div`
  margin-top: ${({theme}) => theme.spacing.sm}px;
  margin-bottom: ${({theme}) => theme.spacing.sm}px;
  margin-right: 10px;
  padding-top: 4px;
  & button:nth-child(1) & button:nth-child(2){
    height: 30px;
  }
  & button:nth-child(1){
    margin-left: 0;
  }
`;