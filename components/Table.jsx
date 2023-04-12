import { useState, useEffect, useContext , useRef} from 'react';
import Link from 'next/link'
import TableContext from './context/TableContext.js';
import Skeleton from './Skeleton.jsx';
import DndUI from './DndUI'
import DragTest from './DragTest.jsx';
import sortAccordingFor from "./functions/sort.js";
import { BiCaretDown, BiCaretup } from 'react-icons/bi'

// import { VariableSizeList as List } from 'react-window';

var currentsort = []

function Table() {

    const [sortPrimery, setSortPrimery] = useState('id');
    const [sortSecond, setSortSecond] = useState('id');
    const { adding, setAdding, daysMap } = useContext(TableContext)
    const [itemPure, setItemPure] = useState([]) //sence with out day 
    // const [sortItem , setSortItem] = useState([]) //sence with out day 
    const [items, setItems] = useState([])

    function sortby(prop) {
        const arrayAfterSort = sortAccordingFor(itemPure, prop, 1, 'id', 0)
        const sortAndDay = addingDays(arrayAfterSort)
        setItems(sortAndDay)
        currentsort = [ prop, 1, 'id', 0]
        console.log(currentsort)
        // console.table(itemPure)
        console.log(` sort by ${prop} `)
    }
    const onOptionChangeHandler1 = (event) => {
        setSortPrimery(event.target.value)
        console.log("User Sel- ", sortPrimery)

    }
    const onOptionChangeHandler2 = (event) => {
        setSortSecond(event.target.value)        
    }    
    useEffect(() => {
        const arrayAfterSort = sortAccordingFor(itemPure,sortPrimery , 1, sortSecond, 1)
        const sortAndDay = addingDays(arrayAfterSort)
        setItems(sortAndDay)
        // id
        // camera
        // summary
        // location
        // page_length
        


         
        
        console.log("done ", sortPrimery, sortSecond)
        
    }, [sortPrimery, sortSecond]) 
    
    const cameraTag = useRef(null)
    const sceneTag = useRef(null)
    const locatiomTag = useRef(null)
    const lenthTag = useRef(null)
    const summeryTag = useRef(null)
    
    const defaultSort = () =>{
        setSortPrimery('id')
        setSortSecond('id')
        console.dir(cameraTag.current.style.display )
        cameraTag.current.style.display  = ''
    }
    const theadSortbyHundler = (e) => {
        setSortPrimery(`${e}`)



    }    

    useEffect(() => {
        (async () => {
            const test = await fetch("http://movieapp-env.eba-xgguxtgd.us-west-1.elasticbeanstalk.com/api/stripboards/10")
            const res = await test.json()
            console.log("fitsh")
            setItemPure(res.table_content)
            setItems(addingDays(res.table_content))
        })()
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
                {/* {!adding.isAdding ? ( */}
                    {/* // <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-y-2 px-4 rounded ms-3'> */}
                         {/* <Link href="/print"> save</Link> */}
                    {/* // </button>) : "" */}
                {/* } */}

            </div>


            {/* <button id="export-btn">Export to PDF</button> */}
            <div className="noprintdplay mx-auto p-4 fixed bottom-12 right-1 opacity-100 z-50 grid justify-items-end">
                <button onClick={() => setAdding(prevState => ({ ...prevState, isAdding: !prevState.isAdding }))} className={`btn ${adding.isAdding ? "btn-error" : "btn-success"} h-16 w-16 relative rounded-full`}>
                    <span className={`font-normal ${adding.isAdding ? "text-2xl mb-1" : "text-5xl mb-2"} text-2xl rounded-full h-fit w-fit text-white`}>
                        {adding.isAdding ? "x" : "+"}
                    </span>
                </button>
            </div>

                <div className='w-fit m-auto'> 
                    
                <div className="navbar bg-base-300 rounded-box my-4">
                    <div className="flex justify-end flex-1 px-2">
                        <div className="flex  items-center  ">
                        <a onClick={defaultSort} className="btn btn-ghost rounded-btn">Default</a>
                            <div  className='flex flex-wrap items-center'>

                                <select value={sortPrimery} onChange={onOptionChangeHandler1}  className="select my-1  text-xs select-primary w-auto max-w-xs"  >
                                    <option disabled>Primery</option>
                                    <option value={'id'}  >Default </option>
                                    <option value={'camera'}  >Camera </option>
                                    <option value={'summary'} >Summary</option>
                                    <option value={'location'} >Location</option>
                                    <option value={'page_length'} >Page Length </option>
                                </select>
                                
                                <span> 	&amp; </span>
                                
                                <select value={sortSecond}  onChange={onOptionChangeHandler2} className="select my-1  select-primary w-auto max-w-xs">
                                    <option disabled  >Secondery</option>
                                    <option value={'id'} >Default </option>
                                    <option value={'camera'} >Camera </option>
                                    <option value={'summary'} >Summary</option>
                                    <option value={'location'} >Location</option>
                                    <option value={'page_length'} >Page Length </option>
                                </select>
                                    
                            
                            </div>                       
                          
                            
                        </div>
                    </div>
                </div>
                </div>





            <main className='my-container'>
                <div draggable className='table-grid '>
                    {/* This is the main row where the columns names sits */}
                    <div id="tableTitle" className="row-grid">
                        <span className='text-white noprintdplay text-sm sm:text-lg font-bold mx-8'></span>
                        <span onClick={() => theadSortbyHundler('id')} className='text-white flex h-full items-center text-sm sm:text-lg font-bold m-auto'>
                            Scene No. 
                            <span  ref={sceneTag} className={`self-end ${sortPrimery =='id' ? "" : "invisible"}`}> 
                              <BiCaretDown  />
                            </span> 
                        </span>
                        <span onClick={() => theadSortbyHundler('camera')}  className='text-white h-full flex items-center text-sm sm:text-lg font-bold m-auto'>
                            Camera 
                            <span  ref={cameraTag} className={`  self-end   ${sortPrimery =='camera' ? "" : "invisible"}       `}> 
                                <BiCaretDown   />
                            </span> 
                        </span>
                        <span onClick={() => theadSortbyHundler('summary')} className='text-white h-full flex items-center text-sm sm:text-lg font-bold m-auto'>
                            Summary  
                            <span  className={`  self-end   ${sortPrimery =='summary' ? "" : "invisible"}`} ref={summeryTag}> 
                                <BiCaretDown  />
                            </span>
                        </span>
                        <span onClick={() => theadSortbyHundler('location')} className='text-white h-full flex items-center text-sm sm:text-lg font-bold m-auto'>
                            Location   
                            <span className={`self-end ${sortPrimery =='location' ? "" : "invisible"}`} ref={locatiomTag} >
                                <BiCaretDown   />
                            </span>
                        </span>
                        <span onClick={() => theadSortbyHundler('page_length')} className='text-white h-full flex items-center text-sm sm:text-lg font-bold mx-8'>
                            Page length  
                            <span className={`self-end ${sortPrimery =='page_length' ? "" : "invisible"}`}  ref={lenthTag}>
                                <BiCaretDown  />
                            </span>
                        </span>

                    </div>
                    {/* This component is for the rest of the table that has the DnD functionality */}
                    {items.length > 0 ? <DragTest items={items} /> : (<Skeleton />)}
                </div>
            </main>

        </div>
    )
}

export default Table