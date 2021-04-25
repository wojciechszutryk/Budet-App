import styled from "styled-components";

export const Wrapper = styled.aside`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const Content = styled.div`
  background-color: #fff;
  overflow: scroll;
  position: absolute;
  margin: auto;
  border-radius: 10px;
  width: 300px;
  min-height: 370px;
  box-shadow: ${({theme}) => `0 5px 10px 2px ${theme.colors.gray.dark}`};
  -webkit-box-shadow: ${({theme}) => `0 5px 10px 2px ${theme.colors.gray.dark}`};
  -ms-box-shadow: ${({theme}) => `0 5px 10px 2px ${theme.colors.gray.dark}`};
  max-height: 900px;
  padding: 20px;
  text-align: center;

  -ms-overflow-style: none;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-height: 900px){
    max-height: 690px;
    overflow: scroll;
  }
  
  @media (max-height: 700px){
    height: 520px;
    overflow: scroll;
  }

  @media (max-height: 600px){
    height: 420px;
    overflow: scroll;
  }

  @media (max-height: 500px){
    height: 370px;
    overflow: scroll;
  }
`;

export const CloseIcon = styled.div`
  position: absolute;
  right: 7px;
  top: 5px;
  cursor: pointer;
  font-size: 20px;
  transition: .1s;
  &:hover{
    color: ${({theme}) => theme.colors.orange.dark};
  }
`;