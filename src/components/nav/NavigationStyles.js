import styled from "styled-components";
import Wrapper from '../wrapper'

export const Container = styled.div`
    background-color: ${({theme}) => theme.colors.gray.light};
    display: flex;
    padding: ${({theme}) => theme.spacing.xs}px ${({theme}) => theme.spacing.sm}px;
    box-sizing: border-box;
    border-bottom: 2px solid  ${({theme}) => theme.colors.gray.dark};
    justify-content: space-between;
`;

export const List = styled.ul`
    display: flex;
`;

export const NavigationWrapper = styled(Wrapper)`
    display: flex;
    justify-content: space-between;
`;