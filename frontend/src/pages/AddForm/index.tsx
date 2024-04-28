import React, { memo, useMemo, CSSProperties } from "react"
import { Container, QuestionComponents, QuestionsContainer, SubmitBtn, TitleInput } from "./styles"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { DragSourceMonitor, useDrag, } from "react-dnd";
import { IAddForm } from "@/contexts/FormContext/types";
import { Backward } from "@/global/styles/globalStyles";
import createQuestionComponent, { multipleChoiceTypes } from "./components/questions";
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import useAddForm from "./useAddForm";
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import useAddFormCtx from "@/hooks/UseAddFormCtx";
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import MenuIcon from '@mui/icons-material/Menu';

export interface AddFormProps {
    form?: IAddForm
}

export const quenstionOtherShapes = [
    " ",
    ".",
    "°",
    "º",
    " |",
    " -",
    " >",
]

const AddForm: React.FC<AddFormProps> = ({ form }) => {
    const hook = useAddForm(form);
    const addFormCtx = useAddFormCtx();


    return (
        <Container>
            <Backward to="/my-forms" >
                <ArrowBackIcon sx={{ fontSize: 50, color: "dodgerblue" }} />
            </Backward>
            <QuestionComponents>

                <ListItemButton onClick={hook.handleOpenQuestionTypesClick}>
                    <ListItemText primary="Question Types" />
                    {hook.openQuestionTypes ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={hook.openQuestionTypes} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <Question type="TX" >{hook.translate("textQuestionComponent")}</Question>
                        <Question type="MC" >{hook.translate("multipleChoiceComponent")}</Question>
                        <Question type="MS" >{hook.translate("multipleSelectionComponent")}</Question>
                    </List>
                </Collapse>

                <ListItemButton onClick={hook.handleOpenQuestionSettingsClick}>
                    <ListItemText primary="Question Settings" />
                    {hook.openQuestionSettings ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={hook.openQuestionSettings} timeout="auto" unmountOnExit>
                    <div style={{ display: "grid", gap: 10, padding: "5px 10px" }}>

                        <div style={{ display: "flex", overflow: "hidden", borderRadius: 10 }}>
                            <button onClick={() => addFormCtx.setQuestionNumberShape("rounded")} style={{ width: "100%", padding: 15, backgroundColor: addFormCtx.questionNumberShape === "rounded" ? "dodgerblue" : "transparent", border: "none", outline: "none" }}>Rounded</button>

                            <button onClick={() => addFormCtx.setQuestionNumberShape("square")} style={{ width: "100%", padding: 15, backgroundColor: addFormCtx.questionNumberShape === "square" ? "dodgerblue" : "transparent", border: "none" }}>Square</button>
                        </div>

                        <div style={{ padding: "0 5px" }}>
                            <p>Shape size</p>
                            <Slider defaultValue={30} min={25} max={40} aria-label="Default" onChange={(_, newValue) => hook.debounce(() => addFormCtx.setQuestionNumberShapeSize(newValue as number))} valueLabelDisplay="auto" />
                        </div>

                        <div style={{ display: "flex", overflow: "hidden", borderRadius: 10 }}>
                            <button onClick={() => addFormCtx.setQuestionNumberShapeType("filled")} style={{ width: "100%", padding: 10, backgroundColor: addFormCtx.questionNumberShapeType === "filled" ? "dodgerblue" : "transparent", border: "none", outline: "none" }}>Filled</button>

                            <button onClick={() => addFormCtx.setQuestionNumberShapeType("outline")} style={{ width: "100%", backgroundColor: addFormCtx.questionNumberShapeType === "outline" ? "dodgerblue" : "transparent", padding: 10, border: "none" }}>Outline</button>

                            <button onClick={hook.handleMenu} style={{ width: "100%", backgroundColor: quenstionOtherShapes.includes(addFormCtx.questionNumberShapeType) ? "dodgerblue" : "transparent", padding: 10, display: "flex", gap: 5, alignItems: "center", justifyContent: "center", border: "none" }}>Others <MenuIcon /></button>
                        </div>

                        <Menu
                            id="menu-appbar"
                            anchorEl={hook.anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(hook.anchorEl)}
                            onClose={hook.handleClose}
                        >
                            {quenstionOtherShapes.map(value => (
                                <MenuItem key={value} onClick={() => {
                                    addFormCtx.setQuestionNumberShapeType(value)
                                    hook.handleClose();
                                }}>1{value} Statement</MenuItem>
                            ))}
                        </Menu>

                        <div />

                        <div style={{ display: "flex" }}>
                            <label htmlFor="input-shape-color" style={{ width: "100%" }}>Shape Color</label>
                            <input
                                type="color"
                                value={addFormCtx.questionNumberShapeColor}
                                onChange={e => {
                                    const newColor = e.currentTarget.value

                                    hook.debounce(() => addFormCtx.setQuestionNumberShapeColor(newColor))
                                }}
                                name=""
                                id="input-shape-color"
                            />
                            <input
                                type="color"
                                value={addFormCtx.questionNumberColor}

                                onChange={e => {
                                    const newColor = e.currentTarget.value

                                    hook.debounce(() => addFormCtx.setQuestionNumberColor(newColor))
                                }}
                                name=""
                                id="input-number-color"
                            />
                        </div>

                        <div style={{ display: "flex" }}>
                            <label htmlFor="input-question-text-color" style={{ width: "100%" }}>Text Color</label>
                            <input
                                value={addFormCtx.questionStatementColor}
                                type="color"
                                onChange={e => {
                                    const newColor = e.currentTarget.value

                                    hook.debounce(() => addFormCtx.setQuestionStatementColor(newColor))
                                }}
                                name=""
                                id="input-question-text-color"
                            />
                        </div>
                    </div>
                </Collapse>

                <ListItemButton onClick={hook.handleOpenAlternativeSettings}>
                    <ListItemText primary="Alternative Settings" />
                    {hook.openAlternativeSettings ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={hook.openAlternativeSettings} timeout="auto" unmountOnExit>
                    <div style={{ display: "grid", gap: 10, padding: "5px 10px" }}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <label htmlFor="show-markers-input" style={{ width: "100%" }}>Show markers</label>
                            <Switch id="show-markers-input" {...{ inputProps: { 'aria-label': 'Switch demo' } }} defaultChecked />
                        </div>

                        <button style={{ padding: 5, display: "flex", gap: 5, alignItems: "center", justifyContent: "center", backgroundColor: "dodgerblue", borderRadius: 5, border: "none" }}>Markers <MenuIcon /></button>

                        <button style={{ padding: 5, display: "flex", gap: 5, alignItems: "center", justifyContent: "center", backgroundColor: "dodgerblue", borderRadius: 5, border: "none" }}>Checkmarks <MenuIcon /></button>

                    </div>
                </Collapse>

            </QuestionComponents>
            <form onSubmit={hook.handleSubmit} ref={hook.drop} style={{ backgroundColor: hook.backgroundColor, opacity: hook.opacity }}>
                <div className="new-form">
                    <TitleInput
                        type="text"
                        name="title"
                        onChange={hook.updateFormData}
                        onFocus={(e: React.FocusEvent<HTMLInputElement>) => e.target.select()}
                        value={hook.formData.title}
                    />
                    <QuestionsContainer>
                        {
                            hook.formData.questions.map((q, i) => createQuestionComponent(
                                q.type,
                                {
                                    index: i,
                                    question: q,
                                    setQuestionText: hook.setQuestionText
                                },
                                multipleChoiceTypes.includes(q.type) ? {
                                    addAlternative: hook.addAlternative,
                                    setAlterDetail: hook.setAlterDetail,
                                    setCorrectAlternative: q.type === "MC" ? hook.setCorrectMCAlternative : hook.setCorrectMSAlternative
                                } : null
                            )
                            )
                        }
                    </QuestionsContainer>
                </div>
                <SubmitBtn children="Submit" disabled={hook.creating} />
            </form>
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
    borderRadius: 5,
    textAlign: "center",
    cursor: "move"
}

// Dragabble Component
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