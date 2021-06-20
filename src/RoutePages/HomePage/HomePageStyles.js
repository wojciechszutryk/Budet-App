import styled from 'styled-components';

export const Grid = styled.div`
  display: flex;
  overflow-x: hidden;
  section:nth-child(1){
    position: relative;
    flex: 3;
  }
  section:nth-child(2){
    position: relative;
    flex: 5;
    margin: 0 ${({theme})=> theme.spacing.xs}px;
  }
  @media only screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

export const UserInformation = styled.div`
    width: 100%;
    font-weight: 700;
    text-align: center;
    color: ${({theme}) => theme.colors.black.normal};
    background-color: ${({theme}) => theme.colors.gray.light};
    padding: ${({theme}) => theme.spacing.normal}px;
    border: 3px solid ${({theme}) => theme.colors.sadMac.eyes};
`;

export const UserButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    & a:first-child{
      margin-right: 3px;
    }
`;

export const StyledHeader = styled.h1`
    display: block;
    width: 100%;
    color: ${({theme}) => theme.colors.black.normal};
    text-align: center;
`;

export const SubHeader = styled.h3`
    display: block;
    width: 100%;
    color: ${({theme}) => theme.colors.black.normal};
    text-align: center;
`;

export const StyledFeatureList = styled.ul`
    display: block;
    width: 100%;
    color: ${({theme}) => theme.colors.black.normal};
    text-align: center;
`;

export const StyledFeatureItem = styled.li`
    display: block;
    width: 100%;
    color: ${({theme}) => theme.colors.black.normal};
    text-align: center;
    margin-top: ${({theme}) => theme.spacing.l}px;
    &::before {
      content: "\\2022";
      color: ${({theme}) => theme.colors.sadMac.eyes};
      font-weight: bold;
      display: inline-block;
      width: 1em;
      margin-left: -1em;
    }
`;