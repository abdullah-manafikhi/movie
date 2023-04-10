import { useState, useRef, useEffect, useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TableContext from "./context/TableContext.js.jsx";

function SortableItemForPrint(props) {
  // this is the table line "row" data
  const [formData, setFormData] = useState(props.line)

  const [style3, setStyle3] = useState({ backgroundColor: "" })

  // getting the table from the context
  const { daysMap, items } = useContext(TableContext)

  useEffect(() => {
    if (daysMap !== null) {
      const LsColors = JSON.parse(localStorage.getItem("colors"))
      let l = 0
      let r = daysMap.data.length - 1
      let mid = 0

      // =====================================
      // *********** BINARY SEARCH ************
      // ======================================

      // This loop determines the line colors useing dpending on the day line color using binary search
      while (l + 1 < r) {
        mid = Math.floor((l + r) / 2)
        if (props.index <= daysMap.data[mid].index) {
          r = mid
        }
        else if (props.index >= daysMap.data[mid].index) {
          l = mid
        }
      }
      if (daysMap.data[l] !== undefined) {
        setStyle3(prevState => (
          {
            ...prevState,
            backgroundColor: daysMap.colors[daysMap.data[l].id] === "white" ? LsColors[daysMap.data[l].id] : daysMap.colors[daysMap.data[l].id]
          }
        ))
      }

      if (Object.hasOwn(formData, "day")) {
        setStyle3(prevState => (
          {
            ...prevState,
            backgroundColor: daysMap.colors[formData.id] === "white" ? LsColors[formData.id] : daysMap.colors[formData.id]
          }
        ))
      }
    }
  }, [daysMap])

  if (daysMap === null) {
    return <h2>Loading...</h2>;
  }
  else {
    // ========== DAYS LINES ===========
    if (props.line.day) {
      return (
        <div style={style3} className={`row-grid-day touch-manipulation z-1  `} >
          <span className="my-auto font-extrabold">{formData.day}</span>
        </div>
      );
    }
    // ========== NOTES LINES ===========
    else if (props.line.note) {
      return (
        <div style={style3} className={`row-grid-day touch-manipulation z-1 `}>
          <span className="my-auto">{formData.note}</span>
        </div>
      );
    }
    // =========== SCENE LINES ===========
    else {
      return (
        <div style={style3} className={`row-grid touch-manipulation z-1 `}>
          <span className="my-auto">
            <span>{formData.scene}</span>
          </span>
          <span className="my-auto">
            <span>{formData.camera}</span>
          </span>
          <span className="my-auto">
            <span>{formData.summary}</span>
          </span>
          <span className="my-auto">
            <span>{formData.location}</span>
          </span>
          <span className="my-auto">
            <span>{formData.page_length}</span>
          </span>
        </div>
      )
    }
  }
}

export default SortableItemForPrint;
