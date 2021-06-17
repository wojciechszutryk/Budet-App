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
    border: 1px solid ${({theme}) => theme.colors.black.normal};
    background-color: transparent;
    overflow: hidden;
    color: ${({theme}) => theme.colors.black.normal};
    transition: .25s .05s linear;
    text-align: left;
    z-index: 1;
    font-family: 'Verdana', sans-serif;
    font-weight: 600;
    font-size: 0.8rem;
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
    color: rgb(100, 100, 100);
    z-index: 2;
    position: relative;
    padding: ${({theme}) => theme.spacing.xs}px ${({theme}) => theme.spacing.sm}px;
    margin: 0 ${({theme}) => theme.spacing.xs}px;
    border-radius: ${({theme}) => theme.spacing.xs}px;
    border-style: none;
    background-color: #fff;
    overflow: hidden;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
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
  color: ${({theme}) => theme.colors.black.normal};
  background-color: ${({theme}) => theme.colors.gray.white};
  text-align: center;
  cursor: pointer;
  transition: .1s .1s;
  text-decoration: none;
  font-size: .7em;
  text-transform: uppercase;
  letter-spacing: .3px;
  font-weight: 600;
  z-index: 3;
  font-family: 'Trebuchet MS', sans-serif;
  &:hover {
    color: ${({theme}) => theme.colors.white.normal};
  }

  &::before {
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

  &:hover::before {
    width: 100%;
    height: 50%;
  }

  &:after {
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

  &:hover:after {
    height: 50%;
    width: 100%;
  }

  &:nth-child(3)::before, &:nth-child(3)::after {
    background-color: ${({theme}) => theme.colors.purple.dark};
  }
`;

export const SubmitButton = styled(ParentButton)`
    display: inline;
    margin-top: ${({theme}) => theme.spacing.l}px;
    padding: ${({theme}) => theme.spacing.xs}px ${({theme}) => theme.spacing.normal}px;
    border: none;
    line-height: 1.25;
    background-color: ${({theme}) => theme.colors.sadMac.eyes};
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
    background-color: rgb(89, 89, 89);
      &:focus,
          &:hover {
            background-color: rgb(100, 100, 100);
      }
`;

export const DeleteButton = styled(SubmitButton)`
    display: flex;
    justify-content: center;
    height: 20px;
    margin: 0;
    padding: 2px;
    background-color: ${({theme}) => theme.colors.gray.normalLight};
    transition: transform .1s linear;
      & svg path {
        transition: transform .2s linear;
      }
    &:hover{
      & svg path {
        transform-origin: center;
        transform: rotate(360deg);
      }
    }
    &:focus,
      &:hover {
        background: ${({theme}) => theme.colors.red.dark};
    }
`;

export const AddBudgetButton = styled(TransactionButton)`
    margin-top: ${({theme}) => theme.spacing.xs}px;
    border-radius: ${({theme}) => theme.spacing.normal}px;
    height: 40px;
    font-family: 'Times New Roman', sans-serif;
    font-weight: 500;
    font-size: .8rem;
    &::before{
      background-color: ${({theme}) => theme.colors.purple.dark};
      border-bottom-left-radius: ${({theme}) => theme.spacing.normal}px;
      border-bottom-right-radius: ${({theme}) => theme.spacing.normal}px;
    }
    &:after{
      background-color: ${({theme}) => theme.colors.purple.dark};
      border-top-left-radius: ${({theme}) => theme.spacing.normal}px;
      border-top-right-radius: ${({theme}) => theme.spacing.normal}px;
    }
    &:hover{
      border-color: ${({theme}) => theme.colors.gray.white};
    }
`;

export const SetDarkButton = styled(ParentButton)`
    background-color: white;
    color: ${({theme}) => theme.colors.black.normal};
    display: inline-block;
    position: relative;
    width: 34px;
    height: 34px;
    margin-right: ${({theme}) => theme.spacing.sm}px;
    border: 2px solid ${({theme}) => theme.colors.black.normal};
    border-radius: 20%;
    cursor: pointer;
    overflow: hidden;
    & svg:first-child{
        position: absolute;
        top: 40%;
        left: -20px;
        transition: left .1s;
        z-index: 1;
    }
    & svg:nth-child(2){
        position: absolute;
        left: 5px;
        top: 5px;
        transition: left .1s, font-size .15s;
        font-size: 20px;
    }
    &:hover{
        background-color: rgb(78, 96, 110)
    }
    &:hover svg:first-child{
        color: ${({theme}) => theme.colors.white.normal};
        left: 2px;
    }
    &:hover svg:nth-child(2){
        color: rgb(232, 228, 153);
        left: 8px;
        font-size: 30px;
    }
`;

export const SetLightButton = styled(SetDarkButton)`
    background-color: rgb(60, 60, 60);
    & svg:first-child{
        top: 40%;
        left: -20px;
        transition: left .1s;
        z-index: 1;
    }
    & svg:nth-child(2){
        transition: left .1s, transform .2s;
    }
    &:hover{
        background-color: rgb(171, 212, 245);
    }
    &:hover svg:first-child{
        color: white;
        left: 2px;
    }
    &:hover svg:nth-child(2){
        color: rgb(247, 244, 143);
        transform-origin: center;
        transform: rotate(60deg);
        font-size: 20px;
    }
`;

export const UserButton = styled(ParentButton)`
  position: relative;
  background-color: ${({theme}) => theme.colors.background.normal};
  //background-image: url("${props => props.userImage}");
  background-size: cover;
  color: ${({theme}) => theme.colors.black.normal};
  display: inline-block;
  width: 34px;
  height: 34px;
  margin-right: ${({theme}) => theme.spacing.sm}px;
  border: 2px solid ${({theme}) => theme.colors.black.normal};
  border-radius: 20%;
  cursor: pointer;
  overflow: hidden;
  transition: border .2s;
  &:hover{
    border: 2px solid ${({theme}) => theme.colors.sadMac.eyes};
  }
`;