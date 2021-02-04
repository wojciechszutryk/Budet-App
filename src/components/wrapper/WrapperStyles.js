import styled from 'styled-components'

const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 1000px;
  padding: ${({theme}) => theme.spacing.normal}px ${({theme}) => theme.spacing.l}px;
`;

export default Wrapper;
