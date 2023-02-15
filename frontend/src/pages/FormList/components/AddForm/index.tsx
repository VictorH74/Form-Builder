import React, { useState, useCallback, ChangeEvent, memo, useMemo, CSSProperties } from "react"
import { Backward, Container, NewForm, QuestionComponents, QuestionsContainer, SubmitBtn, TitleInput } from "./styles"
import { IAddForm, IQuestion } from "../../types"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MultipleChoice from "./components/MutipleChoice";
import FillBlank from "./components/FillBlank";
import { DragSourceMonitor, DropTargetMonitor, useDrag, useDrop } from "react-dnd";
import useTranslate from "@/hooks/UseTranslate";
import { useMutation } from 'graphql-hooks';
import { CREATE_FORM_MUTATION } from "../../graphql_operators";


interface DragItem {
    type: string
}

const AddForm = () => {
    const [createForm, { loading }] = useMutation(CREATE_FORM_MUTATION)
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
            if (key === "alternatives" && type === "MC") question[key] = [
                { detail: "Alternative 1", isCorrect: true },
                { detail: "Alternative 2" },
            ]
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(formData)
        const res = await createForm({
            variables: formData
        })

        if (res.error) {
            return alert(res.error.graphQLErrors[0].message)
        }
    }

    const opacity = isOver ? 1 : 0.7
    const backgroundColor = canDrop ? "#6969694b" : "transparent"

    return (
        <Container>
            <Backward to="/my-forms" >
                <ArrowBackIcon sx={{ fontSize: 50, color: "dodgerblue" }} />
            </Backward>
            <QuestionComponents>
                <Question type="TX" >{translate("textQuestionComponent")}</Question>
                <Question type="MC" >{translate("multipleChoiceComponent")}</Question>
            </QuestionComponents>
            <NewForm onSubmit={handleSubmit} ref={drop} style={{ backgroundColor, opacity }}>
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
                <SubmitBtn children="Submit" disabled={loading} />
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
    padding: '0.5rem',
    margin: '0.5rem',
    backgroundColor: "dodgerblue",
    borderRadius: 20,
    textAlign: "center",
    cursor: "move"
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
            <p>{children}</p>
        </div>
    )
})