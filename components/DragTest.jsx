import { useState, useRef, useEffect, useContext } from "react";
import { PropTypes } from "prop-types";
import TableContext from './context/TableContext.js';
import SortableItemTest from "./SortableItemTest";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from 'react-window';
function DragTest({ items }) {
    const [data, setData] = useState([...items]);
    const [refresh, setRefresh] = useState(false);
    const [touch, setTouch] = useState(false)
    
    const { setCursor, daysMap, setDaysMap, addLine } = useContext(TableContext);
    useEffect(() => {
        setData(items)
    
    
    }, [items])


    // ========= USERREFs =========
    const dragItem = useRef(null);
    // the line that the pointer is over it after dragging a line
    const dragOverItem = useRef(null);

    useEffect(() => {
        console.log("its getting into it", addLine.type)
        if (addLine.type) {
            let newItems = data.slice(0, addLine.index + 1)
            console.log(newItems)
            newItems.push({ id: data.length, [addLine.type]: "New" })
            const test = data.slice(addLine.index + 1, data.length - 1)
            newItems = newItems.concat(test)
            console.log("fuck", newItems)
            setData(newItems)
        }
    }, [addLine])

    useEffect(() => {
        // initializing global variable "days"
        globalThis.days = {
            colors: {},
            data: []
        }
        if (data.length > 0) {
            data.forEach((item, index) => {
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
                // We are stringifying days object because we cannot save object in localStorge
            })
            localStorage.setItem("colors", JSON.stringify(days.colors))
            setDaysMap(days)
            console.log(days)
        }
    }, [data])


    // ===========================================
    // *************** MOUSE EVENTS **************
    // ===========================================

    let x = null
    const onDragStart = (e, index) => {
        console.log("its getting there")
        e.currentTarget.classList.add("hello")
        x = setTimeout(() => {
            console.log(x)
            e.target.classList.add("dragging")
            dragItem.current = { data: data[index], index: index };
            console.log("start");
            // getting all the lines
            globalThis.lines = [...document.querySelectorAll(".draggable-line")];
            // creating array of objects that cotains the folowing info
            globalThis.heights = lines.map((line, index) => {
                let rec = line.getBoundingClientRect();
                return { id: line.id, index: index, Y: rec.height + rec.top };
            });
        }, 500)
    };

    const onDragEnter = (e, index) => {
        console.log(e.pointerType)
        console.log("enter", dragItem.current, x)
        dragOverItem.current = { data: data[index], index: index };
        if (dragItem.current !== null && x !== null) {
            console.log("enter");
            e.preventDefault();
            // after dragging a line when entering new line add "dragging class"
            e.currentTarget.classList.add("dragging");
        }
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        if (dragItem.current !== null) {
            console.log("leave");
            // after dragging a line when leaving an enteed line remove "dragging class"
            e.currentTarget.classList.remove("dragging");
        }

    };

    const onDragEnd = (e) => {
        console.log("dragEnd")
        if (dragItem.current !== null) {
            console.log(e.target, e.currentTarget)
            e.preventDefault();
            const test = [...data];
            test.splice(dragItem.current.index, 1);
            console.log(test)
            // Adding item to the array
            test.splice(dragOverItem.current.index, 0, dragItem.current.data);
            console.log(test)
            dragItem.current = {
                ...dragItem.current,
                index: dragOverItem.current.index,
            };
            setRefresh((prev) => !prev);
            setData(test);
        }
        else {
            clearTimeout(x)
            dragItem.current = null
        }
        const draggings = [...document.querySelectorAll(".dragging")]
        draggings.forEach(dragging => {
            dragging.classList.remove("dragging")
        })
        clearTimeout(x)
        dragItem.current = null
    };




    // ===========================================
    // *************** TOUCH EVENTS **************
    // ===========================================

   
    let y = null
    const pointerDown = (e, index) => {
        // e.preventDefault()
        if (e.pointerType !== "mouse") {
            console.log("pointer down", index, e.currentTarget)
            y = setTimeout(() => {
                e.target.classList.add("dragging")
                dragItem.current = { data: data[index], index: index };
                console.log("start");
                // getting all the lines
                setTouch(true)
            }, 500)
        }
    }

    const pointerMove = (e, index) => {
        if (e.pointerType !== "mouse") {
            if (dragItem.current !== null) {
                e.currentTarget.style.position = "fixed"
                e.currentTarget.style.width = "80%"
                e.currentTarget.style.top = `${e.clientY}px`
                e.currentTarget.style.zIndex = `+1000`
                console.log(e.clientY)
                console.log("pointer move")
                if (e.clientY > window.innerHeight * 0.9) {
                    window.scrollBy(0, 15)
                }
                if (e.clientY < window.innerHeight * 0.1) {
                    window.scrollBy(0, -15)
                }
            }
        }
    }

    const pointerUp = (e, index) => {
        e.preventDefault()
        if (e.pointerType !== "mouse") {
            e.currentTarget.style.position = "relative"
            e.currentTarget.style.width = "100%"
            e.currentTarget.style.top = "0px"
            console.log("pointer up", e.currentTarget)
            if (dragItem.current !== null) {
                globalThis.lines = [...document.querySelectorAll(".draggable-line")];
                // creating array of objects that cotains the folowing info
                globalThis.heights = lines.map((line, indx) => {
                    let rec = line.getBoundingClientRect();
                    return { id: line.id, index: indx, Y: indx === index ? 0 : rec.height + rec.top };
                });
                console.log(heights)
                const current = heights.find((line) => { return (e.clientY) - (line.Y) < -10 });
                console.log(current)
                dragOverItem.current = { data: data[current.index], index: current.index }
                if (dragOverItem.current.data) {
                    const test = [...data];
                    test.splice(Number(dragItem.current.index), 1);
                    // Adding item to the array
                    console.log(dragOverItem.current.index, test)
                    test.splice(dragOverItem.current.index, 0, dragItem.current.data);
                    console.log(test)
                    dragItem.current = {
                        ...dragItem.current,
                        index: dragOverItem.current.index,
                    };
                    setData(test);
                    setRefresh((prev) => !prev);
                    dragItem.current = null
                }
            }
            clearTimeout(x)
            setTouch(false)
            y = null
            dragItem.current = null
        };

    }

    const onPointerCancel = (e) => {
        if (e.pointerType !== "mouse") {
            if (dragItem.current === null) {
                console.log("its clearing the setTimeout")
                clearTimeout(x)
            }
        }
    }

    return (
        <div
            id="container"
            className={`w-full grid grid-cols-1 ${touch ? " touch-none" : "touch-manipulation "} text-black `}
        >
            {data.map((line, index) => (
                <div
                    draggable
                    key={index}
                    id={line.id}
                    className={`w-full cursor-move draggable transition-transform touch-none draggable-line`}
                    className={`w-full cursor-move draggable transition-transform bg-red-300 draggable-line`}
                    onDragStart={(e) => onDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => onDragEnter(e, index)}
                    onDragLeave={(e) => onDragLeave(e, index)}
                    onDragEnd={(e) => onDragEnd(e, index)}

                    onPointerDown={(e) => pointerDown(e, index)}
                    onPointerMove={(e) => pointerMove(e, index)}
                    onPointerUp={(e) => pointerUp(e, index)}
                    onPointerCancel={(e) => { onPointerCancel(e) }}
                >
                    <SortableItemTest
                        key={line.id}
                        index={index}
                        id={line.id}
                        line={line}
                        value={`Item ${line.id}`}
                    />
                </div>
            ))}
        </div>
    );
}

DragTest.defaultProps = {
    data: [],
};

DragTest.propTypes = {
    data: PropTypes.array,
};

export default DragTest;
