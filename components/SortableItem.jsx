import { useState, useRef, useEffect } from 'react';
import { useContext } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BiTrash, BiEditAlt, BiCross, BiTv } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import TableContext from './context/TableContext.js';
import { PopOver } from '../components/PopOver'
import AddLine from './AddLine.jsx';


function SortableItem(props) {
    // this is the table line "row" data
    const [formData, setFormData] = useState(props.line)

    const [inputDisabled, setInputDisabled] = useState(true)

    const [style3, setStyle3] = useState({ backgroundColor: "" })

    // getting the table from the context
    const { cursor, daysMap, setDaysMap, adding, setAdding } = useContext(TableContext)
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
    const saveIconHundler = (e) => {
        console.log("save me pls im :", e.currentTarget)
        // do some save action here 
        window.alert("you edit the sence number (XX) saved ")

        setInputDisabled(prevState => {
            console.log(prevState)
            return true
        })

    }

    const cancelIconHundler = (e) => {
        console.log("cancel me pls im :", e.currentTarget)
        setInputDisabled(prevState => {
            console.log(prevState)
            return true
        })
    }

    const addNewNoteHundler = () => {
        setInputDisabled(prevState => {
            console.log(prevState)
            return true
        })
    }
    const addNewSceneHundler = () => {
        setInputDisabled(prevState => {
            console.log(prevState)
            return true
        })
    }

    // This function is reponsible for allowing the user to edit the row, focusing on the first input and highliting its text 
    const onEditClick = (e) => {
        console.log(e.currentTarget)
        setInputDisabled(prevState => {
            if (prevState) {
                if(firstInputRef.current){
                    setTimeout(() => {
                        firstInputRef.current.focus(); // onEditClick => focus=> showing problem on click  on day or note becuase there is no text area 
                        firstInputRef.current.setSelectionRange(0, firstInputRef.current.value.length);
                        console.log("focused");
                    }, 100);
                }
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

    const styleSummary = useRef()
    useEffect(() => {
        setTimeout(() => {
            const trgt =  [...document.querySelectorAll("textarea")]
            trgt.forEach(element => {
                console.log(element)
                element.style.height = "auto";
                element.style.height = trgt.scrollHeight + "px";
            });
        }, 1000);
    }, [inputDisabled])
    


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
            const LsColors = JSON.parse(localStorage.getItem("colors"))
            let l = -1
            let r = daysMap.data.length - 1
            let mid = 0

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
                        <span className=' w-auto noprintdplay m-auto flex justify-evenly'>
                        {inputDisabled  ?  
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
                            <input
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.day} ref={firstInputRef}
                                className={`input input-ghost text-center resize-none w-full font-extrabold max-w-xs scroll-day ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </span>
                        <div className="flex justify-center">
                            <PopOver color={daysMap.colors[formData.id]} onChange={onChangeColor} />
                            {adding.isAdding ? (<button className='btn btn-xs btn-ghost text-blue-500 text-xl my-auto mr-4'>
                                <AiOutlinePlus onClick={() => setAdding({ isAdding: true, id: formData.id })} />
                            </button>) : ""}
                        </div>
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
                    {adding.isAdding && formData.id === adding.id ? (<AddLine index={props.index} />) : ""}
                </div>
            )
        }
        // ========== NOTES LINES ===========
        else if (props.line.note) {
            return (
                <div ref={setNodeRef} style={style}  {...attributes} {...listeners}>
                    <div title="Hold to Drag!" style={style3} className={`row-grid-note touch-manipulation z-1 ${cursor}`}>
                        <span className='w-auto noprintdplay m-auto flex justify-evenly'>
                            {/* inputDisable ?  *** ENOUGH *** */}
                            {inputDisabled === true ?
                                <>
                                    <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => onEditClick(e)}><BiEditAlt /></button>
                                    <label className='z-50 btn btn-xs btn-ghost text-red-600' htmlFor="my-modal-3" onClick={() => console.log("dleete")}><BiTrash /></label>
                                </> :
                                <>
                                    <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => saveIconHundler(e)}>save</button>
                                    <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => cancelIconHundler(e)}>cancel</button>
                                </>}
                        </span>
                        <span className='my-auto'>
                            <input
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.note} ref={firstInputRef}
                                className={`input input-ghost text-center resize-none w-full font-extrabold max-w-xs scroll-day ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </span>
                        {adding.isAdding ? (<button className='btn btn-xs btn-ghost text-blue-500 text-xl my-auto ml-2'>
                            <AiOutlinePlus onClick={() => setAdding({ isAdding: true, id: formData.id })} />                        </button>) : ""}
                    </div>
                    <div className="w-full flex flex-auto justify-end">
                        <button onClick={addNewSceneHundler} className={`${inputDisabled ? "hidden" : ""} btn m-3 text-white font-bold bg-blue-500 btn-ghost w-auto`}>add new line</button>
                        <button onClick={addNewNoteHundler} className={`${inputDisabled ? "hidden" : ""} btn m-3 text-white font-bold bg-blue-500 btn-ghost w-auto`}>add new note</button>
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
                    {adding.isAdding && formData.id === adding.id ? (<AddLine index={props.index} />) : ""}
                </div>
            )
        }
        // =========== SCENE LINES ===========
        else {
            return (
                <div ref={setNodeRef} style={style}  {...attributes} {...listeners}>
                    <div title="Hold to Drag!" style={style3} className={`row-grid touch-manipulation z-1 ${cursor}`}>
                    <span className='w-full  noprintdplay m-auto flex'>

                        <span>
                            {inputDisabled  ?  
                        <>
                            <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => onEditClick(e)}><BiEditAlt/></button> 
                            <label className='z-50 btn btn-xs btn-ghost text-red-600' htmlFor="my-modal-3" onClick={() => console.log("dleete")}><BiTrash/></label>
                        </>: 
                        <>  
                            <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => saveIconHundler(e)}>save</button> 
                            <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => cancelIconHundler(e)}>cancel</button> 
                        </>}
                        </span>
                        </span> 
                        <span className='my-auto'>
                        {inputDisabled  ?  
                        <>
                        <span className=" ">{formData.scene}</span>
                        </>: 
                        <>  
                            <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.scene} ref={firstInputRef}
                                className={`textarea textarea-ghost bg-none textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </>
                        }
                        </span>
                        <span className='my-auto'>
                        {inputDisabled  ?  
                        <>
                        <span className=" ">{formData.camera}</span>
                        </>: 
                        <>  
                            <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.camera}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </>
                        }
                        </span>
                        <span className='my-auto'>
                        {inputDisabled  ?  
                        <>
                        <span className=" ">{formData.summary}</span>
                        </>: 
                        <>  
                            <textarea
                                ref={styleSummary}
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.summary} 
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </>
                        }
                        </span>
                        <span className='my-auto'>
                        {inputDisabled  ?  
                        <>
                        <span className=" ">{formData.location}</span>
                        </>: 
                        <>  
                            <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.location}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                            </>}
                        </span>
                        <span className='my-auto flex justify-center'>
                        {inputDisabled  ?  
                        <>
                        <span className=" ">{formData.page_length}</span>
                        </>: 
                        <>
                            <textarea
                                type="text" placeholder="" defaultValue={formData.page_length}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            />
                        </>}
                            {adding.isAdding ? (<button className='btn btn-xs btn-ghost text-blue-500 text-xl my-auto mr-2'>
                                <AiOutlinePlus onClick={() => setAdding({ isAdding: true, id: formData.id })} />
                            </button>) : ""}
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
                    {adding.isAdding && formData.id === adding.id ? (<AddLine index={props.index} />) : ""}
                </div>
            )
        }

    }

}

export default SortableItem