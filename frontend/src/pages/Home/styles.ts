import styled from "styled-components"


export const Container = styled.div`
    display: grid;
    place-items: center;
    
`;

export const Content = styled.div`
    padding: 5%;

    & h1 {
        font-family: 'Amatic SC', cursive;
        font-size: 5rem;
    }

    & .first {
        margin-top: 70px;
        & .inner {
          display: flex;
          flex-wrap: wrap;
          gap: 40px;
        }
    }

    & ul {
        flex: 1 1 200px;

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

    @media screen and (min-width: 725px) {
        & ul {
            margin-top: 35px;
        }
    }

    @media screen and (max-width: 725px) {
        & h1 {
            font-size: 3.7rem;
        }
        & ul li, & ul button {
            font-size: 1.3rem;
        }
        & img {
            width: 100%;
        }
    }

    @media screen and (max-width: 450px) {
        & h1 {
            font-size: 2.7rem;
        }
        & ul li, & ul button {
            font-size: 1rem;
        }
    }
`;

export const EmptyFormListContainer = styled.div`
    height: 50vh;
    display: grid;
    place-items: center;
    text-align: center;
`;