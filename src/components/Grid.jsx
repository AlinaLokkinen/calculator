import { useState } from "react";
import Button from "./Button";

const Grid = ({ handleInput }) => {
  const [buttons] = useState([
    "C",
    "%",
    "/",
    "x",
    "7",
    "8",
    "9",
    "-",
    "4",
    "5",
    "6",
    "+",
    "3",
    "2",
    "1",
    "=",
    "0",
    ".",
    "bs",
  ]);

  const handleClick = (b) => {
    handleInput(b);
  }

  return (
    <div className=" w-1/3 h-1/3 bg-tealdark">
      <div className="h-full grid grid-cols-4 grid-rows-5">
        {buttons.map((b, i) => (
            <div key={i} className={b === '=' ? 'row-span-2 h-full ' : 'h-full'} >
                <Button b={b} handleClick={handleClick} />
            </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
