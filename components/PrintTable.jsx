import { useContext, useState, useEffect } from 'react';
import TableContext from './context/TableContext.js';
// import DndUI from './DndUI'
import SortableItemForPrint from './SortableItemForPrint';
import { initialLines } from "../assets/data"


function PrintTable() {
    
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





    return (
        <div className="container m-auto justify-center align-center flex-col">
            <>
                {/*  <!-- Add a button to trigger the PDF export --> */}
                <h1 className=' text-2xl font-bold mx-auto w-fit my-8 '>Title Strip Board</h1>
                <main className='my-container printpage'>
                    <div className='table-grid'>
                        {/* This is the main row where the columns names sits */}
                        <div id="tableTitle" className="row-grid">
                            <span className='text-white text-sm sm:text-lg font-bold m-auto'>Scene No.</span>
                            <span className='text-white text-sm sm:text-lg font-bold m-auto'>Camera</span>
                            <span className='text-white text-sm sm:text-lg font-bold m-auto'>Summary</span>
                            <span className='text-white text-sm sm:text-lg font-bold m-auto'>Location</span>
                            <span className='text-white text-sm sm:text-lg font-bold mx-8'>Scene Length</span>
                        </div>
                        {/* This component is for the rest of the table that has the DnD functionality */}
                        {items.map((line, index) =>
                            <SortableItemForPrint
                                key={line.id}
                                 index={index} 
                                 id={line.id} 
                                 line={line}
                                  value={`Item ${line.id}`}
                            />)}

                    </div>
                </main>
            </>
        </div>

    )
    
}

export default PrintTable ;
