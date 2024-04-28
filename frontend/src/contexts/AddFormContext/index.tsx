import React from "react"

interface AddFormCtxData {
    questionNumberShape: string
    questionNumberShapeSize: number
    questionNumberShapeType: string
    questionNumberShapeColor: string
    questionNumberColor: string
    questionStatementColor: string
    showQuestionBottomBorder: boolean
    questionBottomBorderColor: string

    setQuestionNumberShape: React.Dispatch<React.SetStateAction<string>>
    setQuestionNumberShapeSize: React.Dispatch<React.SetStateAction<number>>
    setQuestionNumberShapeType: React.Dispatch<React.SetStateAction<string>>
    setQuestionNumberShapeColor: React.Dispatch<React.SetStateAction<string>>
    setQuestionNumberColor: React.Dispatch<React.SetStateAction<string>>
    setQuestionStatementColor: React.Dispatch<React.SetStateAction<string>>
    setShowQuestionBottomBorder: React.Dispatch<React.SetStateAction<boolean>>
    setQuestionBottomBorderColor: React.Dispatch<React.SetStateAction<string>>
}


export const addFormCtx = React.createContext<AddFormCtxData | null>(null);

export default function AddFormContextProvider({ children }: { children: React.ReactElement }) {
    const [questionNumberShape, setQuestionNumberShape] = React.useState("rounded")
    const [questionNumberShapeSize, setQuestionNumberShapeSize] = React.useState(35)
    const [questionNumberShapeType, setQuestionNumberShapeType] = React.useState("filled")
    const [questionNumberShapeColor, setQuestionNumberShapeColor] = React.useState("#1E90FF")
    const [questionStatementColor, setQuestionStatementColor] = React.useState("#000000")
    const [questionNumberColor, setQuestionNumberColor] = React.useState("#ffffff")
    const [showQuestionBottomBorder, setShowQuestionBottomBorder] = React.useState(true)
    const [questionBottomBorderColor, setQuestionBottomBorderColor] = React.useState("#1E90FF")


    return (
        <addFormCtx.Provider value={{
            questionNumberShape,
            questionNumberShapeSize,
            questionNumberShapeType,
            questionBottomBorderColor,
            questionNumberColor,
            questionNumberShapeColor,
            setQuestionBottomBorderColor,
            setQuestionNumberColor,
            setQuestionNumberShapeColor,
            setQuestionNumberShape,
            setQuestionNumberShapeSize,
            setQuestionNumberShapeType,
            setShowQuestionBottomBorder,
            showQuestionBottomBorder,
            questionStatementColor,
            setQuestionStatementColor,
        }}>
            {children}
        </addFormCtx.Provider>
    )
}