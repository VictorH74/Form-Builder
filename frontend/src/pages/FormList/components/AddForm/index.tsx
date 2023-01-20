import React, { useState, useEffect, useRef, ChangeEvent } from "react"
import { Backward, Container, TitleInput } from "./styles"
import { IAddForm } from "../../types"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const AddForm = () => {
    const [formData, setFormData] = useState<IAddForm>({
        title: "",
        questions: [
            {
                questionNumber: 1,
                questionText: "",
                type: "TX",
            }
        ]
    })

    // const setTitle = (e: ChangeEvent<HTMLInputElement>) => setFormData(prev => ({...prev, title: e.currentTarget.value}))
    const setTitle = (e: ChangeEvent<HTMLInputElement>) => console.log(e.currentTarget.value)

    return (
        <Container>
            <Backward to="/my-forms" ><ArrowBackIcon sx={{ fontSize: 50 }} /></Backward>
            <TitleInput type="text" name="title" placeholder="Title" value={formData.title} onChange={setTitle} />
        </Container>
    )
}

export default AddForm