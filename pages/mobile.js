import Table from "../components/Table";
// import dynamic from 'next/dynamic'


function output() {

    // const DndUI = dynamic(() => import('../components/DndUI'), {
    //     ssr: false,
    // })

    const handlePrint = () => {
        if (typeof (window) !== "undefinded") {
            window.print()
        }
    }

    return (

        <div className="container m-auto justify-center align-center flex-col">
            <>
                {/*  <!-- Add a button to trigger the PDF export --> */}
                <h1 className=' text-2xl font-bold mx-auto w-fit my-8 '>Title Strip Board</h1>
                <div className="noprintdplay mx-auto p-4 flex  justify-center">
                    <button onClick={handlePrint} className='bg-blue-500 hover:bg-blue-700 text-white font-bold p-y-2 px-4 rounded ms-3'>
                        Save and download
                    </button>
                </div>
                <Table />
                {/* <DndUI /> */}
            </>
        </div>

    )
}

export default output