import { useDrag, useDrop } from 'react-dnd'
import React, { useRef } from 'react'
// import { ItemTypes } from './Constants'


function Home() {
    return (
        <div>
            {/* <div className="draggables">
                <Draggable id='1' >primeiro</Draggable>
                <Draggable id='2' >segundo</Draggable>
                <Draggable id='3' >terceiro</Draggable>
                <Draggable id='4' >quarto</Draggable>
            </div>
            <div className="droppable">
                <Droppable onDrop={() => {}} >
                    sla
                </Droppable>
            </div> */}
        </div>
    )
}


interface DraggableProps {
    id: string
    children: React.ReactNode
}


interface DragItem {
    type: string;
    id: string;
}

interface DragCollectProps {
    isDragging: boolean;
}


const Draggable: React.FC<DraggableProps> = ({ id, children }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [{ isDragging }, drag] = useDrag<DragItem, DragCollectProps, DragCollectProps>({
        type: "",
        item: { type: 'component', id },

        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        }),
    });

    drag(ref)

    return <div ref={ref}>{children}</div>
}

interface DroppableProps {
    onDrop: (item: DragItem) => void
    children: React.ReactNode
}

interface DropCollectProps {
    isOver: boolean;
}

const Droppable: React.FC<DroppableProps> = ({ onDrop, children }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop<DragItem, void, DropCollectProps>({
        accept: 'component',
        drop: (item) => {
            onDrop(item)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver()
        }),
    });

    drop(ref)

    return <div ref={ref}>{children}</div>
}

export default Home