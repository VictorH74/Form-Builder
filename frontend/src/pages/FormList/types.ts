export interface IFormList {
    id: number
    title: string
}


export interface IForm {
    id: number
    createAt: Date
    title: string
    questions: IQuestion[]
}


export interface IAddForm {
    title: string
    questions: IQuestion[]
}


export interface IQuestion {
    questionNumber: number
    questionText: string
    type: string
    alternatives?: IAlternative[]
}

export interface IAlternative {
    detail: string
    isCorrect?: boolean
}