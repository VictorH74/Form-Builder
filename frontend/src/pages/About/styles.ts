import styled from "styled-components";

export const Container = styled.div`
    & h2 {
        margin: 10px 0;
        font-size: 2rem;
    }

    & h3 {
        margin-top: 15px;
        margin-bottom: 5px;
    }

    & ul li {
        position: relative;
        margin-left: 20px;
    }

    & #get-started, & img {
        display: none;
    }
`;
