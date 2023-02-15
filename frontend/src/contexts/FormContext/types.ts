export interface IFormProvider {
    loading: boolean
    creating: boolean
    error: boolean
    formList: IFormList
    addForm: (form: IAddForm, callBack: () => void) => Promise<any>
}

export interface IFormList {
    id: number
    title: string
}

export interface IAddForm {
    id?: number
    title: string
    questions: IQuestion[]
}

export interface IForm {
    id: number
    createAt: Date
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