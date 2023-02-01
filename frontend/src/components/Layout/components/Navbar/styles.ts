import { NavLink, NavLinkProps } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
    background-color: var(--pinkColor);
    padding: 10px;
    min-width: 240px;
    position: sticky;
    top: 80px;
    height: 88vh;
    translate: -100% 0;
    border-radius: 5px;
    animation-name: show;
    animation-duration: 200ms;
    animation-timing-function: ease-out;
    animation-iteration-count: initial;
    animation-fill-mode: forwards;

    @media screen and (max-width: 540px) {
        position: fixed;
    }

    @keyframes show {
        from {translate: -100% 0}
        to {translate: 0 0}
    }
`;

export const Nav = styled.nav`
    display: flex;
    gap: 10px;
    flex-direction: column;
`;

export const Line = styled.div`
    height: 1px;
    background: #e0e0e0;
    margin: 15px 0;
`;

export const Link = styled(NavLink) <NavLinkProps>`
    position: relative;
    color: #e0e0e0;
    text-decoration: none;
    font-size: 1.2rem;
    transition: 200ms;
    
    &.active {
        padding-left: 10px;
        
        &::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            border-radius: 5px;
            background: #e0e0e0;
            width: 3px;
        }  
    }
    
`;

export const AccountDetail = styled.div`
    font-size: 1.3rem;
`;

export const AccountMenu = styled.div`
    display: flex;
    flex-direction: row;
    gap: 5px;
    cursor: pointer;
`;
