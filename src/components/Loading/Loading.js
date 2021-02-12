import React from 'react';
import  styled, {keyframes} from 'styled-components';

const dots1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
const dots2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;
const dots3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;
const Content = styled.div`
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${({theme}) => theme.colors.gray.dark};
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;
const Root = styled.div`
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 80px;
  height: 80px;
  ${Content}:nth-child(1) {
    left: 8px;
    animation: ${dots1} 0.6s infinite;
  };
  ${Content}:nth-child(2) {
    left: 8px;
    animation: ${dots2} 0.6s infinite;
  };
  ${Content}:nth-child(3) {
    left: 32px;
    animation: ${dots2} 0.6s infinite;
  };
  ${Content}:nth-child(4) {
    left: 56px;
    animation: ${dots3} 0.6s infinite;
  };
`;


const Loading = () => {
    return (
            <Root>
                <Content/>
                <Content/>
                <Content/>
                <Content/>
            </Root>
    );
};

export default Loading;
