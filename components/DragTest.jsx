import { useState, useRef, useEffect } from 'react'
import { PropTypes } from 'prop-types'
import SortableItemTest from './SortableItemTest'
function DragTest({ items }) {

    const [data, setData] = useState([...items])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        // getting all the lines    
        globalThis.lines = [...document.querySelectorAll(".draggable-line")]
        // creating array of objects that cotains the folowing info
        globalThis.heights = lines.map((line, index) => {
            let rec = line.getBoundingClientRect()
            return { id: line.id, index: index, Y: rec.height + rec.top }
        })
    }, [refresh])


    // ========= USERREFs =========
    // dragged line
    const dragItem = useRef(null)
    // the line that the pointer is over it after dragging a line
    const dragOverItem = useRef(null)


    // ===========================================
    // *************** MOUSE EVENTS **************
    // ===========================================
    const onDragStart = (e, index) => {
        dragItem.current = { data: data[index], index: index }
        console.log("start")
        e.target.classList.add("dragging")
    }

    const onDragEnter = (e, index) => {
        console.log("enter")
        e.preventDefault()
        dragOverItem.current = { data: data[index], index: index }
        // after dragging a line when entering new line add "dragging class"
        e.target.classList.add("dragging")
    }

    const onDragLeave = (e) => {
        e.preventDefault()
        console.log("leave")
        // after dragging a line when leaving an enteed line remove "dragging class"
        e.target.classList.remove("dragging")
    }

    const onDragEnd = (e) => {
        e.target.classList.remove("dragging")
        e.preventDefault()
        const test = [...data]
        test.splice(dragItem.current.index, 1)
        // Adding item to the array 
        test.splice(dragOverItem.current.index, 0, dragItem.current.data)
        dragItem.current = { ...dragItem.current, index: dragOverItem.current.index }
        setRefresh(prev => !prev)
        setData(test)
    }


    // ===========================================
    // *************** TOUCH EVENTS **************
    // ===========================================
    const onTouchMove = (e, index) => {
        // this is the same as dragOverItem useRef but it contains the dom reference
        const current = heights.find(line => e.touches[0].clientY - line.Y < 30)
        const over = lines.find(line => line.id === current.id)
        over.classList.add("dragging")

        // this block is for removing the dragging class after passing the line and hovering on new line
        if (current.index > 0) {
            lines[current.index - 1].classList.remove("dragging")
        }
        if (current.index < lines.length - 1) {
            lines[current.index + 1].classList.remove("dragging")
        }
    }


    const onTouchEnd = (e) => {
        e.target.classList.remove("dragging")
        const overItem = [...document.querySelectorAll(".dragging")][0]
        console.log(overItem)
        const hello = data.findIndex(item => item.id === Number(overItem.id))
        const test = [...data]
        test.splice(dragItem.current.index, 1)
        // Adding item to the array 
        test.splice(hello, 0, dragItem.current.data)
        dragItem.current = { ...dragItem.current, index: dragOverItem.current.index }
        setRefresh(prev => !prev)
        setData(test)
    }

    console.log(refresh)

    return (
        <div id="container" draggable className='w-full grid grid-cols-1 text-black bg-rose-300'>
            {data.map((line, index) => (
                <div
                    draggable
                    key={index}
                    id={line.id}
                    className={`w-full cursor-move draggable transition-transform touch-none draggable-line`}
                    onDragStart={(e) => onDragStart(e, index)}
                    onDragOver={(e) => e.preventDefault()}
                    onDragEnter={(e) => onDragEnter(e, index)}
                    onDragLeave={(e) => onDragLeave(e, index)}
                    onDragEnd={(e) => onDragEnd(e, index)}
                    onTouchStart={(e) => onDragStart(e, index)}
                    onPointerEnter={(e) => onDragEnter(e, index)}
                    onTouchMove={(e) => onTouchMove(e, index)}
                    onPointerOut={(e) => onDragLeave(e, index)}
                    onPointerUp={(e) => onTouchEnd(e, index)}
                >
                    <SortableItemTest key={line.id} index={index} id={line.id} line={line} value={`Item ${line.id}`} />
                </div>
            ))}
        </div>
    )
}


DragTest.defaultProps = {
    data: []
}

DragTest.propTypes = {
    data: PropTypes.array
}

export default DragTest