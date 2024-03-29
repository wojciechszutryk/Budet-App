import styled from "styled-components";

export const StyledSadMac = styled.div`
    font-size: 9px;
    position: relative;
    background: ${({theme}) => theme.colors.sadMac.background};
    margin: 7em auto 7em auto;
    width: 23em;
    height: 30em;
  
    &:before {
      content: "";
      display: block;
      width: 1em;
      height: 1em;
      transform: translate(-1em, -1em);
      box-shadow: 1em 1em ${({theme}) => theme.colors.background.normal}, 23em 1em ${({theme}) => theme.colors.background.normal}, 4em 3em ${({theme}) => theme.colors.background.normal}, 5em 3em ${({theme}) => theme.colors.background.normal}, 6em 3em ${({theme}) => theme.colors.background.normal}, 7em 3em ${({theme}) => theme.colors.background.normal}, 8em 3em ${({theme}) => theme.colors.background.normal}, 9em 3em ${({theme}) => theme.colors.background.normal}, 10em 3em ${({theme}) => theme.colors.background.normal}, 11em 3em ${({theme}) => theme.colors.background.normal}, 12em 3em ${({theme}) => theme.colors.background.normal}, 13em 3em ${({theme}) => theme.colors.background.normal}, 14em 3em ${({theme}) => theme.colors.background.normal}, 15em 3em ${({theme}) => theme.colors.background.normal}, 16em 3em ${({theme}) => theme.colors.background.normal}, 17em 3em ${({theme}) => theme.colors.background.normal}, 18em 3em ${({theme}) => theme.colors.background.normal}, 19em 3em ${({theme}) => theme.colors.background.normal}, 20em 3em ${({theme}) => theme.colors.background.normal}, 3em 4em ${({theme}) => theme.colors.background.normal}, 21em 4em ${({theme}) => theme.colors.background.normal}, 3em 5em ${({theme}) => theme.colors.background.normal}, 21em 5em ${({theme}) => theme.colors.background.normal}, 3em 6em ${({theme}) => theme.colors.background.normal}, 7em 6em ${({theme}) => theme.colors.background.normal}, 9em 6em ${({theme}) => theme.colors.background.normal}, 15em 6em ${({theme}) => theme.colors.background.normal}, 17em 6em ${({theme}) => theme.colors.background.normal}, 21em 6em ${({theme}) => theme.colors.background.normal}, 3em 7em ${({theme}) => theme.colors.background.normal}, 8em 7em ${({theme}) => theme.colors.background.normal}, 16em 7em ${({theme}) => theme.colors.background.normal}, 21em 7em ${({theme}) => theme.colors.background.normal}, 3em 8em ${({theme}) => theme.colors.background.normal}, 7em 8em ${({theme}) => theme.colors.background.normal}, 9em 8em ${({theme}) => theme.colors.background.normal}, 15em 8em ${({theme}) => theme.colors.background.normal}, 17em 8em ${({theme}) => theme.colors.background.normal}, 21em 8em ${({theme}) => theme.colors.background.normal}, 3em 9em ${({theme}) => theme.colors.background.normal}, 21em 9em ${({theme}) => theme.colors.background.normal}, 3em 10em ${({theme}) => theme.colors.background.normal}, 10em 10em ${({theme}) => theme.colors.background.normal}, 13em 10em ${({theme}) => theme.colors.background.normal}, 21em 10em ${({theme}) => theme.colors.background.normal}, 3em 11em ${({theme}) => theme.colors.background.normal}, 11em 11em ${({theme}) => theme.colors.background.normal}, 12em 11em ${({theme}) => theme.colors.background.normal}, 21em 11em ${({theme}) => theme.colors.background.normal}, 3em 12em ${({theme}) => theme.colors.background.normal}, 21em 12em ${({theme}) => theme.colors.background.normal}, 3em 13em ${({theme}) => theme.colors.background.normal}, 10em 13em ${({theme}) => theme.colors.background.normal}, 11em 13em ${({theme}) => theme.colors.background.normal}, 12em 13em ${({theme}) => theme.colors.background.normal}, 13em 13em ${({theme}) => theme.colors.background.normal}, 14em 13em ${({theme}) => theme.colors.background.normal}, 21em 13em ${({theme}) => theme.colors.background.normal}, 3em 14em ${({theme}) => theme.colors.background.normal}, 9em 14em ${({theme}) => theme.colors.background.normal}, 15em 14em ${({theme}) => theme.colors.background.normal}, 16em 14em ${({theme}) => theme.colors.background.normal}, 21em 14em ${({theme}) => theme.colors.background.normal}, 3em 15em ${({theme}) => theme.colors.background.normal}, 17em 15em ${({theme}) => theme.colors.background.normal}, 21em 15em ${({theme}) => theme.colors.background.normal}, 3em 16em ${({theme}) => theme.colors.background.normal}, 21em 16em ${({theme}) => theme.colors.background.normal}, 4em 17em ${({theme}) => theme.colors.background.normal}, 5em 17em ${({theme}) => theme.colors.background.normal}, 6em 17em ${({theme}) => theme.colors.background.normal}, 7em 17em ${({theme}) => theme.colors.background.normal}, 8em 17em ${({theme}) => theme.colors.background.normal}, 9em 17em ${({theme}) => theme.colors.background.normal}, 10em 17em ${({theme}) => theme.colors.background.normal}, 11em 17em ${({theme}) => theme.colors.background.normal}, 12em 17em ${({theme}) => theme.colors.background.normal}, 13em 17em ${({theme}) => theme.colors.background.normal}, 14em 17em ${({theme}) => theme.colors.background.normal}, 15em 17em ${({theme}) => theme.colors.background.normal}, 16em 17em ${({theme}) => theme.colors.background.normal}, 17em 17em ${({theme}) => theme.colors.background.normal}, 18em 17em ${({theme}) => theme.colors.background.normal}, 19em 17em ${({theme}) => theme.colors.background.normal}, 20em 17em ${({theme}) => theme.colors.background.normal}, 3em 22em ${({theme}) => theme.colors.background.normal}, 4em 22em ${({theme}) => theme.colors.background.normal}, 5em 22em ${({theme}) => theme.colors.background.normal}, 14em 22em ${({theme}) => theme.colors.background.normal}, 15em 22em ${({theme}) => theme.colors.background.normal}, 16em 22em ${({theme}) => theme.colors.background.normal}, 17em 22em ${({theme}) => theme.colors.background.normal}, 18em 22em ${({theme}) => theme.colors.background.normal}, 19em 22em ${({theme}) => theme.colors.background.normal}, 20em 22em ${({theme}) => theme.colors.background.normal}, 1em 27em ${({theme}) => theme.colors.background.normal}, 2em 27em ${({theme}) => theme.colors.background.normal}, 3em 27em ${({theme}) => theme.colors.background.normal}, 4em 27em ${({theme}) => theme.colors.background.normal}, 5em 27em ${({theme}) => theme.colors.background.normal}, 6em 27em ${({theme}) => theme.colors.background.normal}, 7em 27em ${({theme}) => theme.colors.background.normal}, 8em 27em ${({theme}) => theme.colors.background.normal}, 9em 27em ${({theme}) => theme.colors.background.normal}, 10em 27em ${({theme}) => theme.colors.background.normal}, 11em 27em ${({theme}) => theme.colors.background.normal}, 12em 27em ${({theme}) => theme.colors.background.normal}, 13em 27em ${({theme}) => theme.colors.background.normal}, 14em 27em ${({theme}) => theme.colors.background.normal}, 15em 27em ${({theme}) => theme.colors.background.normal}, 16em 27em ${({theme}) => theme.colors.background.normal}, 17em 27em ${({theme}) => theme.colors.background.normal}, 18em 27em ${({theme}) => theme.colors.background.normal}, 19em 27em ${({theme}) => theme.colors.background.normal}, 20em 27em ${({theme}) => theme.colors.background.normal}, 21em 27em ${({theme}) => theme.colors.background.normal}, 22em 27em ${({theme}) => theme.colors.background.normal}, 23em 27em ${({theme}) => theme.colors.background.normal}, 1em 28em ${({theme}) => theme.colors.background.normal}, 23em 28em ${({theme}) => theme.colors.background.normal}, 1em 29em ${({theme}) => theme.colors.background.normal}, 23em 29em ${({theme}) => theme.colors.background.normal}, 1em 30em ${({theme}) => theme.colors.background.normal}, 23em 30em ${({theme}) => theme.colors.background.normal};
    }
    @media (max-width: 900px) {
        font-size: 5px;
    }
    @media (max-width: 600px) {
        font-size: 3px;
    }
`;

export const StyledHappyMac = styled(StyledSadMac)`
    &:before {
      box-shadow: 1em 1em ${({theme}) => theme.colors.background.normal}, 23em 1em ${({theme}) => theme.colors.background.normal}, 4em 3em ${({theme}) => theme.colors.background.normal}, 5em 3em ${({theme}) => theme.colors.background.normal}, 6em 3em ${({theme}) => theme.colors.background.normal}, 7em 3em ${({theme}) => theme.colors.background.normal}, 8em 3em ${({theme}) => theme.colors.background.normal}, 9em 3em ${({theme}) => theme.colors.background.normal}, 10em 3em ${({theme}) => theme.colors.background.normal}, 11em 3em ${({theme}) => theme.colors.background.normal}, 12em 3em ${({theme}) => theme.colors.background.normal}, 13em 3em ${({theme}) => theme.colors.background.normal}, 14em 3em ${({theme}) => theme.colors.background.normal}, 15em 3em ${({theme}) => theme.colors.background.normal}, 16em 3em ${({theme}) => theme.colors.background.normal}, 17em 3em ${({theme}) => theme.colors.background.normal}, 18em 3em ${({theme}) => theme.colors.background.normal}, 19em 3em ${({theme}) => theme.colors.background.normal}, 20em 3em ${({theme}) => theme.colors.background.normal}, 3em 4em ${({theme}) => theme.colors.background.normal}, 21em 4em ${({theme}) => theme.colors.background.normal}, 3em 5em ${({theme}) => theme.colors.background.normal}, 21em 5em ${({theme}) => theme.colors.background.normal}, 3em 6em ${({theme}) => theme.colors.background.normal}, 7em 6em ${({theme}) => theme.colors.background.normal}, 9em 6em ${({theme}) => theme.colors.background.normal}, 15em 6em ${({theme}) => theme.colors.background.normal}, 17em 6em ${({theme}) => theme.colors.background.normal}, 21em 6em ${({theme}) => theme.colors.background.normal}, 3em 7em ${({theme}) => theme.colors.background.normal}, 8em 7em ${({theme}) => theme.colors.background.normal}, 16em 7em ${({theme}) => theme.colors.background.normal}, 21em 7em ${({theme}) => theme.colors.background.normal}, 3em 8em ${({theme}) => theme.colors.background.normal}, 7em 8em ${({theme}) => theme.colors.background.normal}, 9em 8em ${({theme}) => theme.colors.background.normal}, 15em 8em ${({theme}) => theme.colors.background.normal}, 17em 8em ${({theme}) => theme.colors.background.normal}, 21em 8em ${({theme}) => theme.colors.background.normal}, 3em 9em ${({theme}) => theme.colors.background.normal}, 21em 9em ${({theme}) => theme.colors.background.normal}, 3em 10em ${({theme}) => theme.colors.background.normal}, 10em 10em ${({theme}) => theme.colors.background.normal}, 13em 10em ${({theme}) => theme.colors.background.normal}, 21em 10em ${({theme}) => theme.colors.background.normal}, 3em 11em ${({theme}) => theme.colors.background.normal}, 11em 11em ${({theme}) => theme.colors.background.normal}, 12em 11em ${({theme}) => theme.colors.background.normal}, 21em 11em ${({theme}) => theme.colors.background.normal}, 3em 12em ${({theme}) => theme.colors.background.normal}, 21em 12em ${({theme}) => theme.colors.background.normal}, 3em 13em ${({theme}) => theme.colors.background.normal}, 10em 13em ${({theme}) => theme.colors.background.normal}, 11em 13em ${({theme}) => theme.colors.background.normal}, 12em 13em ${({theme}) => theme.colors.background.normal}, 13em 13em ${({theme}) => theme.colors.background.normal}, 14em 13em ${({theme}) => theme.colors.background.normal}, 21em 13em ${({theme}) => theme.colors.background.normal}, 3em 14em ${({theme}) => theme.colors.background.normal}, 9em 12em ${({theme}) => theme.colors.background.normal}, 15em 12em ${({theme}) => theme.colors.background.normal}, 21em 14em ${({theme}) => theme.colors.background.normal}, 3em 15em ${({theme}) => theme.colors.background.normal}, 21em 15em ${({theme}) => theme.colors.background.normal}, 3em 16em ${({theme}) => theme.colors.background.normal}, 21em 16em ${({theme}) => theme.colors.background.normal}, 4em 17em ${({theme}) => theme.colors.background.normal}, 5em 17em ${({theme}) => theme.colors.background.normal}, 6em 17em ${({theme}) => theme.colors.background.normal}, 7em 17em ${({theme}) => theme.colors.background.normal}, 8em 17em ${({theme}) => theme.colors.background.normal}, 9em 17em ${({theme}) => theme.colors.background.normal}, 10em 17em ${({theme}) => theme.colors.background.normal}, 11em 17em ${({theme}) => theme.colors.background.normal}, 12em 17em ${({theme}) => theme.colors.background.normal}, 13em 17em ${({theme}) => theme.colors.background.normal}, 14em 17em ${({theme}) => theme.colors.background.normal}, 15em 17em ${({theme}) => theme.colors.background.normal}, 16em 17em ${({theme}) => theme.colors.background.normal}, 17em 17em ${({theme}) => theme.colors.background.normal}, 18em 17em ${({theme}) => theme.colors.background.normal}, 19em 17em ${({theme}) => theme.colors.background.normal}, 20em 17em ${({theme}) => theme.colors.background.normal}, 3em 22em ${({theme}) => theme.colors.background.normal}, 4em 22em ${({theme}) => theme.colors.background.normal}, 5em 22em ${({theme}) => theme.colors.background.normal}, 14em 22em ${({theme}) => theme.colors.background.normal}, 15em 22em ${({theme}) => theme.colors.background.normal}, 16em 22em ${({theme}) => theme.colors.background.normal}, 17em 22em ${({theme}) => theme.colors.background.normal}, 18em 22em ${({theme}) => theme.colors.background.normal}, 19em 22em ${({theme}) => theme.colors.background.normal}, 20em 22em ${({theme}) => theme.colors.background.normal}, 1em 27em ${({theme}) => theme.colors.background.normal}, 2em 27em ${({theme}) => theme.colors.background.normal}, 3em 27em ${({theme}) => theme.colors.background.normal}, 4em 27em ${({theme}) => theme.colors.background.normal}, 5em 27em ${({theme}) => theme.colors.background.normal}, 6em 27em ${({theme}) => theme.colors.background.normal}, 7em 27em ${({theme}) => theme.colors.background.normal}, 8em 27em ${({theme}) => theme.colors.background.normal}, 9em 27em ${({theme}) => theme.colors.background.normal}, 10em 27em ${({theme}) => theme.colors.background.normal}, 11em 27em ${({theme}) => theme.colors.background.normal}, 12em 27em ${({theme}) => theme.colors.background.normal}, 13em 27em ${({theme}) => theme.colors.background.normal}, 14em 27em ${({theme}) => theme.colors.background.normal}, 15em 27em ${({theme}) => theme.colors.background.normal}, 16em 27em ${({theme}) => theme.colors.background.normal}, 17em 27em ${({theme}) => theme.colors.background.normal}, 18em 27em ${({theme}) => theme.colors.background.normal}, 19em 27em ${({theme}) => theme.colors.background.normal}, 20em 27em ${({theme}) => theme.colors.background.normal}, 21em 27em ${({theme}) => theme.colors.background.normal}, 22em 27em ${({theme}) => theme.colors.background.normal}, 23em 27em ${({theme}) => theme.colors.background.normal}, 1em 28em ${({theme}) => theme.colors.background.normal}, 23em 28em ${({theme}) => theme.colors.background.normal}, 1em 29em ${({theme}) => theme.colors.background.normal}, 23em 29em ${({theme}) => theme.colors.background.normal}, 1em 30em ${({theme}) => theme.colors.background.normal}, 23em 30em ${({theme}) => theme.colors.background.normal};
    }
`;

export const StyledEyes = styled.div`
    font-size: 9px;
    position: absolute;
    top: 7em;
    transform: translateY(-50%);
    width: 23em;
    text-align: center;
    @media (max-width: 900px) {
      font-size: 5px;
    }
    @media (max-width: 600px) {
      font-size: 3px;
    }
`;

export const StyledEye = styled.div`
    font-size: 9px;
    width: 5em;
    height: 5em;
    background: ${({theme}) => theme.colors.background.normal};
    display: inline-block;
    margin: 2em;
    border-radius: 40%;
    position: relative;
    overflow: hidden;
    @media (max-width: 900px) {
      font-size: 5px;
    }
    @media (max-width: 600px) {
      font-size: 3px;
    }
`;

export const StyledBall = styled.div`
    font-size: 9px;
    width: 3em;
    height: 3em;
    background: ${({theme}) => theme.colors.sadMac.eyes};
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border-radius: 50%;
    @media (max-width: 900px) {
      font-size: 5px;
    }
    @media (max-width: 600px) {
      font-size: 3px;
    }
`;