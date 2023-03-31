import { useState, createContext } from 'react'

const TableContext = createContext()

export const TableProvider = ({ children }) => {

    const [cursor, setCursor] = useState("cursor-grab");
    const [daysMap, setDaysMap] = useState(null)
    const [colors, setColors] = useState([])
    const [isAdding, setIsAdding] = useState(false)

    return (
        <TableContext.Provider value={{ cursor, setCursor, daysMap, setDaysMap, colors, setColors, isAdding, setIsAdding }}>
            {children}
        </TableContext.Provider>
    )
}

export default TableContext