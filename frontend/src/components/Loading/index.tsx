import React from "react";
import SyncLoader from "react-spinners/SyncLoader"
import { Container } from "./styles";


const Loading = () => (
    <Container>
        <SyncLoader
            color="#E11D48"
            margin={5}
        />
    </Container>
)

export default Loading