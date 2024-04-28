import React from "react"
import { Alternatives, AlternativesContainer, Container, Label } from "../styles"
import { IQuestion } from "@/contexts/FormContext/types"

interface IMultipleChoice {
    question: IQuestion
}

const MultipleChoice: React.FC<IMultipleChoice> = ({ question }) => {

    return (
        <Container>
            <Label>
                <p className="question-number">{question.questionNumber}</p>
                <p className="question-text">{question.questionText}</p>
            </Label>
            <AlternativesContainer>
                <Alternatives type="A">
                    {question?.alternatives && question.alternatives.map((a, i) => (
                        <li key={i} >
                            <div className="inner-li">
                                <p>{a.detail}</p>
                            </div>
                        </li>
                    ))}
                </Alternatives>
            </AlternativesContainer>
        </Container>

    )
}

export default MultipleChoice