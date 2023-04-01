import { useState, useRef, useEffect } from 'react';
import { useContext } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BiTrash, BiEditAlt ,BiCross ,BiTv } from 'react-icons/bi'
import TableContext from './context/TableContext.js';
import { PopOver } from '../components/PopOver'
import AddLine from './AddLine.jsx';


function SortableItem(props) {
    // this is the table line "row" data
    const [formData, setFormData] = useState(props.line)

    const [inputDisabled, setInputDisabled] = useState(true)

    const [style3, setStyle3] = useState({ backgroundColor: "" })

    // getting the table from the context
    const { cursor, daysMap, setDaysMap, isAdding } = useContext(TableContext)
    // This for focusing on the scene input when updateing start
    const firstInputRef = useRef()

    const { attributes, listeners, setNodeRef, transform, transition, } = useSortable({
        id: props.id, transition: {
            duration: 150, // milliseconds
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        }
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // functions start here
    // This function is reponsible for allowing the user to save the edits that he/she made is on the row 
    const saveIconHundler = (e)=> {
        console.log("save me pls im :" ,e.currentTarget) 
        // do some save action here 
        window.alert( "you edit the sence number (XX) saved " )
        // window.alert(  )

        setInputDisabled(  prevState => { 
            console.log (prevState) 
            return true
        })

    }
    
    const cancelIconHundler = (e)=> {
        console.log("cancel me pls im :" ,e.currentTarget)
        setInputDisabled(  prevState => { 
            console.log (prevState) 
            return true
        })
    }

    const addNewNoteHundler = () => { 
        setInputDisabled(  prevState => { 
            console.log (prevState) 
            return true
        })
    }  
    const addNewSceneHundler = () => { 
        setInputDisabled(  prevState => { 
            console.log (prevState) 
            return true
        })
    }  

    // This function is reponsible for allowing the user to edit the row, focusing on the first input and highliting its text 
    const onEditClick = (e) => {
        console.log(e.currentTarget)
        setInputDisabled(prevState => {
            if (prevState) {
                setTimeout(() => {
                    firstInputRef.current.focus(); // onEditClick => focus=> showing problem on click  on day or note becuase there is no text area 
                    firstInputRef.current.setSelectionRange(0, firstInputRef.current.value.length);
                    console.log("focused");
                }, 100);
            }
            return !prevState
        })
    }

    // This is for keeping the textarea's height equal to the value's height 
    // and avoiding the scroll bar inside the textarea 
    const onChange = (e) => {
        const trgt = e.currentTarget
        trgt.style.height = "auto";
        trgt.style.height = trgt.scrollHeight + "px";
    }


    // for (let i = 0; i < daysMap.data.length; ++i) {
    //     if (props.index <= daysMap.data[i].index) {
    //         setStyle3(prevState => (
    //             {
    //                 ...prevState,
    //                 backgroundColor: daysMap.colors[daysMap.data[i].id] === "white" ? LsColors[daysMap.data[i].id] : daysMap.colors[daysMap.data[i].id]
    //             }
    //         ))
    //         break;
    //     }
    // }

    useEffect(() => {
        if (daysMap !== null) {
            console.log(daysMap.data)
            const LsColors = JSON.parse(localStorage.getItem("colors"))
            let l = -1
            let r = daysMap.data.length - 1
            let mid = 0
            console.log(props.index)

            // =====================================
            // *********** BINARY SEARCH ************
            // ======================================

            // This loop determines the line colors useing dpending on the day line color using binary search
            while (l + 1 < r) {
                mid = Math.floor((l + r) / 2)
                if (props.index <= daysMap.data[mid].index) {
                    r = mid
                }
                else if (props.index >= daysMap.data[mid].index) {
                    l = mid
                }
            }

            setStyle3(prevState => (
                {
                    ...prevState,
                    backgroundColor: daysMap.colors[daysMap.data[r].id] === "white" ? LsColors[daysMap.data[r].id] : daysMap.colors[daysMap.data[r].id]
                }
            ))

            console.log(l, r)

            if (Object.hasOwn(formData, "day")) {
                setStyle3(prevState => (
                    {
                        ...prevState,
                        backgroundColor: daysMap.colors[formData.id] === "white" ? LsColors[formData.id] : daysMap.colors[formData.id]
                    }
                ))
            }
        }
    }, [daysMap])


    const onChangeColor = (clr) => {
        console.log(props.id, clr)
        setDaysMap(prevState => {
            localStorage.setItem("colors", JSON.stringify({ ...prevState.colors, [formData.id]: clr }))
            return {
                data: prevState.data,
                colors: { ...prevState.colors, [formData.id]: clr }
            }
        })
    }


    if (daysMap === null) {
        return (<h2>Loading...</h2>)
    }

    else {
        // ========== DAYS LINES ===========
        if (props.line.day) {
            return (
                    <div ref={setNodeRef} style={style}  {...attributes} {...listeners}>
                        <div title="Hold to Drag!" style={style3} className={`row-grid-day touch-manipulation z-1 ${cursor} `}>
                            <span className='w-full noprintdplay m-auto flex justify-evenly'>
                                <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => onEditClick(e)}>{inputDisabled === true ?  <BiEditAlt/>: <BiCross />}</button> 
                                <label className='z-50 btn btn-xs btn-ghost text-red-600' htmlFor="my-modal-3" onClick={() => console.log("dleete")}>{inputDisabled === true ?  <BiTrash/>: <BiTv />}</label>
                            </span>
                            <span className='my-auto'>
                                {formData.day}
                            </span>
                            <PopOver color={daysMap.colors[formData.id]} onChange={onChangeColor} />
                        </div>
                        <div className="w-full flex flex-auto justify-end">
                            <button className={`${inputDisabled ? "hidden" : ""} btn btn-ghost w-auto`}>submit</button>
                        </div>
                        {/* this is the module that will display the delete confirm when clicking on the delete button*/}
                        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                        <div className="modal">
                            <div className="modal-box">
                                <p className="py-4">Are you sure you want to delete <strong>{formData.scene}</strong>!</p>
                                <div className="modal-action">
                                    <label htmlFor="my-modal-3" className="btn btn-ghost">Cancel</label>
                                    <label htmlFor="my-modal-3" className="btn bg-red-500 border-none">Delete</label>
                                </div>
                            </div>
                        </div>
                        {isAdding ? (<AddLine />) : ""}
                    </div>
            )
        }
        // ========== NOTES LINES ===========
        else if (props.line.note) {
            return (
                <div ref={setNodeRef} style={style}  {...attributes} {...listeners}>
                    <div title="Hold to Drag!" style={style3} className={`row-grid-day touch-manipulation z-1 ${cursor}`}>
                        <span className='w-auto noprintdplay m-auto flex justify-evenly'>
                        {/* inputDisable ?  *** ENOUGH *** */}
                        {inputDisabled === true ?  
                        <>
                            <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => onEditClick(e)}><BiEditAlt/></button> 
                            <label className='z-50 btn btn-xs btn-ghost text-red-600' htmlFor="my-modal-3" onClick={() => console.log("dleete")}><BiTrash/></label>
                        </>: 
                        <>  
                            <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => saveIconHundler(e)}>save</button> 
                            <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => cancelIconHundler(e)}>cancel</button> 
                        </>}
                        </span> 
                        <span className='my-auto'>
                            {formData.note}
                        </span>
                    </div>
                    <div className="w-full flex flex-auto justify-end">
                        <button onClick={addNewSceneHundler } className={`${inputDisabled ? "hidden" : ""} btn m-3 text-white font-bold bg-blue-500 btn-ghost w-auto`}>add new line</button>
                        <button onClick={addNewNoteHundler } className={`${inputDisabled ? "hidden" : ""} btn m-3 text-white font-bold bg-blue-500 btn-ghost w-auto`}>add new note</button>
                    </div>
                    {/* this is the module that will display the delete confirm when clicking on the delete button*/}
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <p className="py-4">Are you sure you want to delete <strong>{formData.scene}</strong>!</p>
                            <div className="modal-action">
                                <label htmlFor="my-modal-3" className="btn btn-ghost">Cancel</label>
                                <label htmlFor="my-modal-3" className="btn bg-red-500 border-none">Delete</label>
                            </div>
                        </div>
                    </div>
                    {isAdding ? (<AddLine />) : ""}
                </div>
            )
        }
        // =========== SCENE LINES ===========
        else {
            return (
                <div ref={setNodeRef} style={style}  {...attributes} {...listeners}>
                    <div title="Hold to Drag!" style={style3} className={`row-grid touch-manipulation z-1 ${cursor}`}>
                        <span className='w-full noprintdplay m-auto flex justify-evenly'>
                            <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => onEditClick(e)}>{inputDisabled === true ?  <BiEditAlt/>: <BiCross />}</button> 
                            <label className='z-50 btn btn-xs btn-ghost text-red-600' htmlFor="my-modal-3" onClick={() => console.log("dleete")}>{inputDisabled === true ?  <BiTrash/>: <BiTv />}</label>
                        </span>
                        <span className='my-auto'>
                            <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.scene} ref={firstInputRef}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </span>
                        <span className='my-auto'>
                            <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.camera}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </span>
                        <span className='my-auto'>
                            <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.summary}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </span>
                        <span className='my-auto'>
                            <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.location}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </span>
                        <span className='my-auto'>
                            <textarea
                                type="text" placeholder="" defaultValue={formData.page_length}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </span>
                    </div>
                    <div className="w-full flex flex-auto justify-end">
                        <button className={`${inputDisabled ? "hidden" : ""} btn btn-ghost w-auto`}>submit</button>
                    </div>
                    {/* this is the module that will display the delete confirm when clicking on the delete button*/}
                    <input type="checkbox" id="my-modal-3" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <p className="py-4">Are you sure you want to delete <strong>{formData.scene}</strong>!</p>
                            <div className="modal-action">
                                <label htmlFor="my-modal-3" className="btn btn-ghost">Cancel</label>
                                <label htmlFor="my-modal-3" className="btn bg-red-500 border-none">Delete</label>
                            </div>
                        </div>
                    </div>
                    {isAdding ? (<AddLine />) : ""}
                </div>
            )
        }

    }

}

export default SortableItem