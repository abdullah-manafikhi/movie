import {useState , createContext} from 'react'

const TableContext = createContext()

export const TableProvider = ({children}) => {

    const [cursor, setCursor] = useState("cursor-grab");

    return(
        <TableContext.Provider value={{cursor , setCursor}}>
            {children}
        </TableContext.Provider>
        )
}

export default TableContext