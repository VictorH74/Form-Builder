import styled from "styled-components";
import MenuIcon from '@mui/icons-material/Menu';


export const Container = styled.header`
    z-index: 9999 !important;
    background-color: var(--pinkColor);
    height: 70px;
    width: 100%;
    position: sticky;
    top: 0;
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
`;

export const Menu = styled(MenuIcon)`
    cursor: pointer;
`;