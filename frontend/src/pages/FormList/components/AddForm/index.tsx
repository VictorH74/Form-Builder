import React, { useState, useCallback, ChangeEvent, memo, useMemo, CSSProperties } from "react"
import { Backward, Container, NewForm, QuestionComponents, QuestionsContainer, TitleInput } from "./styles"
import { IAddForm, IQuestion } from "../../types"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MultipleChoice from "./components/MutipleChoice";
import FillBlank from "./components/FillBlank";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import useTranslate from "@/hooks/UseTranslate";


interface DragItem {
    type: string
}

const AddForm = () => {
    const translate = useTranslate({
        en: {
            title: "Form title",
            questionText: "Question number [value]",
            alterDetail: "New alternative",
            textQuestionComponent: "Text Question",
            textQuestionAnswer: "Answer",
            multipleChoiceComponent: "Multiple Choice"
        },
        "pt-BR": {
            title: "Título do formulário",
            questionText: "Questão número [value]",
            alterDetail: "Nova alternativa",
            textQuestionComponent: "Questão de Texto",
            textQuestionAnswer: "Resposta",
            multipleChoiceComponent: "Múltipla Escolha"
        }
    })

    const [formData, setFormData] = useState<IAddForm>({
        title: translate("title"),
        questions: [
            {
                questionNumber: 1,
                questionText: translate("questionText", 1),
                type: "TX",
            },
        ]
    })

    const addQuestion = (type: string) => {
        let keys = ["questionNumber", "questionText", "type", "alternatives"]
        let questionNumber = formData.questions.length + 1
        let question: IQuestion = { questionNumber, questionText: translate("questionText", questionNumber), type: "" }

        keys.forEach(key => {
            if (key === "type") question[key] = type
            if (key === "alternatives" && type === "MC") question[key] = []
        })
        let prevQuestions = formData.questions
        setFormData(prev => ({ ...prev, questions: [...prevQuestions, question] }))
    }

    const [{ isOver, canDrop }, drop] = useDrop(
        () => ({
            accept: ["TX", "MC"],
            drop(_item: DragItem, monitor) {
                let type = String(monitor.getItemType())
                if (!type) return;
                addQuestion(type)
                return undefined
            },
            collect: (monitor: DropTargetMonitor) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
        }),
        [addQuestion],
    )

    const updateFormData = (e: ChangeEvent<HTMLInputElement>) => {
        let { name, value } = e.currentTarget
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const setQuestionText = useCallback((index: number, value: string) => {
        let question: IQuestion = { ...formData.questions[index], questionText: value }
        let questions = formData.questions.map((prevQuestion, i) => i === index ? question : prevQuestion)
        setFormData(prev => ({ ...prev, questions }))
    }, [formData])

    const setAlterDetail = useCallback((QuestionIndex: number, alternativeIndex: number, value: string) => {
        let question = formData.questions[QuestionIndex]
        if (!question.alternatives) return;

        question.alternatives = question.alternatives.map((alt, i) => i === alternativeIndex ? { ...alt, detail: value } : alt)

        let questions = formData.questions.map((prevQuestion, i) => i === QuestionIndex ? question : prevQuestion)
        setFormData(prev => ({ ...prev, questions }))
    }, [formData])

    const setCorrectAlternative = useCallback((QuestionIndex: number, alternativeIndex: number) => {
        let question = formData.questions[QuestionIndex]
        if (!question.alternatives) return;

        question.alternatives = question.alternatives.map((alt, i) => ({ ...alt, isCorrect: i === alternativeIndex }))

        let questions = formData.questions.map((prevQuestion, i) => i === QuestionIndex ? question : prevQuestion)
        setFormData(prev => ({ ...prev, questions }))
    }, [formData])

    const addAlternative = useCallback((QuestionIndex: number) => {
        let question = formData.questions[QuestionIndex]
        if (!question.alternatives) return;

        question.alternatives = [...question.alternatives, { detail: translate("alterDetail") }]

        let questions = formData.questions.map((prevQuestion, i) => i === QuestionIndex ? question : prevQuestion)
        setFormData(prev => ({ ...prev, questions }))
    }, [formData])

    const opacity = isOver ? 1 : 0.7
    const backgroundColor = canDrop ? "#d3f1ff58" : "transparent"

    return (
        <Container>
            <Backward to="/my-forms" ><ArrowBackIcon sx={{ fontSize: 50 }} /></Backward>
            <QuestionComponents>
                <Question type="TX" >{translate("textQuestionComponent")}</Question>
                <Question type="MC" >{translate("multipleChoiceComponent")}</Question>
            </QuestionComponents>
            <NewForm ref={drop} style={{ backgroundColor, opacity }}>
                <TitleInput type="text" name="title" onChange={updateFormData} value={formData.title} />
                <QuestionsContainer>
                    {
                        formData.questions.map((q, i) =>
                            q.type === "TX" ?
                                (<FillBlank
                                    key={q.questionNumber}
                                    index={i}
                                    question={q}
                                    setQuestionText={setQuestionText}
                                />)
                                : q.type === "MC" ?
                                    (<MultipleChoice
                                        key={q.questionNumber}
                                        index={i}
                                        addAlternative={addAlternative}
                                        setCorrectAlternative={setCorrectAlternative}
                                        setQuestionText={setQuestionText}
                                        setAlterDetail={setAlterDetail}
                                        question={q}
                                    />)
                                    : "")
                    }
                </QuestionsContainer>
            </NewForm>
        </Container>
    )
}

export default AddForm


interface QuestionProps {
    type: string
    onToggleForbidDrag?: () => void
    children?: React.ReactNode
}

const questionStyles: CSSProperties = {
    border: '1px solid purple',
    padding: '0.5rem',
    margin: '0.5rem',
}

const Question: React.FC<QuestionProps> = memo(function Question({
    type,
    children,
}) {
    const [{ isDragging }, drag] = useDrag(
        () => ({
            type: type,
            collect: (monitor: DragSourceMonitor) => ({
                isDragging: monitor.isDragging(),
            }),
        }),
        [type],
    )

    const containerStyle = useMemo(
        () => ({
            ...questionStyles,
            opacity: isDragging ? 0.4 : 1,
        }),
        [isDragging],
    )

    return (
        <div ref={drag} style={containerStyle} role="Question" >
            {children}
        </div>
    )
})