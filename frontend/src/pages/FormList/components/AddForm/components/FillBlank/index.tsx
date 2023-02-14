import React from "react"
import { IQuestion } from "@/pages/FormList/types"
import { Container, Label } from "../styles"
import useLanguage from "@/hooks/UseLanguage"

interface IFillBlank {
    index: number
    question: IQuestion
    setQuestionText: (index: number, value: string) => void
}

const FillBlank: React.FC<IFillBlank> = ({ index, question, setQuestionText }) => {
    const { language: lang } = useLanguage()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target
        setQuestionText(index, value)
    }

    return (
        <Container>
            <Label>
                <p>{question.questionNumber}</p>
                <input
                    onChange={handleChange}
                    placeholder="Question"
                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                    value={question.questionText}
                />
            </Label>
            <span className="answer-spn" >{lang === "en" ? "Answer" : "Resposta"}</span>
        </Container>

    )
}

export default FillBlank