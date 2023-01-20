import React from "react"
import { IQuestion } from "../../../../types"

const TextQuestion: React.FC<IQuestion> = (props) => {
    return (
        <p contentEditable>{props.questionNumber}. {props.questionText}</p>
    )
}

export default TextQuestion