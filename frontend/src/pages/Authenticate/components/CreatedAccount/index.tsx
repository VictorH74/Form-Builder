import React from "react";
import { Container, CreatedAccountChecked } from "./styles";


interface Props {
    handleFlip: () => void;
    translate: string;
}
const CreatedAccount: React.FC<Props> = ({ handleFlip, translate }) => (
    <Container>
        <CreatedAccountChecked />
        <button className="created" type="button" onClick={handleFlip} >
            {translate}
        </button>
    </Container>
)

export default CreatedAccount;