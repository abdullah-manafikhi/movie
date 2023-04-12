import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";
import { BiColorFill } from 'react-icons/bi';

export const PopOver = ({ color, onChange, presetColors}) => {
  const popover = useRef();
  const [isOpen, toggle] = useState(false);

  const close = useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className="picker noprintdplay my-auto">
      <div
        className="swatch"
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      >
        <BiColorFill className='text-xl' />
      </div>

      {isOpen && (
        <div className="popover" ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
          <div className="picker__swatches">
            {presetColors.map((presetColor) => (
              <button
                key={presetColor}
                className="picker__swatch"
                style={{ background: presetColor }}
                onClick={() => onChange(presetColor)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// import React from "react";
// import { HexColorPicker } from "react-colorful";

// export const SwatchesPicker = ({ color, onChange, presetColors }) => {
//   return (
//     <div className="picker">
//       <HexColorPicker color={color} onChange={onChange} />


//     </div>
//   );
// };

