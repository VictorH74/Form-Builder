import React from "react"
import { Container, Label } from "../styles"
import useLanguage from "@/hooks/UseLanguage"
import { IQuestion } from "@/contexts/FormContext/types"

interface IFillBlank {
    question: IQuestion
}

const FillBlank: React.FC<IFillBlank> = ({ question }) => {
    const { language: lang } = useLanguage()

    return (
        <Container>
            <Label>
                <p className="question-number">{question.questionNumber}</p>
                <p className="question-text">{question.questionText}</p>
            </Label>
            <span className="answer-spn" >{lang === "en" ? "Answer" : "Resposta"}</span>
        </Container>

    )
}

export default FillBlank