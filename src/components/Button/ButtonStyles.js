import styled, {keyframes} from 'styled-components';

const HoverAnimation = keyframes`
  0% {
    top: -30px;
  }
  100% {
    top: 0;
  }
`;

const HoverLine = styled.div`
  position: absolute;
  width: 30px;
  height: 30px;
  top: -30px;
  bottom: 0;
  z-index: 1;
  background-image: url("./images/PL.png");
  background-position: center;
  background-size: cover;
`;

const HoverLineDE = styled(HoverLine)`
  background-image: url("./images/GE.png");
`;

const HoverLineEN = styled(HoverLine)`
  background-image: url("./images/EN.png");
`;

const ParentButton = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  outline:none;
  color: ${({theme}) => theme.colors.black.normal};
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  &:hover ${HoverLine}{
    animation: ${HoverAnimation} 0.3s ease-in-out both;
  }
  &:hover ${ParentButton}{
    font-size: 0;
  }
`;

export const ButtonWrapper = ({children}) => {
    let Hover = HoverLine;
    if (children.props.children === 'De') Hover = HoverLineDE;
    if (children.props.children === 'En') Hover = HoverLineEN;
    return (
        <Container>
            {children}
            <Hover/>
        </Container>
    )
}

export const InlineButton = styled(ParentButton)`
    color: ${({theme}) => theme.colors.black.normal};
    font-weight: 700;
    z-index: 2;
    cursor: pointer;
`;

export const NormalButton = styled(ParentButton)`
    color: red;
`;
