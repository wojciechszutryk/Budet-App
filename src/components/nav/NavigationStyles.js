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