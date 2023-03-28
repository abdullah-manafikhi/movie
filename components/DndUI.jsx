import { useState } from 'react';
import { useContext } from "react";
import { DndContext, DragOverlay, closestCenter, MouseSensor, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableItem from './SortableItem';
import { initialLines } from "../assets/data"
import TableContext from './context/TableContext.js';

function DndUI() {

    // This state is for storeing the data
    const [items, setItems] = useState(initialLines);

    const [activeId, setActiveId] = useState(null);

    // This state is for changing the cursor from grab to grabbing whe the drag starts and ends
    const { setCursor } = useContext(TableContext);

    // const sensors = useSensors(
    //     // This sensor allows the user use the dnd functionality with touch screens mouses and pens
    //     useSensor(PointerSensor, { activationConstraint : {
    //         delay: 100,
    //         tolerance: 5,
    //       }}),


    //     // I have declined this sensor because its was conflicting with the textarea
    //     //  (Enter and spae bars where reserved for the dnd functionality) 

    //         // useSensor(KeyboardSensor, {
    //         //     coordinateGetter: sortableKeyboardCoordinates,
    //         //     activationConstraint : {
    //         //         delay: 200,
    //         //         tolerance: 5,
    //         //       }
    //         // })
    // )


    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 1,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 100,
                tolerance: 1,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    // This functioon is for changing the consequence of the dnd table
    function handleDragEnd(event) {
        // returning the cursor as grab when the drag ends
        setCursor("cursor-grab")
        const { active, over } = event;
        // console.log(active.id, over.id)
        if (active && over) {
            if (active.id !== over.id) {
                setItems((items) => {
                    const oldIndex = items.findIndex(({ id }) => id === active.id)
                    const newIndex = items.findIndex(({ id }) => id === over.id)
                    return arrayMove(items, oldIndex, newIndex);
                });
            }
        }
    }

    return (
        <>
            {/* <Table /> */}
            <DndContext
                id="0"
                sensors={sensors}
                // modifiers={[createSnapModifier]}
                collisionDetection={closestCenter}
                // changing the cursor to grabbing

                onDragStart={(e) => { console.log("dragStart"); setCursor("cursor-grabbing") }}
                onDragEnd={handleDragEnd}
            >
                <SortableContext
                    items={items}
                    strategy={verticalListSortingStrategy}
                >
                    {items.map((line, index) => <SortableItem key={line.id} id={line.id} line={line} value={`Item ${line.id}`} />)}
                </SortableContext>
                {/* <DragOverlay>
                    {activeId ? (
                        <SortableItem id={activeId} line={items.find(({ id }) => id === activeId)} value={`Item ${activeId}`} />
                    ) : null}
                </DragOverlay> */}
            </DndContext>
        </>
    )
}



export default DndUI