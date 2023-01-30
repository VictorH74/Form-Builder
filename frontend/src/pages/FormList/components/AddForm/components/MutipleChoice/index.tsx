import React from "react"
import Checkbox from "@/components/CheckBox"
// import Checkbox from "@src/components/Checkbox"
import { IQuestion } from "@/pages/FormList/types"
import { Alternatives, AlternativesContainer, Container, Label } from "../styles"

interface IMultipleChoice {
    index: number
    question: IQuestion
    addAlternative: (index: number) => void
    setCorrectAlternative: (QuestionIndex: number, alternativeIndex: number) => void
    setQuestionText: (index: number, value: string) => void
    setAlterDetail: (QuestionIndex: number, alternativeIndex: number, value: string) => void
}

const MultipleChoice: React.FC<IMultipleChoice> = ({ index, question, addAlternative, setCorrectAlternative, setQuestionText, setAlterDetail }) => {

    const handleChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value } = e.target
        setQuestionText(index, value)
    }

    return (
        <Container>
            <Label>
                <p>{question.questionNumber}</p>
                <textarea placeholder="Question" onChange={handleChangeText} value={question.questionText} />
            </Label>
            <AlternativesContainer>
                <Alternatives type="A">
                    {question?.alternatives && question.alternatives.map((a, i) => (
                        <li key={i} >
                            <div className="inner-li">
                                <input type="text" value={a.detail} onChange={
                                    (e: React.ChangeEvent<HTMLInputElement>) => {
                                        setAlterDetail(index, i, e.target.value)
                                    }
                                } />
                                <Checkbox
                                    className="alt-checkbox"
                                    label="Correct"
                                    checked={a.isCorrect}
                                    onChange={() => setCorrectAlternative(index, i)}
                                />
                            </div>
                        </li>
                    ))}
                </Alternatives>
                <button onClick={() => addAlternative(index)}>Add alternative</button>
            </AlternativesContainer>

        </Container>

    )
}

export default MultipleChoice