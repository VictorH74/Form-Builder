import styled from "styled-components"


export const Container = styled.div`
    display: grid;
    place-items: center;
`;

export const Content = styled.div`
    padding: 50px;
    & h1 {
        font-family: 'Amatic SC', cursive;
        font-size: 5rem;
    }

    & .first {
        margin-top: 70px;
        & .inner {
          display: flex;
          gap: 40px;
        }
    }

    & ul {
        padding-right: 70px;

        & li {
            font-size: 1.7rem;
            font-family: 'Noto Sans', sans-serif;
            margin-bottom: 30px;
            margin-left: 30px;
        }

        & button {
            margin-top: 10px;
            padding: 10px 20px;
            cursor: pointer;
            background-color: var(--mainColor);
            border: none;
            border-radius: 5px;
            font-size: 1.3rem;
            transition: 300ms;

            &:hover {
                scale: 105%;
            }
        }
    }
`;