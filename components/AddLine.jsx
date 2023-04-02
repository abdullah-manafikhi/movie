import { useContext } from 'react'
import TableContext from './context/TableContext.js'

function AddLine({ index }) {

    const { addLine, setAddLine, adding, setAdding } = useContext(TableContext)

    const addDay = (e) => {
        setAddLine({index: index, type: "day", value: "new Day"})
        setAdding({isAdding: true, id: null})
    }

    const addNote = (e) => {
        setAddLine({index: index, type: "note", value: "New note"})
        setAdding({isAdding: true, id: null})
    }

    return (
        <div className='w-full grid grid-cols-2 justify-items-center py-4'>
            <span onClick={(e) => addDay(e)} className='btn glass bg-slate-300 text-black'>Day line <span className='font-bold text-2xl mx-2 mb-2'>+</span></span>
            <span onClick={(e) => addNote(e)} className='btn glass bg-slate-300 text-black'>Note line <span className='font-bold text-2xl mx-2 mb-2'>+</span></span>
        </div>
    )
}

export default AddLine