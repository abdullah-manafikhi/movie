import { useState, createContext } from 'react'

const TableContext = createContext()

export const TableProvider = ({ children }) => {

    const [cursor, setCursor] = useState("cursor-grab");
    const [daysMap, setDaysMap] = useState(null)
    const [colors, setColors] = useState([])
    const [adding, setAdding] = useState({isAdding : false, id: null})
    const [addLine, setAddLine] = useState({})

    return (
        <TableContext.Provider value={{ cursor, setCursor, daysMap, setDaysMap, colors, setColors, adding, setAdding, addLine, setAddLine }}>
            {children}
        </TableContext.Provider>
    )
}

export default TableContext