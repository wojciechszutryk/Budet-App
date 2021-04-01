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

export const Togglera = styled.button`
  width: 30px;
  height: 30px;
  border: none;
  background: red !important;
  & .sr-only {
    background: black;
    width: 22px;
    height: 5px;
    transition: all 0.2s;
  }
  &:hover {
    background: transparent !important;
  }
  span.icon-bar {
    background: black !important;
    height: 3px !important;
    width: 22px !important;
    transition: all 0.2s;
  }
  & *:nth-child(1) {
    background: black;
    height: 3px;
    width: 22px;
    transform: rotate(45deg);
    transform-origin: 10% 10%;
  }
  & .middle-bar {
    width: 22px;
    height: 3px;
    background: black;
    opacity: 0;
  }
  & .bottom-bar {
    height: 3px;
    width: 22px;
    background: black;
    transform: rotate(-45deg);
    transform-origin: 10% 90%;
  }
  &.collapsed .top-bar {
    transform: rotate(0);
  }
  &.collapsed .middle-bar {
    opacity: 1;
  }
  &.collapsed .bottom-bar {
    transform: rotate(0);
  }
`;