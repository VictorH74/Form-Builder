import styled from "styled-components";
import { Link } from "react-router-dom";


export const Container = styled.div`
    max-width: 700px;
    margin: 20px auto;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 30px;
`;

export const AddLink = styled(Link)`
    position: fixed;
    top: 90px;
    right: 20px;
    cursor: pointer;
`;