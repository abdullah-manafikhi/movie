import React from 'react'

function AddLine() {
    return (
        <div className='w-full grid grid-cols-2 justify-items-center py-4'>
            <span className='btn glass bg-slate-300 text-black'>Day line <span className='font-bold text-2xl mx-2 mb-2'>+</span></span>
            <span className='btn glass bg-slate-300 text-black'>Note line <span className='font-bold text-2xl mx-2 mb-2'>+</span></span>
        </div>
    )
}

export default AddLine