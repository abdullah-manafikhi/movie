import { useState, useRef } from 'react';
import { useContext } from "react";
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { BiTrash, BiEditAlt } from 'react-icons/bi'
import TableContext from './context/TableContext.js';

function SortableItem(props) {
    // this is the table line "row" data
    const [formData, setFormData] = useState(props.line)
    // getting the table from the context
    const { cursor } = useContext(TableContext)
    const [inputDisabled, setInputDisabled] = useState(true)
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

    // this is functionnis reponsible for alowing the user to edit the row, focusing on the first input and highliting its text and 
    const onEditClick = (e) => {
        console.log(e.currentTarget)
        setInputDisabled(prevState => {
            if (prevState) {
                setTimeout(() => {
                    firstInputRef.current.focus();
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

    if (props.line.day) {
        return (
            <div ref={setNodeRef} style={style}  {...attributes} {...listeners}>
                <div title="Hold to Drag!" className={`row-grid-day touch-manipulation z-1 ${cursor}`}>
                    <span className='w-full noprint m-auto flex justify-evenly'>
                        <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => onEditClick(e)}><BiEditAlt /></button>
                        <label className='z-50 btn btn-xs btn-ghost text-red-600' htmlFor="my-modal-3" onClick={() => console.log("dleete")}><BiTrash /></label>
                    </span>
                    <div className='m-auto w-full  flex justify-center'>
                    <span className='m-auto w-full '>
                        {formData.day}
                    </span>
                    </div>
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
            </div>
        )
    }
    else if (props.line.note) {
        return (
            <div ref={setNodeRef} style={style}  {...attributes} {...listeners}>
                <div title="Hold to Drag!" className={`row-grid-day touch-manipulation z-1 ${cursor}`}>
                    <span className='w-full m-auto flex justify-evenly'>
                        <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => onEditClick(e)}><BiEditAlt /></button>
                        <label className='z-50 btn btn-xs btn-ghost text-red-600' htmlFor="my-modal-3" onClick={() => console.log("dleete")}><BiTrash /></label>
                    </span>
                    <span className='my-auto'>
                        {formData.note}
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
            </div>
        )
    }
    else {
        return (
            <div ref={setNodeRef} style={style}  {...attributes} {...listeners}>
                <div title="Hold to Drag!" className={`row-grid touch-manipulation z-1 ${cursor}`}>
                    <span className='w-full m-auto flex justify-evenly'>
                        <button className='z-50 btn btn-xs btn-ghost' onClick={(e) => onEditClick(e)}><BiEditAlt /></button>
                        <label className='z-50 btn btn-xs btn-ghost text-red-600' htmlFor="my-modal-3" onClick={() => console.log("dleete")}><BiTrash /></label>
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
            </div>
        )
    }

}

export default SortableItem