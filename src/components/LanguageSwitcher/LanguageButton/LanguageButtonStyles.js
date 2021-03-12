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
  background-image: url("https://cdn.glitch.com/3f14db12-a1c8-462c-b3ae-ad21206e72ee%2FPL.png?v=1615554383679");
  background-position: center;
  background-size: cover;
`;

const HoverLineDE = styled(HoverLine)`
  background-image: url("https://cdn.glitch.com/3f14db12-a1c8-462c-b3ae-ad21206e72ee%2FGE.png?v=1615554383771");
`;

const HoverLineEN = styled(HoverLine)`
  background-image: url("https://cdn.glitch.com/3f14db12-a1c8-462c-b3ae-ad21206e72ee%2FEN.png?v=1615554383806");
`;

export const Button = styled.button`
  position: relative;
  width: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  background-position: center;
  background-size: cover;
  font-size: 16px;
  outline:none;
  color: ${({theme}) => theme.colors.black.normal};
  font-weight: 700;
  z-index: 2;
  cursor: pointer;
`;

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 34px;
  height: 34px;
  margin-left: ${({theme}) => theme.spacing.xs}px;
  border: 2px solid ${({theme}) => theme.colors.black.normal};
  border-radius: 20%;
  overflow: hidden;
  &:hover ${HoverLine}{
    animation: ${HoverAnimation} 0.3s ease-in-out both;
    ${props => props.active ? 'animation: none' : ''};
  }
  &:hover ${Button}{
    font-size: 0;
  }
  ${props => props.active ? '& > div{top: 0;}; button{font-size: 0;};' : ''};
`;

export const ButtonWrapper = ({children, active}) => {
    let Hover = HoverLine;
    if (children.props.children === 'De') Hover = HoverLineDE;
    else if (children.props.children === 'En') Hover = HoverLineEN;
    return (
        <Container active={active}>
            {children}
            <Hover/>
        </Container>
    )
}
