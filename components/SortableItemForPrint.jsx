import { useState, useRef, useEffect } from "react";
import { useContext } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TableContext from "./context/TableContext.js.jsx";

function SortableItemForPrint(props) {
  // this is the table line "row" data
  const [formData, setFormData] = useState(props.line);

  const [inputDisabled, setInputDisabled] = useState(true);

  const [style3, setStyle3] = useState({ backgroundColor: "" });

  // getting the table from the context
  const { cursor, daysMap, setDaysMap, isAdding } = useContext(TableContext);
  // This for focusing on the scene input when updateing start
  const firstInputRef = useRef();

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      transition: {
        duration: 150, // milliseconds
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // functions start here

  // This is for keeping the textarea's height equal to the value's height
  // and avoiding the scroll bar inside the textarea
  const onChange = (e) => {
    const trgt = e.currentTarget;
    trgt.style.height = "auto";

    trgt.style.height = trgt.scrollHeight + "px";
  };

  // for (let i = 0; i < daysMap.data.length; ++i) {
  //     if (props.index <= daysMap.data[i].index) {
  //         setStyle3(prevState => (
  //             {
  //                 ...prevState,
  //                 backgroundColor: daysMap.colors[daysMap.data[i].id] === "white" ? LsColors[daysMap.data[i].id] : daysMap.colors[daysMap.data[i].id]
  //             }
  //         ))
  //         break;
  //     }
  // }

  useEffect(() => {
    if (daysMap !== null) {
      console.log(daysMap.data);
      const LsColors = JSON.parse(localStorage.getItem("colors"));
      let l = -1;
      let r = daysMap.data.length - 1;
      let mid = 0;
      console.log(props.index);

      // =====================================
      // *********** BINARY SEARCH ************
      // ======================================

      // This loop determines the line colors useing dpending on the day line color using binary search
      while (l + 1 < r) {
        mid = Math.floor((l + r) / 2);
        if (props.index <= daysMap.data[mid].index) {
          r = mid;
        } else if (props.index >= daysMap.data[mid].index) {
          l = mid;
        }
      }

      setStyle3((prevState) => ({
        ...prevState,
        backgroundColor:
          daysMap.colors[daysMap.data[r].id] === "white"
            ? LsColors[daysMap.data[r].id]
            : daysMap.colors[daysMap.data[r].id],
      }));

      console.log(l, r);

      if (Object.hasOwn(formData, "day")) {
        setStyle3((prevState) => ({
          ...prevState,
          backgroundColor:
            daysMap.colors[formData.id] === "white"
              ? LsColors[formData.id]
              : daysMap.colors[formData.id],
        }));
      }
    }
  }, [daysMap]);

  if (daysMap === null) {
    return <h2>Loading...</h2>;
  } else {
    // ========== DAYS LINES ===========
    if (props.line.day) {
      return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <div
            style={style3}
            className={`row-grid-day touch-manipulation z-1  `}
          >
            <span className="my-auto">{formData.day}</span>
          </div>
        </div>
      );
    }
    // ========== NOTES LINES ===========
    else if (props.line.note) {
      return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <div
            style={style3}
            className={`row-grid-day touch-manipulation z-1 `}
          >
            <span className="my-auto">{formData.note}</span>
          </div>
        </div>
      );
    }
    // =========== SCENE LINES ===========
    else {
      return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
          <div style={style3} className={`row-grid touch-manipulation z-1 `}>
            <span className="my-auto">
              {/* <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.scene} ref={firstInputRef}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            /> */}
              <span>{formData.scene}</span>
            </span>
            <span className="my-auto">
              {/* <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.camera}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                                /> */}
              <span>{formData.camera}</span>
            </span>
            <span className="my-auto">
              {/* <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.summary}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                                /> */}
              <span>{formData.summary}</span>
            </span>
            <span className="my-auto">
              {/* <textarea
                                onChange={e => onChange(e)}
                                type="text" placeholder="" defaultValue={formData.location}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            /> */}
              <span>{formData.location}</span>
            </span>
            <span className="my-auto">
              {/* <textarea
                                type="text" placeholder="" defaultValue={formData.page_length}
                                className={`textarea textarea-ghost textarea-xs resize-none w-full max-w-xs scroll ${inputDisabled ? "pointer-events-none" : "pointer-events-auto"}`}
                            /> */}
              <span>{formData.page_length}</span>
            </span>
          </div>
        </div>
      );
    }
  }
}

export default SortableItemForPrint;
