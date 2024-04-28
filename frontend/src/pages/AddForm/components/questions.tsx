import React from "react"
import useLanguage from "@/hooks/UseLanguage"
import { IQuestion } from "@/contexts/FormContext/types"
import { Alternatives, AlternativesContainer, Container, Label } from "./styles"
import Checkbox from "@/components/CheckBox"
import useAddFormCtx from "@/hooks/UseAddFormCtx"
import TextArea from "@/components/Textarea"
import { quenstionOtherShapes } from ".."


export interface IQuestionComponent {
    index: number
    question: IQuestion
    setQuestionText: (index: number, value: string) => void
}

const QuestionBase: React.FC<{ children: React.ReactNode } & IQuestionComponent> = ({ children, setQuestionText, index, question }) => {
    const addFormCtx = useAddFormCtx()
    const handleChange = (value: string) => {
        setQuestionText(index, value)
    }

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => e.target.select()

    return (
        <Container>
            <Label
                shapeColor={addFormCtx.questionNumberShapeColor}
                numberColor={addFormCtx.questionNumberColor}
                statementColor={addFormCtx.questionStatementColor}
                shape={addFormCtx.questionNumberShape}
                shapeType={addFormCtx.questionNumberShapeType}
                shapeSize={addFormCtx.questionNumberShapeSize}
            >
                <p>{question.questionNumber}{quenstionOtherShapes.includes(addFormCtx.questionNumberShapeType) && `${addFormCtx.questionNumberShapeType}`}</p>
                <TextArea
                    onChange={handleChange}
                    placeholder="Question"
                    onFocus={handleFocus}
                    value={question.questionText}
                />
            </Label>
            {children}
        </Container>

    )
}

const FillBlank: React.FC<IQuestionComponent> = (props) => {
    const { language: lang } = useLanguage()

    return (
        <QuestionBase {...props} >
            <span className="answer-spn" >{lang === "en" ? "Answer" : "Resposta"}</span>
        </QuestionBase>
    )
}

interface IMultipleChoice {
    addAlternative: (index: number) => void
    setCorrectAlternative: (QuestionIndex: number, alternativeIndex: number) => void
    setAlterDetail: (QuestionIndex: number, alternativeIndex: number, value: string) => void
}

const MultipleChoice: React.FC<IQuestionComponent & IMultipleChoice> = ({ addAlternative, setCorrectAlternative, setAlterDetail, ...rest }) => {
    const { language: lang } = useLanguage()

    return (
        <QuestionBase {...rest} >
            <AlternativesContainer>
                <Alternatives type="A">
                    {rest.question?.alternatives && rest.question.alternatives.map((a, i) => (
                        <li key={i} >
                            <div className="inner-li">
                                <div style={{ position: "absolute", left: 2 }}>
                                    <Checkbox
                                        className="alt-checkbox"
                                        checked={a.isCorrect}
                                        onChange={() => setCorrectAlternative(rest.index, i)}
                                        rounded
                                    />
                                </div>

                                <input type="text" value={a.detail}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setAlterDetail(rest.index, i, e.target.value)
                                    }}
                                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                                />
                            </div>
                        </li>
                    ))}
                </Alternatives>
                <button type="button" onClick={() => addAlternative(rest.index)}>{lang === "en" ? "Add alternative" : "Adicionar alternativa"}</button>
            </AlternativesContainer>
        </QuestionBase>
    )
}
const MultipleSelection: React.FC<IQuestionComponent & IMultipleChoice> = ({ addAlternative, setCorrectAlternative, setAlterDetail, ...rest }) => {
    const { language: lang } = useLanguage()

    return (
        <QuestionBase {...rest}>
            <AlternativesContainer>
                <Alternatives type="A">
                    {rest.question?.alternatives && rest.question.alternatives.map((a, i) => (
                        <li key={i} >
                            <div className="inner-li">
                                <div style={{ position: "absolute", left: 2 }}>
                                    <Checkbox
                                        className="alt-checkbox"
                                        checked={a.isCorrect}
                                        onChange={() => setCorrectAlternative(rest.index, i)}
                                    />
                                </div>

                                <input type="text" value={a.detail}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        setAlterDetail(rest.index, i, e.target.value)
                                    }}
                                    onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                                />
                            </div>
                        </li>
                    ))}
                </Alternatives>
                <button type="button" onClick={() => addAlternative(rest.index)}>{lang === "en" ? "Add alternative" : "Adicionar alternativa"}</button>
            </AlternativesContainer>
        </QuestionBase>

    )
}

export const multipleChoiceTypes = ["MC", "MS"]

const createQuestionComponent = (
    type: string,
    questionProps: IQuestionComponent,
    alernativeActions: IMultipleChoice | null,
) => {
    if (type === "TX") return <FillBlank {...questionProps} />
    if (type === "MC") return <MultipleChoice {...questionProps} {...(alernativeActions as IMultipleChoice)} />
    if (type === "MS") return <MultipleSelection {...questionProps} {...(alernativeActions as IMultipleChoice)} />
}

export default createQuestionComponent;