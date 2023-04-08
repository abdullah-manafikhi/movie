import { useState, useEffect, useContext } from 'react';
import Link from 'next/link'
import TableContext from './context/TableContext.js';
import Skeleton from './Skeleton.jsx';
import DndUI from './DndUI'
import DragTest from './DragTest.jsx';
import { VariableSizeList as List } from 'react-window';



function Table() {

    const { adding, setAdding, daysMap } = useContext(TableContext)
    const [items, setItems] = useState([])


    useEffect(() => {
        (async () => {
            const test = await fetch("http://movieapp-env.eba-xgguxtgd.us-west-1.elasticbeanstalk.com/api/stripboards/10")
            const res = await test.json()
            console.log(res.table_content)
            const hello = addingDays(res.table_content)
            setItems(hello)
        })()
    }, [])

    const addingDays = (data) => {
        let counter = 0
        let dayCount = 2
        let finalArr = [{ id: `d_${1}`, day: `Day ${1}`, counter: 0 }]
        data.forEach((line, index) => {
            counter += line.page_length
            if (counter > 4.5) {
                finalArr.push({ id: `d_${dayCount}`, day: `Day ${dayCount}`, counter: counter })
                ++dayCount
                counter = 0
            }
            finalArr.push(line)
        })
        return finalArr
    }

    const handlePrint = () => {
        if (typeof (window) !== "undefinded") {
            window.print()
        }
    }

    return (
        <div className={``}>
            {/* <button id="export-btn">Export to PDF</button> */}
            <div className="noprintdplay w-1/2 mx-auto p-4 flex justify-evenly">
                {!adding.isAdding ? (
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-y-2 px-4 rounded ms-3'>
                        <Link href="/print"> save</Link>
                    </button>) : ""
                }
            </div>
            {/* <button id="export-btn">Export to PDF</button> */}
            <div className="noprintdplay mx-auto p-4 fixed bottom-12 right-1 opacity-100 z-50 grid justify-items-end">
                <button onClick={() => setAdding(prevState => ({ ...prevState, isAdding: !prevState.isAdding }))} className={`btn ${adding.isAdding ? "btn-error" : "btn-success"} h-16 w-16 relative rounded-full`}>
                    <span className={`font-normal ${adding.isAdding ? "text-2xl mb-1" : "text-5xl mb-2"} text-2xl rounded-full h-fit w-fit text-white`}>
                        {adding.isAdding ? "x" : "+"}
                    </span>
                </button>
            </div>
            <main className='my-container'>
                <div draggable className='table-grid '>
                    {/* This is the main row where the columns names sits */}
                    <div id="tableTitle" className="row-grid">
                        <span className='text-white noprintdplay text-sm sm:text-lg font-bold mx-8'></span>
                        <span className='text-white text-sm sm:text-lg font-bold m-auto'>Scene No.</span>
                        <span className='text-white text-sm sm:text-lg font-bold m-auto'>Camera</span>
                        <span className='text-white text-sm sm:text-lg font-bold m-auto'>Summary</span>
                        <span className='text-white text-sm sm:text-lg font-bold m-auto'>Location</span>
                        <span className='text-white text-sm sm:text-lg font-bold mx-8'>Page length</span>
                    </div>
                    {/* This component is for the rest of the table that has the DnD functionality */}
                    {items.length > 0 ? (<DragTest items={items} />) : (<Skeleton />)}
                </div>
            </main>

        </div>
    )
}

// <table id="table" className={`${styles["table"]}`}>
// <thead>
//     <tr>
//         <th>Scene No.</th>
//         <th>Camera</th>
//         <th>Summary</th>
//         <th>Location</th>
//         <th>Scene Length</th>
//     </tr>
// </thead>
// <tbody>
//     {
//         lines.map((line, index) => (
//             <>
//                 {/* {% for line in table_data %}
//                         {% if line.scene %} */}
//                 <tr key={index} className={`${styles["scenes"]}`}>
//                     <td>{line.scene}</td>
//                     {/* {% if line.camera == 'EXT.' %} */}
//                     <td className={`${styles["camera-ext"]}`}>{line.camera}</td>
//                     {/* {% elif line.camera == 'INT.' %} */}
//                     {/*  */}
//                     {/* {% endif %} */}
//                     <td>{line.summary}</td>
//                     <td>{line.location}</td>
//                     <td>{line.page_length}</td>
//                 </tr>
//                 {/* {% else %} */}
//                 <tr className={`${styles["days"]}`}>
//                     <td colSpan="5"> Day {line.day}</td>
//                 </tr>
//                 {/* {% endif %} {% endfor %} */}
//             </>
//         ))
//     }

// </tbody>
// </table>

export default Table