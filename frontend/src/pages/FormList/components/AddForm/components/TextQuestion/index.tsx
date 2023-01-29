import React from "react"
import { IQuestion } from "@/pages/FormList/types"
import { Container, Label } from "../styles"

interface ITextQuestion {
    index: number
    question: IQuestion
    setQuestionText: (index: number, value: string) => void
}

const TextQuestion: React.FC<ITextQuestion> = ({ index, question, setQuestionText }) => {

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        setQuestionText(index, value)
    }

    return (
        <Container>
            <Label>
                <p>{question.questionNumber}</p>
                <textarea onChange={handleChange} placeholder="Question" value={question.questionText} />
            </Label>
            <span className="answer-spn" >Answer</span>
        </Container>

    )
}

export default TextQuestion