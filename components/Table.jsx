import { useState, useEffect, useContext } from 'react';
import Link from 'next/link'
import TableContext from './context/TableContext.js';
import Skeleton from './Skeleton.jsx';
import DndUI from './DndUI'
import DragTest from './DragTest.jsx';
import sortAccordingFor from "./functions/sort.js";
import { BiCaretDown, BiCaretup, BiBrush } from 'react-icons/bi'
import { DATA } from '../assets/data2'
import { PopOver } from '../components/PopOver'


// import { VariableSizeList as List } from 'react-window';



function Table() {

    //scenes with out day 
    const [itemPure, setItemPure] = useState([]) 
    // This state is for lines colors "INT, EXT, DAYS"
    const [style4, setStyle4] = useState({
        INT: { backgroundColor: "#E3F6FF", color: "#000000" },
        EXT: { backgroundColor: "#8DCBE6", color: "#000000" },
        DAYS: { backgroundColor: "#9DF1DF", color: "#000000" }
    })
    // const [sortItem , setSortItem] = useState([]) //sence with out day 
    // const [items, setItems] = useState([])
    
    const { adding, setAdding, daysMap, items, setItems } = useContext(TableContext)

    function sortby(prop) {
        const arrayAfterSort = sortAccordingFor(itemPure, prop, 1, 'id', 0)
        const sortAndDay = addingDays(arrayAfterSort)
        setItems(sortAndDay)
        console.log(` sort by ${prop} `)
    }

    useEffect(() => {
        // (async () => {
        //     const test = await fetch("http://movieapp-env.eba-xgguxtgd.us-west-1.elasticbeanstalk.com/api/stripboards/10")
        //     const res = await test.json()
        //     setItemPure(res.table_content)
        //     setItems(addingDays(res.table_content))
        // })()
        console.log(DATA)
        setItemPure(DATA.table_content)
        setItems(addingDays(DATA.table_content))
    }, [])
    // useEffect(() => {
    //     // console.table(res.table_content)
    //     const hello = addingDays(itemPure)
    //     console.log(hello)
    //     setItems(hello)

    // }, [itemPure])


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
        console.log(data)
        console.table(finalArr)
        return finalArr
    }

    const handlePrint = () => {
        if (typeof (window) !== "undefinded") {
            window.print()
        }
    }

    const onChangeColor = (clr, day) => {
        console.log(clr, day)
        setStyle4(prevState => ({
            ...prevState,
            [day]: { backgroundColor: clr, color: "#000000" }
        }))
    }
    const presetColors = ["#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808", "#9a2151", "#9a2151", "#9a2151", "#9a2151"];

    return (
        <div className={``}>
            <h1 className=' text-2xl font-bold mx-auto w-fit my-8 '>{DATA.name} Strip Board</h1>

            <div className="noprintdplay w-1/2 h-18 mx-auto p-4 flex justify-evenly">
                {!adding.isAdding ? (
                    <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-y-2 px-4 h-6 rounded ms-3'>
                        <Link href="/print"> save</Link>
                    </button>) : ""
                }

                <label htmlFor="my-modal-4" className="btn flex flex-auto justify-evenly">
                    Design <BiBrush />
                </label>

                {/* Put this part before </body> tag */}
                <input type="checkbox" id="my-modal-4" className="modal-toggle" />
                <label htmlFor="my-modal-4" className="modal cursor-pointer overflow-visible">
                    <label className="modal-box relative overflow-visible" htmlFor="">
                        <div className="flex flex-auto justify-between h-fit overflow-visible my-3">
                            <span>Day lines color</span>
                            <span><PopOver color="#ffffff" onChange={(clr) => onChangeColor(clr, "DAYS")} presetColors={presetColors} /></span>
                        </div>
                        <div className="flex flex-auto justify-between h-fit overflow-visible my-3">
                            <span>INT lines color</span>
                            <span><PopOver color="#ffffff" onChange={(clr) => onChangeColor(clr, "INT")}  presetColors={presetColors} /></span>
                        </div>
                        <div className="flex flex-auto justify-between h-fit overflow-visible my-3">
                            <span>EXT lines color</span>
                            <span><PopOver color="#ffffff" onChange={(clr) => onChangeColor(clr, "EXT")}  presetColors={presetColors} /></span>
                        </div>
                    </label>
                </label>
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
                        <span onClick={() => sortby('id')} className='text-white flex h-full items-center text-sm sm:text-lg font-bold m-auto'>
                            Scene No.   <BiCaretDown className='self-end' />
                        </span>
                        <span onClick={() => sortby('camera')} className='text-white h-full flex items-center text-sm sm:text-lg font-bold m-auto'>
                            Camera   <BiCaretDown className='self-end' />
                        </span>
                        <span onClick={() => sortby('summary')} className='text-white h-full flex items-center text-sm sm:text-lg font-bold m-auto'>
                            Summary   <BiCaretDown className='self-end' />
                        </span>
                        <span onClick={() => sortby('location')} className='text-white h-full flex items-center text-sm sm:text-lg font-bold m-auto'>
                            Location   <BiCaretDown className='self-end' />
                        </span>
                        <span onClick={() => sortby('page_length')} className='text-white h-full flex items-center text-sm sm:text-lg font-bold mx-8'>
                            Page length   <BiCaretDown className='self-end' />
                        </span>

                    </div>
                    {/* This component is for the rest of the table that has the DnD functionality */}
                    {items.length > 0 ? <DragTest items={items} style={style4} /> : (<Skeleton />)}
                </div>
            </main>

        </div>
    )
}

export default Table