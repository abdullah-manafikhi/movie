import { useState, useMemo, useEffect } from 'react';
import { useContext } from "react";
import { DndContext, DragOverlay, closestCenter, MouseSensor, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable'
import SortableItem from './SortableItem';
import { initialLines } from "../assets/data"
import TableContext from './context/TableContext.js';
import randomColor from 'randomcolor'

function DndUI() {

    // This state is for storeing the data
    const [items, setItems] = useState(initialLines);

    // cursor state is for changing the cursor when dragging 
    const { setCursor, daysMap, setDaysMap } = useContext(TableContext);
    // const [activeId, setActiveId] = useState(null);


    useEffect(() => {
        // initializing global variable "days"
        globalThis.days = {
            colors: {},
            data: []
        }
        items.forEach((item, index) => {
            // This condition is for checking if the item is a day item
            if (Object.hasOwn(item, "day")) {
                (days.data).push({ ...item, index: index })
                // This condition is to check if the user had changed a day color 
                if (localStorage.getItem("colors") && (JSON.parse(localStorage.getItem("colors")))[index] !== "white") {
                    days.colors = { ...days.colors, [item.id]: (JSON.parse(localStorage.getItem("colors")))[item.id] }
                }
                else {
                    days.colors = { ...days.colors, [item.id]: "white" }
                }
            }
        })
        // We are stringifying days object because we cannot save object in localStorge
        localStorage.setItem("colors", JSON.stringify(days.colors))
        setDaysMap(days)
    }, [items])


    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 1,
            },
        }),
        useSensor(TouchSensor, {
            activationConstraint: {
                delay: 300,
                tolerance: 1,
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        }),
    );
    // This functioon is for changing the consequence of the dnd table
    function handleDragEnd(event) {
        console.log("dragend")
        // returning the cursor as grab when the drag ends
        setCursor("cursor-grab")
        const { active, over } = event;
        // console.log(active.id, over.id)
        if (active && over) {
            if (active.id !== over.id) {
                setItems((items) => {
                    const oldIndex = items.findIndex(({ id }) => id === active.id)
                    const newIndex = items.findIndex(({ id }) => id === over.id)
                    console.log((oldIndex), newIndex)
                    // sorting(oldIndex, newIndex)
                    // const x = daysMap.get(`${oldIndex}`)
                    // if (x !== undefined) {
                    //     daysMap.set(newIndex, x)
                    //     daysMap.delete(oldIndex)
                    // }
                    return arrayMove(items, oldIndex, newIndex);
                });
            }
        }
    }




    // console.log(daysMap.keys())
    console.log(items)
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
                    {items.map((line, index) => <SortableItem key={line.id} index={index} id={line.id} line={line} value={`Item ${line.id}`} />)}
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

// Generating random colors functionality

// console.log(randomColor({ luminosity: 'light', count: items.length }))

// const randClr = () => {
//     setColors(randomColor({ luminosity: 'light', count: items.length }))
// }


// useMemo(() => randClr(), [items])


export default DndUI