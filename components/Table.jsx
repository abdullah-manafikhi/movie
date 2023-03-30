import DndUI from './DndUI'

function Table() {

    return (
        <div className={``}>
            {/* <button id="export-btn">Export to PDF</button>
            <button id="edit-btn">Edit Cells</button> */}
            <main className='my-container'>
                <div className='table-grid'>
                    {/* This is the main row where the columns names sits */}
                    <div id="tableTitle" className="row-grid">
                        <span className='text-white noprintdplay text-sm sm:text-lg font-bold mx-8'>tools</span>
                        <span className='text-white text-sm sm:text-lg font-bold m-auto'>Scene No.</span>
                        <span className='text-white text-sm sm:text-lg font-bold m-auto'>Camera</span>
                        <span className='text-white text-sm sm:text-lg font-bold m-auto'>Summary</span>
                        <span className='text-white text-sm sm:text-lg font-bold m-auto'>Location</span>
                        <span className='text-white text-sm sm:text-lg font-bold mx-8'>Scene Length</span>
                    </div>
                    {/* This component is for the rest of the table that has the DnD functionality */}
                    <DndUI />
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