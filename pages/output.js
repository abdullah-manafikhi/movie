import Table from "../components/Table";
// import dynamic from 'next/dynamic'


function output() {

    // const DndUI = dynamic(() => import('../components/DndUI'), {
    //     ssr: false,
    // })

  
    return (

        <div className="container m-auto justify-center align-center flex-col">
            <>
                {/*  <!-- Add a button to trigger the PDF export --> */}
                <h1 className=' text-2xl font-bold mx-auto w-fit my-8 '>Title Strip Board</h1>
                
                <Table />
                {/* <DndUI /> */}
            </>
        </div>

    )
}

export default output