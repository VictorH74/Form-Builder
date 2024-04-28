import React from "react"
import { Container } from "./styles"

interface Props {
    bg: string
}

const PreView: React.FC<Props> = (props) => {
    return (
        <Container {...props} />
    )
}

export default PreView