import styled from 'styled-components'

export const ExpandedUserAccount = styled.div`
  display: flex;
  flex-direction: ${(props) => props.smallScreen ? 'column' : 'row'};
  justify-content: space-around;
  position: ${(props) => props.smallScreen ? 'absolute' : ''};
  top: 60px;
  width: ${(props) => props.smallScreen ? '200px' : '100%'};
  background-color: ${({theme}) => theme.colors.background.normal};
  border: 2px solid ${({theme}) => theme.colors.black.normal};
  border-radius: ${(props) => props.smallScreen ? '20%' : 'none'};
  z-index: 100;
  padding: ${({theme}) => theme.spacing.normal}px;
`;

export const UserPhoto = styled.div`
  background-image: url("${props => props.userImage}");
  background-size: cover;
  width: 70px;
  height: 70px;
  align-self: center;
  margin-bottom: 10px;
  background-color: ${({theme}) => theme.colors.background.normal};
  border: 3px solid ${({theme}) => theme.colors.black.normal};
  border-radius: 50%;
  cursor: pointer;
  transition: .1s;
  &:hover {
    opacity: 60%;
    border: 3px solid ${({theme}) => theme.colors.sadMac.eyes};
  }
`;

export const UserName = styled.span`
  color: ${({theme}) => theme.colors.sadMac.eyes};
  font-weight: 600;
`;

export const UserSpan = styled.span`
  color: ${({theme}) => theme.colors.black.normal};
`;

export const Alligner = styled.div`
  display: flex;
  justify-content: center;
`;

