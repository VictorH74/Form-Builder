import React, { useRef, useState, useEffect, CSSProperties } from "react";
import { Container } from "./styles";
import useForm from "@/hooks/UseForm";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Link } from "react-router-dom";


const Options: React.FC<{ id: number }> = ({ id }) => {
    const OptionsRef = useRef<HTMLDivElement>();
    const { deleteForm } = useForm()
    const [showOptions, setShowOptions] = useState(false)
    console.log(id)

    useEffect(() => {
        function handleClickForaDaDiv(e) {
            if (OptionsRef.current && !OptionsRef.current.contains(e.target)) {
                setShowOptions(false);
            }
        }
        document.addEventListener('mousedown', handleClickForaDaDiv);
        return () => {
            document.removeEventListener('mousedown', handleClickForaDaDiv);
        };
    }, [OptionsRef])

    const handleDelete = async () => {
        deleteForm(id)
    }

    const viewStyle: CSSProperties = {
        opacity: showOptions ? 1 : 0,
        pointerEvents: showOptions ? "all" : "none",
        translate: showOptions ? "90px -25px" : "0 0",
    }

    const deleteStyle: CSSProperties = {
        opacity: showOptions ? 1 : 0,
        pointerEvents: showOptions ? "all" : "none",
        translate: showOptions ? "90px 20px" : "0 0",
    }

    return (
        <Container ref={OptionsRef} onClick={() => setShowOptions(!showOptions)}>
            <span>Options</span>
            <div style={viewStyle} className="view op" >
                <Link to={`${id}`} >
                    <VisibilityIcon sx={{ color: "dodgerblue", fontSize: 30, cursor: "pointer" }} />
                </Link>
            </div>
            <div style={deleteStyle} className="delete op" >
                <DeleteOutlineIcon sx={{ color: "#AC2B2E", fontSize: 30, cursor: "pointer" }} onClick={handleDelete} />
            </div>
        </Container>
    )
}

export default Options